import React, { useState } from 'react';
import Modal from 'react-modal';
import {Link} from 'react-router-dom';

const makeNewGame = async (event, name, setNewGameURLs) => {
  event.preventDefault();
  console.log('Making a new game');
  fetch(`http://localhost:2000/make_new_game?name=${escape(name)}`)
  .then(res => res.json())
  .then(games => {console.log(games); setNewGameURLs(games); });
}

const NewGameForm = () => {
  const [name, setName] = useState('');
  const [newGameURLs, setNewGameURLs] = useState(['', '']);
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
    <Link to="/">Return home</Link>
    <button type="submit">Create Game</button>
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
