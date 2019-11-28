import React, {useState} from 'react';
import './history.css';
import {STATUS} from './constants.js';


function History({turns}){
  return (
    <div className="history-area">
      {turns.map( (turn) => HistoryTurn(turn))}
    </div>
  );
}


/*
<div>
  You gave <span className="clue-word">elephant</span> for <span className="clue-number">4</span>
  <ul>
    <li>Agent <span className="clue-word">bake</span> found</li>
    <li>Agent <span className="clue-word">tiramasu</span> found</li>
    <li>Bystander <span className="clue-word">example</span> identified</li>
  </ul>
</div>
*/

function HistoryTurn({player, clue, number, guesses, turn_end}){
  return (
    <div>
    You gave <span className="clue-word">{clue}</span> for <span className="clue-number">{number}</span>
      <ul>
        {guesses.map( (guess) => GuessRecord(guess) )}
      </ul>
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
      inner_html = (<li>Bystander <span className="clue-word">{word}</span> indentified</li>);
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
