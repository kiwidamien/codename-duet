//import {STATUS, DECK, REASON, PHASE} from './constants.js';
const CONSTANTS = require('./constants.js');
const express = require('express');
const app = express();
const server = require('http').Server(app);
const cors = require('cors');


const {dispatchClickCard, dispatchClickPass, dispatchSendClue, dispatchRefresh, dispatchRestart} = require('./DispatchGame.js');

//const Game = require('./Game.js');
const {GamePlayerHash, GamePool, GLOBAL_POOL} = require('./GamePool.js');

console.log(GamePlayerHash);

server.listen(2000);
console.log("Server started");
console.log(`Directory: ${__dirname}`);

var SOCKET_LIST = [];
var SOCKET_HASH = {};

var IO = require('socket.io')(server, {});


app.use(cors());
app.use(express.json());


app.get('/game_list', (request, response, next) => {
  return response.send(GamePlayerHash);
})

app.get('/make_new_game', (request, response, next) => {
  const name = request.query.name || 'default';
  console.log(`making new game ${name}`);
  const [hash1, hash2] = GLOBAL_POOL.makeNewGame(name);
  return response.send([hash1, hash2]);
})

app.post('/make_new_game', (request, response, next) => {
  const name = request.body['name'] || 'default';
  const words = request.body['words'] || null;
  const [hash1, hash2] = GLOBAL_POOL.makeNewGame(name, words);
  return response.send([hash1, hash2]);
})

const sendRefreshState = ({clientStates}, hashValue) => {
  const {playerIndex} = (GamePlayerHash[hashValue] || {playerIndex: -1});
  if ((!SOCKET_HASH[hashValue]) || (playerIndex === -1)){
    return false;
  }
  SOCKET_HASH[hashValue].forEach( (socket) => {
    socket.emit(
      'server_state_update',
      clientStates[playerIndex]
    );
  });
  return true;
};

const sendInvalidHashMessage = (hashValue) => {
  const {playerIndex} = (GamePlayerHash[hashValue] || {playerIndex: -1});
  if ((!SOCKET_HASH[hashValue]) || (playerIndex === -1)){
    return false;
  }
  console.log('invalid hash');
  SOCKET_HASH[hashValue].forEach( (socket) => {
    socket.emit(
      'invalid_hash',
      hashValue);
    });
};

const sendClientStateDRY = ({clientStates}, hashValue) => {
  const {otherPlayerHash} = GamePlayerHash[hashValue];
  let success = sendRefreshState({clientStates}, hashValue);
  success = success && sendRefreshState({clientStates}, otherPlayerHash);
  return success;
}

const safeRouteFromHash = (args, hashValue, callback) => {
  if (!GLOBAL_POOL.isValidHash(hashValue)){
    sendInvalidHashMessage(hashValue);
    return;
  }
  const game = GLOBAL_POOL.getGame(hashValue);
  const playerIndex = GLOBAL_POOL.getPlayerNumber(hashValue);
  const {clientStates} = callback(game, {...args, playerIndex});
  sendClientStateDRY({clientStates}, hashValue);
}

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
    safeRouteFromHash({hashValue, cardIndex: parseInt(cardIndex)}, hashValue, dispatchClickCard);
  });

  socket.on('pass', ({hashValue}) => {
    safeRouteFromHash({hashValue}, hashValue, dispatchClickPass);
  });

  socket.on('give_clue', ({hashValue, clue, number}) => {
    safeRouteFromHash({clue, number}, hashValue, dispatchSendClue);
  });

  socket.on('refresh', ({hashValue}) => {
    console.log('Refresh request recieved');
    console.log(GamePlayerHash);
    console.log(GamePlayerHash[hashValue]);
    if (!GamePlayerHash[hashValue]){
      console.log('Sending invalid hash message');
      socket.emit(
        'invalid_hash',
        hashValue);
      return;
    }
    const {game, playerIndex} = GamePlayerHash[hashValue];
    const {clientStates} = dispatchRefresh(game, {playerIndex});
    sendRefreshState({clientStates}, hashValue);
  });

  socket.on('restart', ({hashValue}) => {
    safeRouteFromHash({hashValue}, hashValue, dispatchRestart);
  });

});
