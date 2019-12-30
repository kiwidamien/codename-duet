import React from 'react';

import Map from './map.js';
import {CardLayout} from './card.js';
import History from './history.js';
import Message from './message.js';
import Modal from 'react-modal';
import ClueRegion from './ClueRegion.js';
import AlertDiv from './AlertDiv.js';
import Instructions from './Instructions.js';


function Client({clientState, gameStateDispatch, player}) {

  const clickOnCard = (card_number) => {
    gameStateDispatch({
      player: player,
      type: 'CLICK_CARD',
      cardIndex: card_number
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

  const onClickRestart = () => {
    console.log('Restarting game');
    gameStateDispatch({
      player,
      type: 'RESTART'
    });
  }

  return (
    <div className="App">

      {clientState.validationError && <AlertDiv duration={5000} message={clientState.validationError}/>}

      <Message
        canClue={clientState.canClue}
        canClick={clientState.canClick}
        turnNumber={clientState.history.length}
        turnPhase={clientState.current_turn.phase}
        gameOver={clientState.game_over}
        clueInfo={{
          word: clientState.current_turn.clue,
          number: clientState.current_turn.number,
          guesses: clientState.current_turn.guesses.length
        }}
        agentInfo={{
          numAgentsFound: clientState.allAgents.found,
          numYourAgentsRemaining: clientState.yourAgents.total - clientState.yourAgents.found
        }}
        onClickRestart={onClickRestart}
        message='Player 4'
      />

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

        <Modal isOpen={clientState.game_over}>hello</Modal>
        <Instructions/>
      </div>
    </div>
  );
}

export default Client;
