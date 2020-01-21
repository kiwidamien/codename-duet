const newClueSentReducer = (socket, {hashValue, clue, number}) => {
  console.log('called newClueSentReducer');
  console.log(`Used parameters ${hashValue}, ${clue}, ${number}`);
  socket.emit('give_clue', {hashValue, clue, number});
}

const newClickCardReducer = (socket, {hashValue, cardIndex}) => {
  console.log('called ClickCardReducer');
  console.log(`Params: playerIndex ${hashValue} and cardIndex ${cardIndex}`);
  socket.emit('click_card', {hashValue, cardIndex});
}

const newPassReducer = (socket, {hashValue}) => {
  console.log('Called newPassReducer');
  socket.emit('pass', {hashValue});
}

const restartGame = (socket, {hashValue, newWords}) => {
  console.log(`Restarting game ${hashValue}`)
  socket.emit('restart', {hashValue, newWords});
}

export {newClueSentReducer, newClickCardReducer, newPassReducer, restartGame};
