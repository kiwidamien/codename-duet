import React from 'react';

import Map from './map.js';
import {CardLayout} from './card.js';
import History from './history.js';
import Message from './message.js';
import ClueRegion from './ClueRegion.js';
//import {gameStateToClientState, gameStateToMap} from './gameState.js';
import AlertDiv from './AlertDiv.js';

//import gameStateReducer from './reducers/gameReducer.js';


function Client({clientState, gameStateDispatch, player}) {
  //const otherPlayer = 1 - player;
  console.log(clientState);
  //const mapState = gameStateToMap(gameState, otherPlayer);

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
    console.log('sent clue button pushed');
    gameStateDispatch({
      player,
      type: 'CLUE_SENT',
      clue,
      number
    })
  }

  return (
    <div className="App">

      {clientState.validationError && <AlertDiv duration={5000} message={clientState.validationError}/>}

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

        <Map my_locations={clientState.mapState}/>

        <div>
          Player {clientState.current_turn.player}<br/>
          Word: {clientState.current_turn.clue}<br/>
          Phase: {clientState.current_turn.phase}<br/>
          To guess: {clientState.current_turn.number}<br/>
          Guessed: {clientState.current_turn.guesses.length}<br/>
        </div>
      </div>
    </div>
  );
}

export default Client;
