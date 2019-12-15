import React, { Component } from 'react'
import Client from './Client.js';
import socketIOClient from 'socket.io-client'

import {getInitialGameState, gameStateToClientState} from './gameState.js';
//import gameStateReducer from './reducers/gameReducer.js';
import {newClueSentReducer, newClickCardReducer} from './reducers/clientClueReducer.js';

const URL = 'http://localhost:2000'

class NetworkApp extends Component {
  socket = socketIOClient(URL);
  state = {
    clientState: gameStateToClientState(getInitialGameState(), 1),
    playerNumber: 0
  }

  componentDidMount() {



    this.socket.on('server_state_update', (clientState) => {
      console.log('new client state');
      console.log(clientState);
      this.setState({clientState: clientState});
      console.log('Updated client state');
    });

    this.socket.onmessage = (evt) => {
      const message = JSON.parse(evt.data)
      console.log(evt)
      console.log(evt.data);
      console.log('Just processed message');
    }

    this.socket.onclose = () => {
      console.log('disconnected')
      this.socket = new WebSocket(URL);
    }
  }

  clientAction(action){
    switch(action.type){
      case 'CLICK_CARD':
        newClickCardReducer(this.socket, action);
      break
      case 'CLUE_SENT':
        newClueSentReducer(this.socket, action);
      break
      case 'PASS':
      break
      default:
      return
    }
  }

  changePlayer(evt){
    this.setState({playerNumber: evt.target.value});
  }

  render() {
    //const initialGameState = getInitialGameState();
    //const [gameState, gameStateDispatch] = useReducer(gameStateReducer, initialGameState);
    return (
      <div>
        <select onChange={(evt) => this.changePlayer(evt)} value={this.state.playerNumber}>
          <option value={0}>Player 0</option>
          <option value={1}>Player 1</option>
        </select>

        <Client
         clientState={this.state.clientState}
         gameStateDispatch={(action) => this.clientAction(action)}
         player={this.state.playerNumber} />
      </div>
    )
  }
}

export default NetworkApp
