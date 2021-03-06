import React, { Component } from 'react'
import Client from './Client.js';
import socketIOClient from 'socket.io-client'
import { Redirect } from "react-router-dom";

import {newClueSentReducer, newClickCardReducer, newPassReducer, restartGame} from './reducers/clientClueReducer.js';

import {HOST_URL} from './constants';

class NetworkApp extends Component {
  socket = socketIOClient(HOST_URL);
  state = {
    clientState: null,
    playerNumber: 0,
    gameNotFoundError: false
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
      this.socket = new WebSocket(HOST_URL);
    }

    this.socket.on('invalid_hash', (hashValue) => {
      console.log(`Unknown hash for game: ${hashValue}`);
      this.setState({'gameNotFoundError': true});
    });
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

  render() {
    if (this.state.gameNotFoundError){
      return <Redirect to='/' />
    }


    if (!this.state.clientState){
      this.socket.emit('refresh', {hashValue: this.props.player_game_id});
      return (
        <div className='loading'>
        Loading
        </div>
      );
    }

    return (
      <div>
        <Client
         clientState={this.state.clientState}
         gameStateDispatch={(action) => this.clientAction(action)}
         player={this.state.playerNumber} />
      </div>
    )
  }
}

export default NetworkApp
