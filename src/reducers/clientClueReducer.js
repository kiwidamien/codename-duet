const newClueSentReducer = (socket, {player, clue, number}) => {
  console.log('called newClueSentReducer');
  console.log(`Used parameters ${player}, ${clue}, ${number}`);
  socket.emit('give_clue', {playerIndex: player, clue, number});
}

const newClickCardReducer = (socket, {player, cardIndex}) => {
  socket.emit('click_card', {playerIndex: player, cardIndex: cardIndex});
}

export {newClueSentReducer, newClickCardReducer};
