/*
  This is using hooks with fetching data
  In principle, we could write this as a class
  (parallel to NetworkApp) but here I wanted
  practice using Hooks with data fetching and
  effects. This is a slightly simpler component.

  There is no good architecture reason why this method
  is implemented with Hooks and the NetworkApp with
  classes.
*/

import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom'
import NewGameButton from './NewGameButton';
import {HOST_URL} from '../constants';
import "./lobby.css";

const Lobby = () => {
  const [gameInfo, setGameInfo]  = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect( () => {
    setLoading(true);
    fetch(`${HOST_URL}/game_list`)
      .then(res => res.json())
      .then(games => {setGameInfo(games); })
      .finally(() => setLoading(false));
    }, []);


  const theGames = {};
  Object.keys(gameInfo).forEach( (gamePlayerHash) => {
    const gamePlayerCombo = gameInfo[gamePlayerHash];
    const gameHash = gamePlayerCombo['gameHash'];
    if (!theGames[gameHash]){
      theGames[gameHash] = {gameName: gamePlayerCombo.gameName, players: ['', '']};
    }
    theGames[gameHash].players[gamePlayerCombo.playerIndex] = `/game/${gamePlayerHash}`;
  });

  return (
    <div>

    <h2>Codename Duet Lobby</h2>

    <h4>Game list</h4>

    {isLoading ? (
      <div className='loading'>Loading...</div>
    ) : (
      <div>
      <div className="game-box-container">
        {Object.keys(theGames).map(key => {
          const thisGame = theGames[key];
          return (
            <div className="game-box">
            <b>Game <span>{thisGame.gameName}</span>:</b>
              <div className="game-box-links">
                <Link to={thisGame.players[0]}>Player 0 Link</Link>
                <Link to={thisGame.players[1]}>Player 1 Link</Link>
              </div>
            </div>
          )
        })}
      </div>
    </div>
    )}
    <NewGameButton />
    </div>
  );
}

export default Lobby;
