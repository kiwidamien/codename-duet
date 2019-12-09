const express = require('express');
const app = express();
const server = require('http').Server(app);

server.listen(2000);
console.log("Server started");
console.log(`Directory: ${__dirname}`);

var SOCKET_LIST = [];

var IO = require('socket.io')(server, {});

IO.sockets.on('connection', (socket) => {
  socket.id = SOCKET_LIST.length;
  socket.message = "hello";
  socket.active = true;

  SOCKET_LIST.push(socket);

  socket.on('disconnect', () => {socket.active = false;});

  socket.on('click_card', () => {});
  socket.on('pass', () => {});
  socket.on('give-clue', () => {});
});
