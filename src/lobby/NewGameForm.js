import React, { useState } from 'react';
import Modal from 'react-modal';
import {Link} from 'react-router-dom';
import drawRandomWords from './words.js';
import {NEW_GAME_URL, CLIENT_URL} from '../constants.js';
import './new_game.css';


const makeNewGame = async (event, name, setNewGameURLs, words, playerNames, trackNumGuesses) => {
  event.preventDefault();
  console.log('Making a new game');
  if ((!words) || (!words[0])){
    words = getDefaultWords();
  }
  if ((!playerNames) || (playerNames.length !== 2)){
    playerNames = ['Player 0', 'Player 1'];
  }

  playerNames = playerNames.map( (playerName, index) => playerName ? playerName : `Player ${index}`);

  console.log(JSON.stringify({name, words}))
  fetch(NEW_GAME_URL, {
    method: 'post',
    body: JSON.stringify({name, words, playerNames, trackNumGuesses}),
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    }})
  .then(res => res.json())
  .then(games => {console.log(games); setNewGameURLs(games); });
}

const getDefaultWords = () => {
  return ['apple', 'mandarin', 'persimmon', 'javascript', 'kiwi',
          'love', 'jedi', 'clone', 'danish', 'tiramasu',
          'landscape', 'wildlife', 'hike', 'embassy', 'parasite',
          'elephant', 'travel', 'siblings', 'testing', 'example',
          'teacher', 'astronaut', 'bootcamp', 'bake', 'meditate'
        ];
}

const NewGameForm = () => {
  const [name, setName] = useState('');
  const [newGameURLs, setNewGameURLs] = useState(['', '']);
  const [words, setWords] = useState(drawRandomWords());
  const [playerNames, setPlayerNames] = useState(['','']);
  const [trackNumGuesses, setTrackNumGuesses] = useState(true);

  return (
    <div class="upper-level-new-game">
    <h2>New Game</h2>
    <form className="new-game" onSubmit={(e) => makeNewGame(e, name, setNewGameURLs, words, playerNames, trackNumGuesses)}>
    <div className="input-row">
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        id="name"
        value={name}
        placeholder='name to identify game in lobby'
        onChange={e => setName(e.target.value)}
        />
    </div>
    <div className="input-row">
      <label htmlFor="playerZeroName">First Player Name:</label>
      <input
        type="text"
        id="playerZeroName"
        value={playerNames[0]}
        placeholder="name to id player (leave blank for 'Player 0')"
        onChange={e => setPlayerNames([e.target.value, playerNames[1]])}
      />
    </div>
    <div className="input-row">
      <label htmlFor="playerOneName">Second Player Name:</label>
      <input
        type="text"
        id="playerOneName"
        value={playerNames[1]}
        placeholder="name to id player (leave blank for'Player 1')"
        onChange={e => setPlayerNames([playerNames[0], e.target.value])}
      />
    </div>
    <div class="word-selection-container">
      <div class="new-word-grid">
        {words.map( (word, index) => <input
            value={word}
            key={index}
            onChange={(e) => {
              const newWords = [...words];
              newWords[index] = e.target.value;
              setWords(newWords);
            }}
            />)}
      </div>

      <div className="input-row">
        <label htmlFor="trackTurnNum">Only allow one additional guess per turn:</label>
        <input
          type="checkbox"
          id="trackTurnNum"
          checked={trackNumGuesses}
          onChange={e => {setTrackNumGuesses(!trackNumGuesses);}}
        />
      </div>
      <div class="word-grid-controls">
        <button type="button" onClick={() => setWords(drawRandomWords())}>Random Draw</button>
        <button type="button" onClick={() => setWords(getDefaultWords())}>Default</button>
      </div>

      <div class="word-grid-controls">
        <Link to="/" className="cancel-button">Return home</Link>
        <button type="submit" className="submit-button">Create Game</button>
      </div>
    </div>
  </form>
  <Modal isOpen={newGameURLs[0]}>
    Created game with name {name || 'default'}
    <ul>
      <li><Link to={`/game/${newGameURLs[0]}`}>Your game (link)</Link></li>
      <li>URL to send to friend (their game): {`${CLIENT_URL}/game/${newGameURLs[1]}`}</li>
    </ul>
    <Link to='/'>Return to Lobby</Link>
  </Modal>
  </div>
)
}

export default NewGameForm;
