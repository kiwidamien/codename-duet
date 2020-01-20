import {STATUS, PHASE, REASON} from '../constants.js';
import {makeGameStateNewTurn} from '../gameState.js';

const clickCard = (cardState, player) => {
  const revealedIdentity = cardState.identity[player];
  const newCardState = {...cardState};
  if (cardState.revealed[player] !== STATUS.UNKNOWN){
    return {revealedIdentity, newCardState, changed: false};
  }

  switch(revealedIdentity){
    case STATUS.ASSASSIN:
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
    case STATUS.ASSASSIN:
    newMessage = 'Assassin contacted, game over!';
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

const updateTurnInfo = (gameState, revealedIdentity, player) => {
  let newGameState = {...gameState};
  switch (revealedIdentity){
    case STATUS.NEUTRAL:
    newGameState = makeGameStateNewTurn(newGameState, player, REASON.BYSTANDER_GUESS);
    return newGameState;

    case STATUS.ASSASSIN:
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

export default processCardClick;
