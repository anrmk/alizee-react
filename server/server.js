const express = require("express");
const https = require("https");
const crypto = require("crypto");
const fs = require("fs");
// const axios = require("axios").default;
const app = express();

const credentials = {
  key: fs.readFileSync("/etc/nginx/ssl/76210a123a62e0db.pem"),
  cert: fs.readFileSync("/etc/nginx/ssl/themembers.com.key"),
};

const httpsServer = https.createServer(credentials, app);
const socket = require("socket.io");
const io = socket(httpsServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

const creators = new Map();

const addCreator = (userName, roomId, socketId) => {
  if (!userName || !roomId || creators.has(userName)) return false;

  return !!creators.set(userName, { socketId, roomId });
}

const removeCreator = (userName) => {
  if (!userName || !creators.has(userName)) return false;

  return !!creators.delete(userName);
}

const getRoom = (callerName, calleeName) => {
  if (!callerName && !calleeName) return;

  const roomHash = crypto.createHash("md5").update(callerName + calleeName).digest("hex");
  const reversedRoomHash = crypto.createHash("md5").update(calleeName + callerName).digest("hex");
  const rooms = io.of("/").in().adapter.rooms;

  return { 
    roomId: rooms.has(roomHash) && roomHash || rooms.has(reversedRoomHash) && reversedRoomHash || roomHash,
    roomSockets: rooms.get(roomHash) || rooms.get(reversedRoomHash)
  };
}

const getSocketsByRoom = (roomId) => {
  const room = io.of("/").in().adapter.rooms.get(roomId);

  if (!roomId && !room && room.size == 0) return [];

  return Array.from(room.values());
}

io.on("connection", (socket) => {
  /*
    TODO: do a request to the main server to get a user is verified or not, now it is not secure,
    because we getting it from the client.
  */
  socket.on("join", ({ callerName, calleeName, isVerified }) => {
    const { roomId, roomSockets } = getRoom(callerName, calleeName);

    if (!roomSockets || roomSockets.size === 0 || roomSockets.size === 1) {
      socket.join(roomId);
      socket.roomId = roomId;
      socket.userName = callerName;

      if ((!roomSockets || roomSockets.size === 1 || creators.has(callerName)) && isVerified) {
        addCreator(callerName, roomId, socket.id);
        socket.emit("init");
      }
      (roomSockets && roomSockets.size === 2) && io.to(roomId).emit("ready");
    }
  });

  socket.on("signal", (data) => {
    if (!socket.roomId) return;

    io.to(socket.roomId).emit("desc", { desc: data.desc, from: data.from });
  });

  socket.on("removeRoom", () => {
    if (!socket.roomId) return;

    const sockets = getSocketsByRoom(socket.roomId);

    io.of("/").in().socketsLeave(socket.roomId);
    removeCreator(socket.userName);
    sockets.forEach(currentSocket => io.to(currentSocket).emit("roomRemoved"));
  });

  socket.on("disconnect", () => {
    if (!socket.roomId) return;

    socket.leave(socket);
    io.to(socket.roomId).emit("disconnected");
  });
});

httpsServer.listen(8000, () => console.log("server is running on port 8000"));
