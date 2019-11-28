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


export {STATUS, REASON};
