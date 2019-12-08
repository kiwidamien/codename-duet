import {PHASE} from '../constants.js';

const clueValidation = (clue, number) => {
  const validation_data = {isValid: true, message: ''};

  if (!clue){
    return {...validation_data,
      message: 'No word provided for the clue'
    }
  }

  if (!number){
    return {...validation_data,
      message: 'No number provided for the clue'
    }
  }

  if (!parseInt(number)){
    return {...validation_data,
      message: `${number} is not a valid number`
    }
  }

  let myNumber = parseInt(number);
  if (myNumber < 0){
    return {...validation_data,
      message: "Cannot have negative numbers (1 - 10) only"
    }
  }

  if (myNumber > 10){
    return {...validation_data,
      message: "Cannot have numbers greater than 10"
    }
  }
  return validation_data;
}



const newClueSentReducer = (gameState, {player, clue, number}) => {
  console.log(`Clue: ${clue} for number ${number}`);
  let newGameState = {...gameState};

  if (gameState.current_turn.phase !== PHASE.CLUE){
    newGameState.message = 'Clue already given for this turn';
    return newGameState;
  }

  const {isValid, message} = clueValidation(clue, number);
  if (!isValid){
    newGameState.message = message;
    return newGameState;
  }

  newGameState.current_turn = {...gameState.current_turn,
    phase: PHASE.CLICK,
    clue,
    number: parseInt(number)
  }
  newGameState.history = [
    ...newGameState.history.slice(0, -1),
    {...newGameState.current_turn}
  ];
  return newGameState;
}

export default newClueSentReducer;
