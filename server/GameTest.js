const Game = require('./Game.js');
const {STATUS} = require('./constants.js');



const arrayEquals = (arr1, arr2) => {
    if (arr1 === arr2) return true;
    if (arr1 == null || arr2 == null) return false;
    if (arr1.length != arr2.length) return false;

    for (var i=0; i<arr1.length; i++){
        if (arr1[i] != arr2[i]) return false;
    }
    return true;
}

const g = new Game();


console.log(g.sendClue({playerIndex: 0, clue: 'penguin', number: 5}));
console.log(g.clickPass({playerIndex: 0}));
console.log(g.clickPass({playerIndex: 1}));
console.log(g.clickCardNumber({playerIndex: 0, cardIndex: 0}));
console.log(g.clickCardNumber({playerIndex: 1, cardIndex: 1}));
console.log(g.clickCardNumber({playerIndex: 1, cardIndex: 1}));
console.log(g.clickCardNumber({playerIndex: 1, cardIndex: 5}));
console.log(g.clickCardNumber({playerIndex: 1, cardIndex: 10}));
console.log(`Agents revealed: ${g.numAgentsRevealed()}`);
console.log(`Agents remaining: ${g.numAgentsRemaining()}`);
console.log(g.sendClue({playerIndex: 1, clue: 'rabbit'}));
console.log(g.sendClue({playerIndex: 1, clue: 'rabbit', number: 1}));

