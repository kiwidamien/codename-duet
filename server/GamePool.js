const Game = require('./Game.js');

const MYGAME = new Game();

const GamePlayerHash = {
  10: {game: MYGAME, playerIndex: 0, otherPlayerHash: 11},
  11: {game: MYGAME, playerIndex: 1, otherPlayerHash: 10}
}

module.exports = GamePlayerHash
