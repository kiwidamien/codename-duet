import React, { Component } from 'react'
import './App.css'
import Chat from './Chat'

import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:2000');

const subscribeToTimer = (callback) => {
  socket.on('timer', timestamp => callback(null, timestamp));
  socket.emit('subscribeToTimer', 1000);
}

class App extends Component {
  state = {
    timestamp: 'no timestamp yet'
  };

  constructor(props){
    super(props);
    subscribeToTimer((err, timestamp) => this.setState({timestamp}));
  }

  render() {
    return (
      <div className="App">
        Timer value: {this.state.timestamp}
        <Chat />
      </div>
    )
  }
}

export default App
