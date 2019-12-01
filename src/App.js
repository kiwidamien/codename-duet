import React, {useReducer} from 'react';
import {STATUS, REASON, PHASE} from './constants.js';

import Map from './map.js';
import {CardLayout} from './card.js';
import History from './history.js';
import Message from './message.js';
import ClueRegion from './ClueRegion.js';
import {gameStateToClientState, gameStateToMap, getInitialGameState} from './gameState.js';


const clickCard = (cardState, player) => {
  const revealedIdentity = cardState.identity[player];
  const newCardState = {...cardState};
  if (cardState.revealed[player] !== STATUS.UNKNOWN){
    return {revealedIdentity, newCardState, changed: false};
  }

  switch(revealedIdentity){
    case STATUS.ASSASIAN:
    case STATUS.AGENT:
    newCardState.revealed = [revealedIdentity, revealedIdentity];
    break;

    case STATUS.NEUTRAL:
    newCardState.revealed[player] = revealedIdentity;
    break;

    default:
    break;
  }
  return {revealedIdentity, newCardState, changed: true};
}

const processMessageOnClick = (revealedIdentity, oldMessage) => {
  let newMessage=oldMessage, gameOver = false;
  switch(revealedIdentity){
    case STATUS.ASSASIAN:
    newMessage = 'Assasian contacted, game over!';
    gameOver = true;
    break;

    case STATUS.AGENT:
    newMessage = 'Congratulations, you found an agent';
    break;

    case STATUS.NEUTRAL:
    newMessage = 'You have revealed yourself to a bystander, turn over';
    break

    default:
    break
  }
  return {newMessage, gameOver};
}

const processHistoryOnClick = (gameState, thisCard, player) => {
  const newGameState = {...gameState};
  newGameState.current_turn.guesses = [
    ...gameState.current_turn.guesses,
    {word: thisCard.word, result: thisCard.revealed[player]}
  ];

  newGameState.history = [
    ...newGameState.history.slice(0, -1),
    {...newGameState.current_turn}
  ];

  return newGameState;
}


const makeGameStateNewTurn = (gameState, player, reason) => {
  const newTurn = {
    player,
    phase: PHASE.CLUE,
    clue: '',
    number: 2,
    guesses: [],
    turn_end: REASON.NOT_OVER
  };

  const newGameState = {...gameState,
    current_turn: newTurn
  };
  newGameState.history[newGameState.history.length-1].turn_end = reason;
  newGameState.history.push(newGameState.current_turn);
  return newGameState;
}


const updateTurnInfo = (gameState, revealedIdentity, player) => {
  let newGameState = {...gameState};
  switch (revealedIdentity){
    case STATUS.NEUTRAL:
    newGameState = makeGameStateNewTurn(newGameState, player, REASON.BYSTANDER_GUESS);
    return newGameState;

    case STATUS.ASSASIAN:
    newGameState.history[newGameState.history.length-1].turn_end = REASON.DEATH_GUESS;
    return newGameState;

    default:
    break;
  }

  const guessNumber = newGameState.current_turn.guesses.length;
  if ((guessNumber === gameState.current_turn.number + 1) &&
      (gameState.current_turn.number > 0) &&
      (gameState.current_turn.phase === PHASE.CLICK)){
        newGameState = makeGameStateNewTurn(newGameState, player, REASON.OUT_OF_GUESSES);
      }

  return newGameState;
}


const processCardClick = (gameState, action) => {
  const thisCard = gameState.cards[action.card_number];
  const {revealedIdentity, newCardState, changed} = clickCard(thisCard, action.player);
  if (!changed){
    return gameState;
  }

  const {newMessage, gameOver} = processMessageOnClick(revealedIdentity, gameState.message);

  gameState.cards[action.card_number] = newCardState;
  gameState.message = newMessage;
  gameState.game_over = gameOver;

  gameState = processHistoryOnClick(gameState, newCardState, action.player);
  gameState = updateTurnInfo(gameState, revealedIdentity, action.player);

  console.log(gameState);
  return gameState;
}


const processPass = (gameState, action) => {
  const gamePhase = gameState.current_turn.phase;
  let newGameState = {...gameState}

  if (gamePhase !== PHASE.CLICK){
    newGameState.message = 'Can only pass turning the clicking phase';
    return newGameState;
  }

  if (newGameState.current_turn.player !== action.player){
    newGameState.message = 'Can only pass on your turn';
    return newGameState;
  }

  if (newGameState.current_turn.guesses.length === 0){
    newGameState.message = 'Need to make at least one guess before passing';
    return newGameState;
  }

  newGameState = makeGameStateNewTurn(newGameState, action.player, REASON.PASS);
  return newGameState;
}


const newClueSentReducer = (gameState, {player, clue, number}) => {
  console.log(`Clue: ${clue} for number ${number}`);
  let newGameState = {...gameState};
  return newGameState;
}


const gameStateReducer = (gameState, action) => {
  let newGameState = {...gameState};
  console.log('root reducer called');
  switch(action.type){
    case 'CLICK_CARD':
      if (newGameState.current_turn.phase !== PHASE.CLICK){
        newGameState.message = 'Not time to click';
        return newGameState;
      }
      if (newGameState.current_turn.player !== action.player){
        newGameState.message = 'Not your turn';
        return newGameState;
      }
      newGameState = processCardClick(newGameState, action);
      return newGameState;

    case 'CLUE_SENT':
      newGameState = newClueSentReducer(newGameState, action);
      return newGameState;

    case 'PASS':
      newGameState = processPass(gameState, action);
      return newGameState;

    default:
    return newGameState;
    }
  }

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
    console.log('onSendClue triggered');
    gameStateDispatch({
      player,
      type: 'CLUE_SENT',
      clue,
      number
    })
  }


  return (
    <div className="App">

      <Message message={`Player ${player}: ${clientState.message}`}/>

      <div className="play-area">

        <CardLayout card_objects={clientState.cards} handleClickOnCard={clickOnCard}/>
        <History turns={clientState.history}/>

        <ClueRegion
          clue={clientState.current_turn.clue}
          number={clientState.current_turn.number}
          onClickPass={onClickPass}
          onClickSubmit={onSendClue}
        />

        <Map my_locations={mapState}/>
        <div>
          Player {gameState.current_turn.player}
          Word: {gameState.current_turn.clue}
          To guess: {gameState.current_turn.number}
          Guessed: {gameState.current_turn.guesses.length}
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
