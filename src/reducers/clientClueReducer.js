const newClueSentReducer = (socket, {player, clue, number}) => {
  console.log('called newClueSentReducer');
  console.log(`Used parameters ${player}, ${clue}, ${number}`);
  socket.emit('give_clue', {playerIndex: player, clue, number});
}

const newClickCardReducer = (socket, {player, cardIndex}) => {
  console.log('called ClickCardReducer');
  console.log(`Params: playerIndex ${player} and cardIndex ${cardIndex}`);
  socket.emit('click_card', {playerIndex: player, cardIndex: cardIndex});
}

const newPassReducer = (socket, {player}) => {
  console.log('Called newPassReducer');
  socket.emit('pass', {playerIndex: player});
}

const restartGame = (socket, {player}) => {
  console.log('Restarting game')
  socket.emit('restart', {playerIndex: player});
}

export {newClueSentReducer, newClickCardReducer, newPassReducer, restartGame};
