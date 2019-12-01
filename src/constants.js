const STATUS = {
  ASSASIAN: 'assasian',
  AGENT: 'agent',
  NEUTRAL: 'neutral',
  UNKNOWN: 'unknown'
};

const REASON = {
  BAD_GUESS: 'bad guess',
  USED_GUESS: 'used all regular guesses',
  OUT_OF_GUESSES: 'used all regular guesses and catch up guess',
  BYSTANDER_GUESS: 'guessed a bystander',
  DEATH_GUESS: 'guessed an assasian'
};

const PHASE = {
  CLICK: 'click',
  CLUE: 'clue'
};

const DECK = [
  [STATUS.ASSASIAN, STATUS.ASSASIAN],
  [STATUS.ASSASIAN, STATUS.AGENT],
  [STATUS.ASSASIAN, STATUS.NEUTRAL],
  [STATUS.AGENT, STATUS.ASSASIAN],
  [STATUS.NEUTRAL, STATUS.ASSASIAN],
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


export {STATUS, REASON, DECK, PHASE};
