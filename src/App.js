import React from 'react';
import logo from './logo.svg';
import './App.css';
import Map from './map.js';
import {Card, CardLayout} from './card.js';


const MAP = [
  'assassian', 'agent', 'agent', 'neutral', 'neutral',
  'neutral', 'agent', 'assassian', 'neutral', 'agent',
  'neutral', 'agent', 'assassian', 'neutral', 'neutral',
  'agent', 'agent', 'agent', 'neutral', 'neutral',
  'agent', 'neutral', 'neutral', 'agent', 'agent'];

function App() {
  return (
    <div className="App">
      <Map my_locations={MAP}/>

      <div>A break</div>

      <CardLayout words={
        ['spanish', 'chinese', 'beijing', 'NZ', 'Javascript',
         'love', 'jedi', 'clone', 'danish', 'tiramasu',
         'landscape', 'wildlife', 'hike', 'embassy', 'parasite',
         'elephant', 'travel', 'siblings', 'testing', 'example',
         'teacher', 'astronaut', 'bootcamp', 'bake', 'meditate']}/>

      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>

    </div>
  );
}

export default App;
