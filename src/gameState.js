import {STATUS, DECK, REASON, PHASE} from './constants.js';


const gameStateToClientState = (gameState, playerNumber) => {
  const clientState = {...gameState};
  clientState.cards = gameState.cards.map( (card) => {
    return {
      word: card.word,
      status: card.revealed[playerNumber] ? card.identity[playerNumber] : STATUS.UNKNOWN
    }
  });

  return clientState;
}


const gameStateToMap = (gameState, playerNumber) =>{
  return gameState.cards.map( (card) => card.identity[playerNumber]);
}


const shuffle = (orig_array) => {
  let array = [...orig_array];
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
      let index = Math.floor(Math.random() * counter);
      counter--;

      // And swap the last element with it
      let temp = array[counter];
      array[counter] = array[index];
      array[index] = temp;
  }
  return array;
}


const TURNS = [
  {
    player: 0, clue: 'elephant', number: 4,
    guesses: [
      {word: 'bake', result: STATUS.AGENT},
      {word: 'tiramasu', result: STATUS.AGENT},
      {word: 'example', result: STATUS.NEUTRAL}
    ],
    turn_end: REASON.BYSTANDER_GUESS
  },
  {
    player: 1, clue: 'elephant', number: 2,
    guesses: [
      {word: 'bake', result: STATUS.AGENT},
      {word: 'tiramasu', result: STATUS.AGENT}
    ],
    turn_end: REASON.USED_GUESSES
  },
  {
    player: 0, clue: 'elephant', number: 4,
    guesses:[
      {word: 'bake', result: STATUS.AGENT}
    ],
    turn_end: REASON.PASS
  }
];


const GameState = {
  cards: [
    {word: 'apple', identity: [STATUS.ASSASIAN, STATUS.ASSASIAN], revealed: [false, false] },
    {word: 'mandarin', identity: [STATUS.AGENT, STATUS.AGENT], revealed: [false, false]},
    {word: 'persimmon', identity: [STATUS.AGENT, STATUS.AGENT], revealed: [false, false]},
    {word: 'javascript', identity: [STATUS.NEUTRAL, STATUS.NEUTRAL], revealed: [false, false]},
    {word: 'kiwi', identity: [STATUS.NEUTRAL, STATUS.NEUTRAL], revealed: [false, false]},
    {word: 'love', identity: [STATUS.NEUTRAL, STATUS.NEUTRAL], revealed: [false, false]},
    {word: 'jedi', identity: [STATUS.AGENT, STATUS.AGENT], revealed: [false, false]},
    {word: 'clone', identity: [STATUS.ASSASIAN, STATUS.ASSASIAN], revealed: [false, false]},
    {word: 'danish', identity: [STATUS.NEUTRAL, STATUS.NEUTRAL], revealed: [false, false]},
    {word: 'tiramasu', identity: [STATUS.AGENT, STATUS.AGENT], revealed: [false, false]},
    {word: 'landscape', identity: [STATUS.NEUTRAL, STATUS.NEUTRAL], revealed: [false, false]},
    {word: 'wildlife', identity: [STATUS.AGENT, STATUS.AGENT], revealed: [false, false]},
    {word: 'hike', identity: [STATUS.ASSASIAN, STATUS.ASSASIAN], revealed: [false, false]},
    {word: 'embassy', identity: [STATUS.NEUTRAL, STATUS.NEUTRAL], revealed: [false, false]},
    {word: 'parasite', identity: [STATUS.NEUTRAL, STATUS.NEUTRAL], revealed: [false, false]},
    {word: 'elephant', identity: [STATUS.AGENT, STATUS.AGENT], revealed: [false, false]},
    {word: 'travel', identity: [STATUS.AGENT, STATUS.AGENT], revealed: [false, false]},
    {word: 'siblings', identity: [STATUS.AGENT, STATUS.AGENT], revealed: [false, false]},
    {word: 'testing', identity: [STATUS.NEUTRAL, STATUS.NEUTRAL], revealed: [false, false]},
    {word: 'example', identity: [STATUS.NEUTRAL, STATUS.NEUTRAL], revealed: [false, false]},
    {word: 'teacher', identity: [STATUS.AGENT, STATUS.AGENT], revealed: [false, false]},
    {word: 'astronaut', identity: [STATUS.NEUTRAL, STATUS.NEUTRAL], revealed: [false, false]},
    {word: 'bootcamp', identity: [STATUS.NEUTRAL, STATUS.NEUTRAL], revealed: [false, false]},
    {word: 'bake', identity: [STATUS.AGENT, STATUS.AGENT], revealed: [false, false]},
    {word: 'meditate', identity: [STATUS.AGENT, STATUS.AGENT], revealed: [false, false]}
  ],
  history: TURNS,
  current_turn: {
    player: 0,
    phase: PHASE.CLICK,
    clue: 'elephant',
    number: 4,
    guesses: [],
  },
  message: 'this is a message',
  game_over: false
}

const getInitialGameState = () => {
  const our_deck = shuffle(DECK);

  const initialGameState = {...GameState};
  initialGameState.cards = initialGameState.cards.map( (card, index) => {
    return {...card,
      identity: our_deck[index]
    }
  });
  return initialGameState;
}


export {gameStateToClientState, gameStateToMap, shuffle, getInitialGameState};
