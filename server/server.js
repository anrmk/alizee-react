const express = require("express");
const https = require("https");
const fs = require("fs");
const app = express();

const credentials = {
  key: fs.readFileSync("/etc/nginx/ssl/76210a123a62e0db.pem"),
  cert: fs.readFileSync("/etc/nginx/ssl/themembers.com.key"),
};

const server = https.createServer(credentials, app);
const socket = require("socket.io");
const io = socket(server);

const users = {};

io.on("connection", (socket) => {
  const handshake = socket.handshake;
  const un = handshake.query["userName"];
  if (!un) {
    return;
  }

  const userName = un.toLowerCase();
  users[userName] = socket.id;

  console.log("Connection", userName, socket.id, Object.keys(users).length);

  socket.emit("yourID", socket.id);

  io.sockets.emit("allUsers", users);

  socket.on("disconnect", () => {
    delete users[userName];
  });

  socket.on("callUser", (data) => {
    const peerName = data.to.toLowerCase();
    io.to(users[peerName]).emit("ring", { signal: data.signal, from: data.from });
  });

  socket.on("cancelCall", (data) => {
    const peerName = data.to.toLowerCase();
    io.to(users[peerName]).emit("cancel", { signal: data.signal });
  });

  socket.on("acceptCall", (data) => {
    const peerName = data.to.toLowerCase();
    io.to(users[peerName]).emit("accept", data.signal);
  });

  socket.on("declineCall", (data) => {
    const peerName = data.to.toLowerCase();
    io.to(users[peerName]).emit("decline", data.signal);
  });
});

server.listen(8000, () => console.log("server is running on port 8000"));
