import React from 'react';
import {STATUS, REASON} from './constants.js';

import Map from './map.js';
import {CardLayout} from './card.js';
import History from './history.js';
import Message from './message.js';



const MAP = [
  'assassian', 'agent', 'agent', 'neutral', 'neutral',
  'neutral', 'agent', 'assassian', 'neutral', 'agent',
  'neutral', 'agent', 'assassian', 'neutral', 'neutral',
  'agent', 'agent', 'agent', 'neutral', 'neutral',
  'agent', 'neutral', 'neutral', 'agent', 'agent'];

const CARDS = [
  {word: 'apple', status: STATUS.ASSASIAN},
  {word: 'mandarin', status: STATUS.AGENT},
  {word: 'persimmon', status: STATUS.AGENT},
  {word: 'javascript', status: STATUS.NEUTRAL},
  {word: 'kiwi', status: STATUS.NEUTRAL},
  {word: 'love', status: STATUS.NEUTRAL},
  {word: 'jedi', status: STATUS.AGENT},
  {word: 'clone', status: STATUS.ASSASIAN},
  {word: 'danish', status: STATUS.NEUTRAL},
  {word: 'tiramasu', status: STATUS.AGENT},
  {word: 'landscape', status: STATUS.NEUTRAL},
  {word: 'wildlife', status: STATUS.AGENT},
  {word: 'hike', status: STATUS.ASSASIAN},
  {word: 'embassy', status: STATUS.NEUTRAL},
  {word: 'parasite', status: STATUS.NEUTRAL},
  {word: 'elephant', status: STATUS.AGENT},
  {word: 'travel', status: STATUS.AGENT},
  {word: 'siblings', status: STATUS.AGENT},
  {word: 'testing', status: STATUS.NEUTRAL},
  {word: 'example', status: STATUS.NEUTRAL},
  {word: 'teacher', status: STATUS.AGENT},
  {word: 'astronaut', status: STATUS.NEUTRAL},
  {word: 'bootcamp', status: STATUS.NEUTRAL},
  {word: 'bake', status: STATUS.AGENT},
  {word: 'meditate', status: STATUS.AGENT}
];

const TURNS = [
  {
    player: 0, clue: 'elephant', number: 4,
    guesses: [
      {word: 'bake', result: STATUS.AGENT},
      {word: 'tiramasu', result: STATUS.AGENT},
      {word: 'example', result: STATUS.NEUTRAL}
    ],
    turn_end: REASON.BYSTANDER_GUESS
  },
  {
    player: 1, clue: 'elephant', number: 2,
    guesses: [
      {word: 'bake', result: STATUS.AGENT},
      {word: 'tiramasu', result: STATUS.AGENT}
    ],
    turn_end: REASON.USED_GUESSES
  },
  {
    player: 0, clue: 'elephant', number: 4,
    guesses:[
      {word: 'bake', result: STATUS.AGENT}
    ],
    turn_end: REASON.PASS
  }
];


function App() {
  return (
    <div className="App">

      <Message />

      <div className="play-area">

        <CardLayout card_objects={CARDS}/>
        <History turns={TURNS}/>

         <div className="control-area">
                 <input placeholder="Type your one-word clue..."/>
                 <input placeholder="# of words"/>
                 <button>Submit!</button>
         </div>

        <Map my_locations={MAP}/>

      </div>
    </div>
  );
}

export default App;
