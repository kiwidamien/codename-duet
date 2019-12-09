//import {STATUS, DECK, REASON, PHASE} from './constants.js';
const CONSTANTS = require('./constants.js');
const express = require('express');
const app = express();
const server = require('http').Server(app);

console.log(CONSTANTS);

server.listen(2000);
console.log("Server started");
console.log(`Directory: ${__dirname}`);

var SOCKET_LIST = [];

var IO = require('socket.io')(server, {});

IO.sockets.on('connection', (socket) => {
  socket.id = SOCKET_LIST.length;
  socket.room = 42;
  socket.message = "hello";
  socket.active = true;

  SOCKET_LIST.push(socket);

  socket.on('disconnect', () => {socket.active = false;});

  socket.on('click_card', () => {});
  socket.on('pass', () => {});
  socket.on('give-clue', () => {});

  socket.on('subscribeToTimer', (interval) => {
    console.log(`Client is subscribing to timer to update every ${interval} milliseconds`);
    setInterval( () => {
      socket.emit('timer', new Date());
    }, interval);
  });
});
