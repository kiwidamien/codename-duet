const Game = require('./Game.js');

const MYGAME = new Game();

const GamePlayerHash = {
  10: {gameName: 'default', game: MYGAME, playerIndex: 0, otherPlayerHash: 11, gameHash: 1011},
  11: {gameName: 'default', game: MYGAME, playerIndex: 1, otherPlayerHash: 10, gameHash: 1011}
}

const GameHash = {
  1011: [10, 11]
}

const randomGenerator = (MIN, MAX) => Math.floor(Math.random() * (MAX - MIN) + MIN);

class GamePool{
  constructor(){
    this.MIN = 10000000;
    this.MAX = 99999999;
  }

  _getNewHashValue(){
    let hashValue = randomGenerator(this.MIN, this.MAX);
    while (!!GamePlayerHash[hashValue]){
      hashValue = randomGenerator(this.MIN, this.MAX);
    }
    // Stops us from overwriting the placeholder
    GamePlayerHash[hashValue] = 'placeholder';
    return hashValue;
  }

  makeNewGame(gameName, words, playerNames){
    const newGame = new Game(words, playerNames);
    const hash1 = this._getNewHashValue();
    const hash2 = this._getNewHashValue();
    const gameHash = parseInt(hash1.toString() + hash2.toString());
    GamePlayerHash[hash1] = {gameName, game: newGame, playerIndex: 0, otherPlayerHash: hash2, gameHash, playerNames};
    GamePlayerHash[hash2] = {gameName, game: newGame, playerIndex: 1, otherPlayerHash: hash1, gameHash, playerNames};
    GameHash[gameHash] = [hash1, hash2];
    return [hash1, hash2, gameHash];
  }

  isValidHash(hashValue){
    return (!!GamePlayerHash[hashValue]);
  }

  getPlayerNumber(hashValue){
    return GamePlayerHash[hashValue].playerIndex;
  }

  getOtherPlayerNumber(hashValue){
    return 1 - this.getPlayerNumber(hashValue);
  }

  getOtherPlayerHash(hashValue){
    return GamePlayerHash[hashValue].otherPlayerHash;
  }

  deleteHash(hashValue){
    const otherHash = this.getOtherPlayerHash(hashValue);
    delete GamePlayerHash[hashValue];
    delete GamePlayerHash[otherHash];
    return true;
  }

  getGame(hashValue){
    return GamePlayerHash[hashValue].game;
  }

  getAllGames(){
    return GamePlayerHash;
  }
}

const GLOBAL_POOL = new GamePool()
module.exports = {GamePlayerHash, GamePool, GLOBAL_POOL}
