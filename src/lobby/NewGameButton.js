import React from 'react';
import { useHistory } from "react-router-dom";

const NewGameButton = () => {
  const history = useHistory();
  const onClick = () => {
    history.push('/new_game');
  }
  return (
    <button type="button" onClick={onClick}>New Game</button>
  );
}

export default NewGameButton;
