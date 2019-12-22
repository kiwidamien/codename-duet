import React, { Component } from 'react'
import Client from './Client.js';
import socketIOClient from 'socket.io-client'

import {newClueSentReducer, newClickCardReducer, newPassReducer, restartGame} from './reducers/clientClueReducer.js';

const URL = 'http://localhost:2000'

class NetworkApp extends Component {
  socket = socketIOClient(URL);
  state = {
    clientState: null,
    playerNumber: 0
  }

  componentDidMount() {
    this.socket.on('connect', () => {
      this.socket.emit('join_game', this.props.player_game_id);
    });

    this.socket.on('server_state_update', (clientState) => {
      console.log('new client state');
      console.log(clientState);
      this.setState({clientState: clientState});
      console.log('Updated client state');
    });

    this.socket.onclose = () => {
      console.log('disconnected')
      this.socket = new WebSocket(URL);
    }
  }

  clientAction(bareAction){
    const action = {...bareAction, hashValue: this.props.player_game_id};
    switch(action.type){
      case 'CLICK_CARD':
        newClickCardReducer(this.socket, action);
      break
      case 'CLUE_SENT':
        newClueSentReducer(this.socket, action);
      break
      case 'PASS':
        newPassReducer(this.socket, action);
      break
      case 'RESTART':
        restartGame(this.socket, action);
      break
      default:
      console.log(`Unknown action ${action.type}`);
      return
    }
  }

  changePlayer(evt){
    this.setState({playerNumber: evt.target.value});
    this.socket.emit('refresh', {hashValue: this.props.player_game_id});
  }

  render() {
    if (!this.state.clientState){
      this.socket.emit('refresh', {hashValue: this.props.player_game_id});
      return (
        <div>
        Loading
        </div>
      );
    }

    return (
      <div>
        <select onChange={(evt) => this.changePlayer(evt)} value={this.state.playerNumber}>
          <option value={0}>Player 0</option>
          <option value={1}>Player 1</option>
        </select>

        Game ID: {this.props.player_game_id}

        <Client
         clientState={this.state.clientState}
         gameStateDispatch={(action) => this.clientAction(action)}
         player={this.state.playerNumber} />
      </div>
    )
  }
}

export default NetworkApp
