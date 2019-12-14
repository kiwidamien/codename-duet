
const {PHASE, REASON, STATUS, DECK} = require('./constants.js');


const getClientState = (game, {playerIndex}) => {
    const clientState = {
        cards: [game.cards.map( (card) => {
            return {
                word: card.word,
                status: card.revealed[playerNumner]
            }
        })],
        history: [...game.history],
        current_turn: {...game.current_turn},
        nessage: game.message,
        game_over: game.game_over,
        validationErrors: game.validationErrors[playerIndex],
        canClick: game.canClick({playerIndex}),
        canClue: game.canGiveClue({playerIndex}),
        canPass: game.canPass({playerIndex})
    };

    return clientState;
}


const dispatchClickCard = (game, {playerIndex, cardIndex}) => {
    return 0;
}

const dispatchClickPass = (game, {playerIndex}) => {
    return 0;
}

const dispatchSendClue = (game, {playerIndex, clue, number}) => {
    const {success, message} = game.sendClue(playerIndex, clue, number);

    return 0;
}

const dispatchRefresh = (game, {playerIndex}) => {
    return 
}