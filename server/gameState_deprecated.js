import {STATUS, DECK, REASON, PHASE} from './constants.js';

const gameStateToMap = (gameState, playerNumber) =>{
  return gameState.cards.map( (card) => card.identity[playerNumber]);
}


const gameStateToClientState = (gameState, playerNumber) => {
  const clientState = {...gameState};
  clientState.cards = gameState.cards.map( (card) => {
    return {
      word: card.word,
      status: (card.revealed[playerNumber] === STATUS.UNKNOWN) ?  STATUS.UNKNOWN : card.revealed[playerNumber]
    }
  });
  clientState.canClick = (gameState.current_turn.player === playerNumber) && (gameState.current_turn.phase === PHASE.CLICK);
  clientState.canClue = (gameState.current_turn.player === (1-playerNumber)) && (gameState.current_turn.phase === PHASE.CLUE);
  clientState.canPass = (clientState.canClick) && (gameState.current_turn.guesses.length > 0);
  clientState.validationError = gameState.validationErrors[playerNumber];
  clientState.mapState = gameStateToMap(gameState, playerNumber);
  return clientState;
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


const makeGameStateNewTurn = (gameState, player, reason) => {
  const newTurn = {
    player: 1-player,
    phase: PHASE.CLUE,
    clue: '',
    number: 2,
    guesses: [],
    turn_end: REASON.NOT_OVER
  };

  const newGameState = {...gameState,
    current_turn: newTurn
  };
  newGameState.history[newGameState.history.length-1].turn_end = reason;
  newGameState.history.push(newGameState.current_turn);
  return newGameState;
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
    {word: 'apple', identity: [STATUS.ASSASIAN, STATUS.ASSASIAN], revealed: [STATUS.UNKNOWN, STATUS.UNKNOWN] },
    {word: 'mandarin', identity: [STATUS.AGENT, STATUS.AGENT], revealed: [STATUS.UNKNOWN, STATUS.UNKNOWN]},
    {word: 'persimmon', identity: [STATUS.AGENT, STATUS.AGENT], revealed: [STATUS.UNKNOWN, STATUS.UNKNOWN]},
    {word: 'javascript', identity: [STATUS.NEUTRAL, STATUS.NEUTRAL], revealed: [STATUS.UNKNOWN, STATUS.UNKNOWN]},
    {word: 'kiwi', identity: [STATUS.NEUTRAL, STATUS.NEUTRAL], revealed: [STATUS.UNKNOWN, STATUS.UNKNOWN]},
    {word: 'love', identity: [STATUS.NEUTRAL, STATUS.NEUTRAL], revealed: [STATUS.UNKNOWN, STATUS.UNKNOWN]},
    {word: 'jedi', identity: [STATUS.AGENT, STATUS.AGENT], revealed: [STATUS.UNKNOWN, STATUS.UNKNOWN]},
    {word: 'clone', identity: [STATUS.ASSASIAN, STATUS.ASSASIAN], revealed: [STATUS.UNKNOWN, STATUS.UNKNOWN]},
    {word: 'danish', identity: [STATUS.NEUTRAL, STATUS.NEUTRAL], revealed: [STATUS.UNKNOWN, STATUS.UNKNOWN]},
    {word: 'tiramasu', identity: [STATUS.AGENT, STATUS.AGENT], revealed: [STATUS.UNKNOWN, STATUS.UNKNOWN]},
    {word: 'landscape', identity: [STATUS.NEUTRAL, STATUS.NEUTRAL], revealed: [STATUS.UNKNOWN, STATUS.UNKNOWN]},
    {word: 'wildlife', identity: [STATUS.AGENT, STATUS.AGENT], revealed: [STATUS.UNKNOWN, STATUS.UNKNOWN]},
    {word: 'hike', identity: [STATUS.ASSASIAN, STATUS.ASSASIAN], revealed: [STATUS.UNKNOWN, STATUS.UNKNOWN]},
    {word: 'embassy', identity: [STATUS.NEUTRAL, STATUS.NEUTRAL], revealed: [STATUS.UNKNOWN, STATUS.UNKNOWN]},
    {word: 'parasite', identity: [STATUS.NEUTRAL, STATUS.NEUTRAL], revealed: [STATUS.UNKNOWN, STATUS.UNKNOWN]},
    {word: 'elephant', identity: [STATUS.AGENT, STATUS.AGENT], revealed: [STATUS.UNKNOWN, STATUS.UNKNOWN]},
    {word: 'travel', identity: [STATUS.AGENT, STATUS.AGENT], revealed: [STATUS.UNKNOWN, STATUS.UNKNOWN]},
    {word: 'siblings', identity: [STATUS.AGENT, STATUS.AGENT], revealed: [STATUS.UNKNOWN, STATUS.UNKNOWN]},
    {word: 'testing', identity: [STATUS.NEUTRAL, STATUS.NEUTRAL], revealed: [STATUS.UNKNOWN, STATUS.UNKNOWN]},
    {word: 'example', identity: [STATUS.NEUTRAL, STATUS.NEUTRAL], revealed: [STATUS.UNKNOWN, STATUS.UNKNOWN]},
    {word: 'teacher', identity: [STATUS.AGENT, STATUS.AGENT], revealed: [STATUS.UNKNOWN, STATUS.UNKNOWN]},
    {word: 'astronaut', identity: [STATUS.NEUTRAL, STATUS.NEUTRAL], revealed: [STATUS.UNKNOWN, STATUS.UNKNOWN]},
    {word: 'bootcamp', identity: [STATUS.NEUTRAL, STATUS.NEUTRAL], revealed: [STATUS.UNKNOWN, STATUS.UNKNOWN]},
    {word: 'bake', identity: [STATUS.AGENT, STATUS.AGENT], revealed: [STATUS.UNKNOWN, STATUS.UNKNOWN]},
    {word: 'meditate', identity: [STATUS.AGENT, STATUS.AGENT], revealed: [STATUS.UNKNOWN, STATUS.UNKNOWN]}
  ],
  history: TURNS,
  current_turn: {
    player: 0,
    phase: PHASE.CLUE,
    guesses: [],
    turn_end: REASON.NOT_OVER
  },
  message: 'this is a message',
  game_over: false,
  validationErrors: ['', 'Not your turn']
}

const getInitialGameState = () => {
  const our_deck = shuffle(DECK);
  const shuffledCards = GameState.cards.map( (card, index) => {
    return {...card,
      identity: our_deck[index],
      revealed: [STATUS.UNKNOWN, STATUS.UNKNOWN]
    }
  });

  const initialGameState = {...GameState,
    cards: shuffledCards,
    history: [],
    game_over: false
  };
  return initialGameState;
}


export {gameStateToClientState, gameStateToMap, shuffle, getInitialGameState, makeGameStateNewTurn};
