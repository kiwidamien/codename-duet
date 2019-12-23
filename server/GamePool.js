const Game = require('./Game.js');

const MYGAME = new Game();

const GamePlayerHash = {
  10: {gameName: 'default', game: MYGAME, playerIndex: 0, otherPlayerHash: 11},
  11: {gameName: 'default', game: MYGAME, playerIndex: 1, otherPlayerHash: 10}
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

  makeNewGame(gameName){
    const newGame = new Game();
    const hash1 = this._getNewHashValue();
    const hash2 = this._getNewHashValue();
    GamePlayerHash[hash1] = {gameName, game: newGame, playerIndex: 0, otherPlayerHash: hash2};
    GamePlayerHash[hash2] = {gameName, game: newGame, playerIndex: 1, otherPlayerHash: hash1};
    return [hash1, hash2];
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

  getAllGames(){
    return GamePlayerHash;
  }
}

module.exports = {GamePlayerHash, GamePool}
