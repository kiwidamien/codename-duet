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

var IO = require('socket.io')(server, {});



const sendClientState = ({clientStates}, socket_list, playerIndex) => {
  //console.log('Called sendClientState');
  //console.log(clientStates);
  socket_list.forEach( (socket) => {
    //console.log(`Sending player ${playerIndex} info to client ${socket.id}`);
    //console.log(clientStates[playerIndex]);
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

  socket.on('click_card', ({hashValue, cardIndex}) => {
    const {game, playerIndex} = GamePlayerHash[hashValue];
    const {success, clientStates} = dispatchClickCard(game, {playerIndex: parseInt(playerIndex),
                                                               cardIndex: parseInt(cardIndex)});
    console.log(`Clicked card, have client states ${success}`);
    sendClientState({clientStates}, SOCKET_LIST, playerIndex);
  });

  socket.on('pass', ({hashValue}) => {
    const {game, playerIndex} = GamePlayerHash[hashValue];
    const {success, clientStates} = dispatchClickPass(game, {playerIndex});
    sendClientState({clientStates}, SOCKET_LIST, playerIndex);
  });

  socket.on('give_clue', ({hashValue, clue, number}) => {
    const {game, playerIndex} = GamePlayerHash[hashValue];
    const {success, clientStates} = dispatchSendClue(game, {playerIndex, clue, number});
    sendClientState({clientStates}, SOCKET_LIST, playerIndex);
  });

  socket.on('refresh', ({hashValue}) => {
    const {game, playerIndex} = GamePlayerHash[hashValue];
    const {success, clientStates} = dispatchRefresh(game, {playerIndex});
    sendClientState({clientStates}, SOCKET_LIST, playerIndex);
  });

  socket.on('restart', ({hashValue}) => {
    const {game, playerIndex} = GamePlayerHash[hashValue];
    const {success, clientStates} = dispatchRestart(game, {playerIndex});
    sendClientState({clientStates}, SOCKET_LIST, playerIndex);
  });
  //
  // socket.on('subscribeToTimer', (interval) => {
  //   console.log(`Client is subscribing to timer to update every ${interval} milliseconds`);
  //   setInterval( () => {
  //     socket.emit('timer', new Date());
  //   }, interval);
  // });
});
