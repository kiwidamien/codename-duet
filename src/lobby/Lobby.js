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

  return (
    <div>

    <h2>Codename Duet Lobby</h2>

    <h4>Game list</h4>

    {isLoading ? (
      <div className='loading'>Loading...</div>
    ) : (
      <div>
      <ul>
      {Object.keys(gameInfo).map( (key) => {
        const gameJoinData = {
          gameName: gameInfo[key].gameName,
          url_join: `/game/${key}`,
          playerIndex: gameInfo[key].playerIndex
        };
        return (
          <li><Link to={gameJoinData.url_join}>{gameJoinData.gameName} (Player {gameJoinData.playerIndex})</Link></li>
        )})
      }
      </ul>

      </div>
    )}
    <NewGameButton />
    </div>
  );
}

export default Lobby;
