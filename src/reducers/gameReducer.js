import {PHASE} from '../constants.js';
import newClueSentReducer from './clueSentReducer.js';
import processPass from './PassReducer.js';
import processCardClick from './ClickReducer';

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

export default gameStateReducer;
