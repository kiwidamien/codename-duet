import React, {useReducer} from 'react';

import Map from './map.js';
import {CardLayout} from './card.js';
import History from './history.js';
import Message from './message.js';
import ClueRegion from './ClueRegion.js';
import {gameStateToClientState, gameStateToMap, getInitialGameState} from './gameState.js';

import gameStateReducer from './reducers/gameReducer.js';


function Client({gameState, gameStateDispatch, player}) {
  const otherPlayer = 1 - player;
  const clientState = gameStateToClientState(gameState, player);
  const mapState = gameStateToMap(gameState, otherPlayer);

  const clickOnCard = (card_number) => {
    gameStateDispatch({
      player: player,
      type: 'CLICK_CARD',
      card_number
    })
  }

  const onClickPass = () => {
    gameStateDispatch({
      player: player,
      type: 'PASS'
    })
  }

  const onSendClue = (clue, number) => {
    gameStateDispatch({
      player,
      type: 'CLUE_SENT',
      clue,
      number
    })
  }

  console.log(clientState);
  return (
    <div className="App">

      <Message message={`Player ${player}: ${clientState.message}`}/>

      <div className="play-area">

        <CardLayout
          card_objects={clientState.cards}
          handleClickOnCard={clickOnCard}
          canClick={clientState.canClick}
        />
        <History turns={clientState.history}/>

        <ClueRegion
          clue={clientState.current_turn.clue}
          number={clientState.current_turn.number}
          onClickPass={onClickPass}
          onClickSubmit={onSendClue}
          canPass={clientState.canPass}
          canClue={clientState.canClue}
        />

        <Map my_locations={mapState}/>
        <div>
          Player {gameState.current_turn.player}<br/>
          Word: {gameState.current_turn.clue}<br/>
          Phase: {gameState.current_turn.phase}<br/>
          To guess: {gameState.current_turn.number}<br/>
          Guessed: {gameState.current_turn.guesses.length}<br/>
        </div>
      </div>
    </div>
  );
}

function App({initialGameState}) {
  initialGameState = initialGameState || getInitialGameState();
  const [gameState, gameStateDispatch] = useReducer(gameStateReducer, initialGameState);
  return(
    <div>
      <Client gameState={gameState} gameStateDispatch={gameStateDispatch} player={0} />
      <Client gameState={gameState} gameStateDispatch={gameStateDispatch} player={1} />
    </div>
  );
}

export default App;
