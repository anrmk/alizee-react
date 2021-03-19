const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server);

const users = {};

io.on("connection", (socket) => {
  console.log("Connection", socket.id, new Date())
  const handshake = socket.handshake;
  const userName = handshake.query["userName"].toLowerCase();

  users[userName] = socket.id;

  socket.emit("yourID", socket.id);

  io.sockets.emit("allUsers", users);

  socket.on("disconnect", () => {
    delete users[userName];
  });

  socket.on("callUser", (data) => {
    io.to(users[data.to]).emit("ring", { signal: data.signal, from: data.from });
  });

  socket.on("cancelCall", (data) => {
    io.to(users[data.to]).emit("cancel", { signal: data.signal, from: data.from });
  })

  socket.on("acceptCall", (data) => {
    io.to(users[data.to]).emit("accept", data.signal);
  });

  socket.on("declineCall", (data) => {
    console.log("Decline call", data.to);
    io.to(users[data.to]).emit("decline", data.signal);
  });
});

server.listen(8000, () => console.log("server is running on port 8000"));
