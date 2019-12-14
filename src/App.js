import React, {useReducer} from 'react';
import Client from './Client.js';

import {getInitialGameState} from './gameState.js';
import gameStateReducer from './reducers/gameReducer.js';


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
