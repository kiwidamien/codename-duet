import React, {useState} from 'react';
import './history.css';
import {STATUS, REASON} from './constants.js';


function History({turns}){
  return (
    <div className="history-area">
      {turns.map( (turn) => HistoryTurn(turn))}
    </div>
  );
}


const parse_reason = (player, turn_end) => {
  switch(turn_end){
    case REASON.BYSTANDER_GUESS:
    return 'Bystander chosen, turn ended';
    case REASON.USED_GUESSES:
    return 'Made same number of guesses as clues';
    case REASON.OUT_OF_GUESSES:
    return 'Ran out of guesses';
    case REASON.DEATH_GUESS:
    return 'Selected assasian';
    default:
    return 'Bad reason for turn end';
  }
}


function HistoryTurn({player, clue, number, guesses, turn_end}){
  return (
    <div>
    You gave <span className="clue-word">{clue}</span> for <span className="clue-number">{number}</span>
      <ul>
        {guesses.map( (guess) => GuessRecord(guess) )}
      </ul>
      <i>{parse_reason(player, turn_end)}</i>
    </div>
  );
}


function GuessRecord({word, result}){
  let inner_html = '';

  switch(result){
    case STATUS.AGENT:
      inner_html = (<li>Agent <span className="clue-word">{word}</span> found</li>);
      break;
    case STATUS.NEUTRAL:
      inner_html = (<li>Bystander <span className="clue-word">{word}</span> identified</li>);
      break;
    case STATUS.ASSASIAN:
      inner_html = (<li>Assasian <span className="clue-word">{word}</span> contacted</li>);
      break;
    default:
      inner_html = (<li>UNKNOWN CASE</li>);
  }
  return inner_html;
}

export default History;
