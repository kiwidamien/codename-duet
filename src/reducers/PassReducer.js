import {PHASE, REASON} from '../constants.js';
import {makeGameStateNewTurn} from '../gameState.js';


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

export default processPass;
