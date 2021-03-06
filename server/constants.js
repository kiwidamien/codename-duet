const STATUS = {
  ASSASSIN: 'assassin',
  AGENT: 'agent',
  NEUTRAL: 'neutral',
  UNKNOWN: 'unknown'
};

const REASON = {
  BAD_GUESS: 'bad guess',
  USED_GUESS: 'used all regular guesses',
  OUT_OF_GUESSES: 'used all regular guesses and catch up guess',
  BYSTANDER_GUESS: 'guessed a bystander',
  DEATH_GUESS: 'guessed an assassin',
  NOT_OVER: '',
  PASS: 'chose to pass',
};

const PHASE = {
  CLICK: 'click',
  CLUE: 'clue'
};

const DECK = [
  [STATUS.ASSASSIN, STATUS.ASSASSIN],
  [STATUS.ASSASSIN, STATUS.AGENT],
  [STATUS.ASSASSIN, STATUS.NEUTRAL],
  [STATUS.AGENT, STATUS.ASSASSIN],
  [STATUS.NEUTRAL, STATUS.ASSASSIN],
  [STATUS.AGENT, STATUS.AGENT],
  [STATUS.AGENT, STATUS.AGENT],
  [STATUS.AGENT, STATUS.AGENT],
  [STATUS.AGENT, STATUS.NEUTRAL],
  [STATUS.AGENT, STATUS.NEUTRAL],
  [STATUS.AGENT, STATUS.NEUTRAL],
  [STATUS.AGENT, STATUS.NEUTRAL],
  [STATUS.AGENT, STATUS.NEUTRAL],
  [STATUS.NEUTRAL, STATUS.AGENT],
  [STATUS.NEUTRAL, STATUS.AGENT],
  [STATUS.NEUTRAL, STATUS.AGENT],
  [STATUS.NEUTRAL, STATUS.AGENT],
  [STATUS.NEUTRAL, STATUS.AGENT],
  [STATUS.NEUTRAL, STATUS.NEUTRAL],
  [STATUS.NEUTRAL, STATUS.NEUTRAL],
  [STATUS.NEUTRAL, STATUS.NEUTRAL],
  [STATUS.NEUTRAL, STATUS.NEUTRAL],
  [STATUS.NEUTRAL, STATUS.NEUTRAL],
  [STATUS.NEUTRAL, STATUS.NEUTRAL],
  [STATUS.NEUTRAL, STATUS.NEUTRAL]
];

const HOST_URL = 'http://localhost:2000';

module.exports = {STATUS, REASON, DECK, PHASE, HOST_URL};
