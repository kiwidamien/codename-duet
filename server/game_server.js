//import {STATUS, DECK, REASON, PHASE} from './constants.js';
const CONSTANTS = require('./constants.js');
const express = require('express');
const app = express();
const server = require('http').Server(app);

const {dispatchClickCard, dispatchClickPass, dispatchSendClue, dispatchRefresh} = require('./DispatchGame.js');

const Game = require('./Game.js');

console.log(CONSTANTS);

server.listen(2000);
console.log("Server started");
console.log(`Directory: ${__dirname}`);

var SOCKET_LIST = [];

var IO = require('socket.io')(server, {});

const MYGAME = new Game();

const sendClientState = ({clientStates}, socket_list) => {
  socket_list.forEach( (socket) => {
    socket.emit(
      'server_state_update',
      clientStates[socket.id]
    )
  });
};

IO.sockets.on('connection', (socket) => {
  socket.id = SOCKET_LIST.length;
  socket.room = 42;
  socket.message = "hello";
  socket.active = true;

  SOCKET_LIST.push(socket);

  socket.on('disconnect', () => {socket.active = false;});

  socket.on('click_card', ({cardIndex}) => {
    const {success, clientStates} = dispatchClickCard(MYGAME, {playerIndex: socket.id, cardIndex: cardIndex});
    console.log(`Clicked card, have client states ${clientStates}`);
    sendClientState({clientStates}, SOCKET_LIST);
  });

  socket.on('pass', () => {
    const {success, clientStates} = dispatchClickPass(MYGAME, {playerIndex: socket.id});
    sendClientState({clientStates}, SOCKET_LIST);
  });

  socket.on('give_clue', ({clue, number}) => {
    const {success, clientStates} = dispatchSendClue(MYGAME, {playerIndex: socket.id, clue, number});
    sendClientState({clientStates}, SOCKET_LIST);
  });

  socket.on('refresh', () => {
    const {success, clientStates} = dispatchRefresh();
    sendClientState({clientStates}, SOCKET_LIST);
  });

  socket.on('subscribeToTimer', (interval) => {
    console.log(`Client is subscribing to timer to update every ${interval} milliseconds`);
    setInterval( () => {
      socket.emit('timer', new Date());
    }, interval);
  });
});
