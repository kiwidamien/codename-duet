//import {STATUS, DECK, REASON, PHASE} from './constants.js';
const CONSTANTS = require('./constants.js');
const express = require('express');
const app = express();
const server = require('http').Server(app);

const {dispatchClickCard, dispatchClickPass, dispatchSendClue, dispatchRefresh, dispatchRestart} = require('./DispatchGame.js');

//const Game = require('./Game.js');
const GamePlayerHash = require('./GamePool.js');

console.log(CONSTANTS);

server.listen(2000);
console.log("Server started");
console.log(`Directory: ${__dirname}`);

var SOCKET_LIST = [];
var SOCKET_HASH = {};

var IO = require('socket.io')(server, {});



const sendClientState = ({clientStates}, socket_list, hashValue) => {
  const {playerIndex, otherPlayerHash} = GamePlayerHash[hashValue];
  const otherPlayerIndex = GamePlayerHash[otherPlayerHash];

  console.log(`hashValue is ${hashValue}`);
  console.log(SOCKET_HASH);

  SOCKET_HASH[hashValue].forEach( (socket) => {
    socket.emit(
      'server_state_update',
      clientStates[playerIndex]
    )
  });

  (SOCKET_HASH[otherPlayerHash] || []).forEach( (socket) => {
    socket.emit(
      'server_state_update',
      clientStates[otherPlayerIndex]
    );
  });
};

const sendRefreshState = ({clientStates}, socket_list, hashValue) => {
  const {playerIndex} = GamePlayerHash[hashValue];
  SOCKET_HASH[hashValue].forEach( (socket) => {
    socket.emit(
      'server_state_update',
      clientStates[playerIndex]
    );
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

  socket.on('join_game', (hashValue) => {
    console.log('join_game called');
    socket.hashValue = hashValue;
    SOCKET_HASH[hashValue] = (SOCKET_HASH[hashValue] || []);
    SOCKET_HASH[hashValue].push(socket);
  });

  socket.on('click_card', ({hashValue, cardIndex}) => {
    const {game, playerIndex} = GamePlayerHash[hashValue];
    const {success, clientStates} = dispatchClickCard(game, {playerIndex: parseInt(playerIndex),
                                                               cardIndex: parseInt(cardIndex)});
    console.log(`Clicked card, have client states ${success}`);
    sendClientState({clientStates}, SOCKET_LIST, hashValue);
  });

  socket.on('pass', ({hashValue}) => {
    const {game, playerIndex} = GamePlayerHash[hashValue];
    const {success, clientStates} = dispatchClickPass(game, {playerIndex});
    sendClientState({clientStates}, SOCKET_LIST, hashValue);
  });

  socket.on('give_clue', ({hashValue, clue, number}) => {
    const {game, playerIndex} = GamePlayerHash[hashValue];
    const {success, clientStates} = dispatchSendClue(game, {playerIndex, clue, number});
    sendClientState({clientStates}, SOCKET_LIST, hashValue);
  });

  socket.on('refresh', ({hashValue}) => {
    const {game, playerIndex} = GamePlayerHash[hashValue];
    const {success, clientStates} = dispatchRefresh(game, {playerIndex});
    sendRefreshState({clientStates}, SOCKET_LIST, hashValue);
  });

  socket.on('restart', ({hashValue}) => {
    const {game, playerIndex} = GamePlayerHash[hashValue];
    const {success, clientStates} = dispatchRestart(game, {playerIndex});
    sendClientState({clientStates}, SOCKET_LIST, hashValue);
  });
  //
  // socket.on('subscribeToTimer', (interval) => {
  //   console.log(`Client is subscribing to timer to update every ${interval} milliseconds`);
  //   setInterval( () => {
  //     socket.emit('timer', new Date());
  //   }, interval);
  // });
});
