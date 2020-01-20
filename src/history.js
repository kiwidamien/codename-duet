import React from 'react';
import './history.css';
import {STATUS, REASON} from './constants.js';


function History({turns, playerNames}){
  playerNames = playerNames || ['Player 0', 'Player 1'];
  return (
    <div className="history-area">
      {turns.map( (turn, index) => HistoryTurn({...turn, turn_number: index+1, player: turn.player_clue, playerNames})).reverse()}
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
    return 'Selected assassian';
    case REASON.NOT_OVER:
    return 'Turn still progressing';
    case REASON.USED_GUESS:
    return 'Used all (regular) guesses';
    case REASON.PASS:
    return 'Passed';
    default:
    return 'Bad reason for turn end';
  }
}


function HistoryTurn({player, playerNames, clue, number, guesses, turn_end, turn_number}){
  if (!clue){
    return (
      <div><i>Waiting on clue...</i></div>
    );
  }
  return (
    <div className="history-container">
      <div className={`turn_number ${(turn_number > 9) ? 'too-many-turns':''}`}>Turn number {turn_number}</div>
      <span className="agent-name">{playerNames[player]}</span> gave <span className="clue-word">{clue}</span> for <span className="clue-number">{number}</span>
      <ul>
        {guesses.map( (guess) => GuessRecord(guess) )}
      </ul>
      <i>{parse_reason(player, turn_end)}</i>
    </div>
  );
}


function GuessRecord({word, result}){
  let inner_html = '';
  console.log('Here we have ' + word + ' with result=' + result);
  switch(result){
    case STATUS.AGENT:
      inner_html = (<li>Agent <span className="clue-word">{word}</span> found</li>);
      break;
    case STATUS.NEUTRAL:
      inner_html = (<li>Bystander <span className="clue-word">{word}</span> identified</li>);
      break;
    case STATUS.ASSASSIAN:
      inner_html = (<li>Assassian <span className="clue-word">{word}</span> contacted</li>);
      break;
    default:
      inner_html = (<li>UNKNOWN CASE</li>);
  }
  return inner_html;
}

export default History;
