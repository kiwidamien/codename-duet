import React from 'react';
import {Link} from 'react-router-dom';
import './info.css';

function getAgentStatus({numAgentsFound, numYourAgentsRemaining}){
  return `Found ${numAgentsFound} of 15 Agents (${9-numYourAgentsRemaining} of your 9 Remaining)`;
}

function getMessage({canClue, canClick, clueInfo, turnNumber, turnPhase}){
  const prefix = `Turn number ${turnNumber + 1}`;
  if (canClue){
    return  `${prefix}: Waiting for you to send clue`;
  }
  if (canClick){
    const {word, number, guesses} = clueInfo;
    return `${prefix}: Waiting for you to click (clue is ${word}; guessed ${guesses} of ${number})`;
  }
  // What are we waiting on the other player for?
  return `Waiting for other player to ${turnPhase === 'clue' ? 'send clue': 'click cards'}`;
}

function Message(data_pkg){
    const message = getMessage(data_pkg);
    const postFix = getAgentStatus(data_pkg.agentInfo);
    const {gameOver, onClickRestart} = data_pkg;

    if (gameOver){
      return (
        <div className="info-area">
          Game Over!
          <button onClick={onClickRestart}>Play Again?</button>
          or 
          <Link to='/'>return to the lobby</Link>
        </div>
      );
    }

  return (
  <div className="info-area">
    {message}<br/>
    {postFix}
  </div>
  );
}

export default Message;
