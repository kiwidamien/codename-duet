const Game = require('./Game.js');

const MYGAME = new Game();

const GamePlayerHash = {
  10: {game: MYGAME, playerIndex: 0},
  11: {game: MYGAME, playerIndex: 1}
}

module.exports = GamePlayerHash
