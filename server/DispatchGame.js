const {PHASE, REASON, STATUS, DECK} = require('./constants.js');


const getClientState = (game, {playerIndex}) => {
    const clientState = {
        cards: [game.cards.map( (card) => {
            return {
                word: card.word,
                status: card.revealed[playerIndex]
            }
        })],
        history: [...game.history],
        current_turn: {...game.current_turn},
        nessage: game.message,
        game_over: game.game_over,
        validationError: game.validationErrors[playerIndex],
        canClick: game.canClick({playerIndex}),
        canClue: game.canGiveClue({playerIndex}),
        canPass: game.canPass({playerIndex})
    };

    return clientState;
}

const getClientStates = (game, success) => {
  return {
    success: true,
    clientStates: [getClientState(game, 0), getClientState(game, 1)]
  }
}


const dispatchClickCard = (game, {playerIndex, cardIndex}) => {
    const {success} = game.clickCardNumber({playerIndex, cardIndex});
    return getClientStates(game, success);
}

const dispatchClickPass = (game, {playerIndex}) => {
    const {success} = game.clickPass({playerIndex});
    return getClientStates(game, success);
}

const dispatchSendClue = (game, {playerIndex, clue, number}) => {
    const {success} = game.sendClue(playerIndex, clue, number);
    return getClientStates(game, success);
}

const dispatchRefresh = (game, {playerIndex}) => {
    return getClientStates(game, true);
}


module.exports = {dispatchClickCard, dispatchClickPass, dispatchSendClue, dispatchRefresh};
