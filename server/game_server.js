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

const sendClientState = ({clientStates}, socket_list, playerIndex) => {
  console.log('Called sendClientState');
  console.log(clientStates);
  socket_list.forEach( (socket) => {
    console.log(`Sending player ${playerIndex} info to client ${socket.id}`);
    console.log(clientStates[playerIndex]);
    socket.emit(
      'server_state_update',
      clientStates[playerIndex]
    )
  });
};

IO.sockets.on('connection', (socket) => {
  socket.id = SOCKET_LIST.length;
  socket.room = 42;
  socket.message = "hello";
  socket.active = true;
  console.log(`Recieved a connection, currently have ${SOCKET_LIST.length} connections`);

  SOCKET_LIST.push(socket);

  socket.on('disconnect', () => {socket.active = false;});

  socket.on('click_card', ({playerIndex, cardIndex}) => {
    const {success, clientStates} = dispatchClickCard(MYGAME, {playerIndex: playerIndex, cardIndex: cardIndex});
    console.log(`Clicked card, have client states ${clientStates}`);
    sendClientState({clientStates}, SOCKET_LIST, playerIndex);
  });

  socket.on('pass', ({playerIndex}) => {
    const {success, clientStates} = dispatchClickPass(MYGAME, {playerIndex});
    sendClientState({clientStates}, SOCKET_LIST, playerIndex);
  });

  socket.on('give_clue', ({playerIndex, clue, number}) => {
    const {success, clientStates} = dispatchSendClue(MYGAME, {playerIndex, clue, number});
    sendClientState({clientStates}, SOCKET_LIST, playerIndex);
  });

  socket.on('refresh', () => {
    const {success, clientStates} = dispatchRefresh();
    sendClientState({clientStates}, SOCKET_LIST, playerIndex);
  });

  socket.on('subscribeToTimer', (interval) => {
    console.log(`Client is subscribing to timer to update every ${interval} milliseconds`);
    setInterval( () => {
      socket.emit('timer', new Date());
    }, interval);
  });
});
