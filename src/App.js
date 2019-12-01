import React, {useState, useReducer} from 'react';
import {STATUS, REASON, PHASE} from './constants.js';

import Map from './map.js';
import {CardLayout} from './card.js';
import History from './history.js';
import Message from './message.js';
import ClueRegion from './ClueRegion.js';
import {gameStateToClientState, gameStateToMap, getInitialGameState} from './gameState.js';

const processCardClick = (gameState, action) => {
  const thisCard = gameState.cards[action.card_number];
  if (thisCard.revealed[action.player]){
    // card was already revealed, do nothing
    return gameState;
  }

  // regardless of the identity of the card, reveal
  const revealedIdentity = thisCard.identity[action.player];
  thisCard.revealed = [true, true];
  gameState.current_turn.guesses = [
    ...gameState.current_turn.guesses,
    {word: thisCard.word, result: revealedIdentity}
  ];

  switch(thisCard.identity[action.player]){
    case STATUS.ASSASIAN:
    gameState.message = 'Assasian contacted, game over';
    gameState.game_over = true;
    break;

    case STATUS.NEUTRAL:
    gameState.message = 'Found a bystander, turn over';
    break;

    case STATUS.AGENT:
    gameState.message = "Congratulations, found an agent!";
    break;

    default:
    break;
  }
  gameState.history = [
    ...gameState.history.slice(0, -1),
    {
      player: gameState.current_turn.player,
      clue: gameState.current_turn.clue,
      number: gameState.current_turn.number,
      guesses: gameState.current_turn.guesses,
      turn_end: REASON.PASS
    }
  ];

  return gameState;
}


const gameStateReducer = (gameState, action) => {
  let newGameState = {...gameState};
  switch(action.type){
    case 'CLICK_CARD':
      if (newGameState.current_turn.phase !== PHASE.CLICK){
        newGameState.message = 'Not time to click';
      }
      if (newGameState.current_turn.player !== action.player){
        newGameState.message = 'Not your turn';
      }
      newGameState = processCardClick(newGameState, action);
      return newGameState;
    default:
    return newGameState;
    }
  }

function App({initialGameState}) {

  initialGameState = initialGameState || getInitialGameState();
  const [gameState, gameStateDispatch] = useReducer(gameStateReducer, initialGameState);
  const clientState = gameStateToClientState(gameState, 0);
  const mapState = gameStateToMap(gameState, 0);
  const mapStateOther= gameStateToMap(gameState, 1);

  const clickOnCard = (card_number) => {
    gameStateDispatch({
      player: 0,
      type: 'CLICK_CARD',
      card_number
    })

  }


  return (
    <div className="App">

      <Message message={clientState.message}/>

      <div className="play-area">

        <CardLayout card_objects={clientState.cards} handleClickOnCard={clickOnCard}/>
        <History turns={clientState.history}/>

        <ClueRegion
          clue={clientState.current_turn.clue}
          number={clientState.current_turn.number}
        />

        <Map my_locations={mapState}/>
        <div>
          Player {gameState.current_turn.player}
          Word: {gameState.current_turn.clue}
          To guess: {gameState.current_turn.number}
          Guessed: {gameState.current_turn.guesses.length}
        </div>
        <Map my_locations={mapStateOther} />

      </div>
    </div>
  );
}

export default App;
