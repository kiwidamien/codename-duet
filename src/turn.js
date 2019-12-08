import {REASON} from './constants'


interface guess{
  word: string,
  result: string
};


interface turnState {
  player: integer,
  clue: string,
  number: integer,
  guesses: guess[],
  turn_end: string
}
