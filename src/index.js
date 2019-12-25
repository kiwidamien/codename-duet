import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import NetworkApp from './NetworkApp';
import Lobby from './lobby/Lobby';
import NewGameForm from './lobby/NewGameForm';
import * as serviceWorker from './serviceWorker';

import {
  BrowserRouter as Router,
  Route,
  Switch,
  useParams
} from 'react-router-dom'

ReactDOM.render(
  <div>
  <Router>
    <Route
    exact
     path='/'
     >
     <Lobby/>
     </Route>
     <Route
     exact
     path='/new_game'>
     <NewGameForm />
     </Route>
     <Route
     exact
     path='/404'>
     <div>Game is not found</div>
     </Route>
    <Route
     path='/game/:player_game_id'
     render={ ({match}) => <NetworkApp player_game_id={match.params.player_game_id}/> }
     />
  </Router>
  </div>
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
