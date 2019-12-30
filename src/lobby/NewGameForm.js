import React, { useState } from 'react';
import Modal from 'react-modal';
import {Link} from 'react-router-dom';
import drawRandomWords from './words.js';
import './new_game.css';


const makeNewGame = async (event, name, setNewGameURLs) => {
  event.preventDefault();
  console.log('Making a new game');
  fetch(`http://localhost:2000/make_new_game?name=${escape(name)}`)
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
  const [words, setWords] = useState(getDefaultWords());

  return (
    <div>
    <h2>New Game</h2>
    <form className="new-game" onSubmit={(e) => makeNewGame(e, name, setNewGameURLs)}>
    <label htmlFor="name">Name</label>
    <input
      type="text"
      id="name"
      value={name}
      onChange={e => setName(e.target.value)}
    />
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

      <div class="word-grid-controls">
        <button onClick={() => setWords(drawRandomWords())}>Random Draw</button>
        <button onClick={() => setWords(getDefaultWords())}>Default</button>
      </div>

      <div class="word-grid-controls">
        <Link to="/" className="cancel-button">Return home</Link>
        <button type="submit" className="submit-button">Create Game</button>
      </div>
    </div>
  </form>
  <Modal isOpen={newGameURLs[0]}>
  <ul>
    <li><Link to={`/game/${newGameURLs[0]}`}>Your game (link)</Link></li>
    <li>URL to send to friend (their game): {`http://localhost:3000/game/${newGameURLs[1]}`}</li>
  </ul>
  </Modal>
  </div>
)
}

export default NewGameForm;

/*
<html>
<link href='mock_new_game.css' rel='stylesheet' />
<body>


<div>
<h2>New Game</h2>
<form class="new-game">
<label htmlFor="name">Name</label>
<input
  type="text"
  id="name"
  value={name}
/>
<div class="new-word-selection">
  <h3>Words to use</h3>
  <div class="word-selection-container">
    <div class="new-word-grid">
      <input />
      <input />
      <input />
      <input />
      <input />
      <input />
      <input />
      <input />
      <input />
      <input />
      <input />
      <input />
      <input />
      <input />
      <input />
      <input />
      <input />
      <input />
      <input />
      <input />
      <input />
      <input />
      <input />
      <input />
      <input />
    </div>
    <div class="word-grid-controls">
      <button>Random Draw</button>
      <button>Default</button>
    </div>
    </div>
</div>

<div class="word-grid-controls">
  <a href="/" class="cancel-button">Return to lobby</a>
  <button type="submit" class="submit-button">Create Game</button>
</div>
</form>
</div>

</body>
</html>
*/
