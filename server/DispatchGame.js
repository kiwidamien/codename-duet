const {STATUS} = require('./constants.js');

const gameStateToMap = (game, playerNumber) =>{
  return game.cards.map( (card) => card.identity[playerNumber]);
}


const getClientState = (game, {playerIndex}) => {
    const numAgents = game.totalAgents()
    const clientState = {
        cards: game.cards.map( (card) => {
            return {
                word: card.word,
                status: card.revealed[playerIndex]
            }
        }),
        history: [...game.history],
        current_turn: {...game.current_turn},
        message: game.message,
        game_over: game.game_over,
        validationError: game.validationErrors[playerIndex],
        canClick: game.canClick({playerIndex}),
        canClue: game.canGiveClue({playerIndex}),
        canPass: game.canPass({playerIndex}),
        mapState: gameStateToMap(game, 1 - playerIndex),
        allAgents: {found: game.numAgentsRevealed(),
                    total: numAgents.total_agents},
        yourAgents: {found: numAgents.agents_per_player - game.numOfPlayerAgentsRevealed(playerIndex),
                     total: numAgents.agents_per_player},
        theirAgents: {found: numAgents.agents_per_player - game.numOfPlayerAgentsRevealed(1-playerIndex),
                     total: numAgents.agents_per_player},
        players: ['Player 0', 'Player 1']
    };

    return clientState;
}

const getClientStates = (game, success) => {
  return {
    success,
    clientStates: [getClientState(game, {playerIndex: 0}),
                   getClientState(game, {playerIndex: 1})]
  }
}


const dispatchClickCard = (game, {playerIndex, cardIndex}) => {
    const {success, reason} = game.clickCardNumber({playerIndex: parseInt(playerIndex),
                                                    cardIndex: parseInt(cardIndex)});
    console.log(`Card clicked by ${playerIndex} with index ${cardIndex}, result ${success} (${reason})`);
    return getClientStates(game, success);
}

const dispatchClickPass = (game, {playerIndex}) => {
    const {success} = game.clickPass({playerIndex});
    return getClientStates(game, success);
}

const dispatchSendClue = (game, {playerIndex, clue, number}) => {
    const {success, message} = game.sendClue({playerIndex: parseInt(playerIndex), clue, number});
    console.log(`sent clue (${clue} for ${number} from ${playerIndex}) and got result ${success}`);
    console.log(`Success: ${success} (${message})`);
    return getClientStates(game, success);
}

const dispatchRefresh = (game, {playerIndex}) => {
    return getClientStates(game, true);
}

const dispatchRestart = (game, {playerIndex}) => {
    game.restart();
    return getClientStates(game, true);
}


module.exports = {dispatchClickCard, dispatchClickPass, dispatchSendClue, dispatchRefresh, dispatchRestart};
