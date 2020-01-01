const {PHASE, REASON, STATUS, DECK} = require('./constants.js');

const arrayEquals = (arr1, arr2) => {
    if (arr1 === arr2) return true;
    if (arr1 == null || arr2 == null) return false;
    if (arr1.length !== arr2.length) return false;

    for (var i=0; i<arr1.length; i++){
        if (arr1[i] !== arr2[i]) return false;
    }
    return true;
}

const clueValidation = (clue, number) => {
    const validation_data = {isValid: false, message: ''};
    console.log('validating clue');
    if (!clue){
      console.log('no clue!');
      return {...validation_data,
        message: 'No word provided for the clue'
      }
    }

    if (!number){
      return {...validation_data,
        message: 'No number provided for the clue'
      }
    }

    if (!parseInt(number)){
      return {...validation_data,
        message: `${number} is not a valid number`
      }
    }

    let myNumber = parseInt(number);
    if (myNumber < 0){
      return {...validation_data,
        message: "Cannot have negative numbers (1 - 10) only"
      }
    }

    if (myNumber > 10){
      return {...validation_data,
        message: "Cannot have numbers greater than 10"
      }
    }
    return {...validation_data, isValid: true};
  }

const shuffle = (orig_array) => {
  let array = [...orig_array];
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
      let index = Math.floor(Math.random() * counter);
      counter--;

      // And swap the last element with it
      let temp = array[counter];
      array[counter] = array[index];
      array[index] = temp;
  }
  return array;
}

/*const TEST_CARDS = [
    {word: 'apple', identity: [STATUS.ASSASIAN, STATUS.ASSASIAN], revealed: [STATUS.UNKNOWN, STATUS.UNKNOWN] },
    {word: 'mandarin', identity: [STATUS.AGENT, STATUS.AGENT], revealed: [STATUS.UNKNOWN, STATUS.UNKNOWN]},
    {word: 'persimmon', identity: [STATUS.AGENT, STATUS.AGENT], revealed: [STATUS.UNKNOWN, STATUS.UNKNOWN]},
    {word: 'javascript', identity: [STATUS.NEUTRAL, STATUS.NEUTRAL], revealed: [STATUS.UNKNOWN, STATUS.UNKNOWN]},
    {word: 'kiwi', identity: [STATUS.NEUTRAL, STATUS.NEUTRAL], revealed: [STATUS.UNKNOWN, STATUS.UNKNOWN]},
    {word: 'love', identity: [STATUS.NEUTRAL, STATUS.NEUTRAL], revealed: [STATUS.UNKNOWN, STATUS.UNKNOWN]},
    {word: 'jedi', identity: [STATUS.AGENT, STATUS.AGENT], revealed: [STATUS.UNKNOWN, STATUS.UNKNOWN]},
    {word: 'clone', identity: [STATUS.ASSASIAN, STATUS.ASSASIAN], revealed: [STATUS.UNKNOWN, STATUS.UNKNOWN]},
    {word: 'danish', identity: [STATUS.NEUTRAL, STATUS.NEUTRAL], revealed: [STATUS.UNKNOWN, STATUS.UNKNOWN]},
    {word: 'tiramasu', identity: [STATUS.AGENT, STATUS.AGENT], revealed: [STATUS.UNKNOWN, STATUS.UNKNOWN]},
    {word: 'landscape', identity: [STATUS.NEUTRAL, STATUS.NEUTRAL], revealed: [STATUS.UNKNOWN, STATUS.UNKNOWN]},
    {word: 'wildlife', identity: [STATUS.AGENT, STATUS.AGENT], revealed: [STATUS.UNKNOWN, STATUS.UNKNOWN]},
    {word: 'hike', identity: [STATUS.ASSASIAN, STATUS.ASSASIAN], revealed: [STATUS.UNKNOWN, STATUS.UNKNOWN]},
    {word: 'embassy', identity: [STATUS.NEUTRAL, STATUS.NEUTRAL], revealed: [STATUS.UNKNOWN, STATUS.UNKNOWN]},
    {word: 'parasite', identity: [STATUS.NEUTRAL, STATUS.NEUTRAL], revealed: [STATUS.UNKNOWN, STATUS.UNKNOWN]},
    {word: 'elephant', identity: [STATUS.AGENT, STATUS.AGENT], revealed: [STATUS.UNKNOWN, STATUS.UNKNOWN]},
    {word: 'travel', identity: [STATUS.AGENT, STATUS.AGENT], revealed: [STATUS.UNKNOWN, STATUS.UNKNOWN]},
    {word: 'siblings', identity: [STATUS.AGENT, STATUS.AGENT], revealed: [STATUS.UNKNOWN, STATUS.UNKNOWN]},
    {word: 'testing', identity: [STATUS.NEUTRAL, STATUS.NEUTRAL], revealed: [STATUS.UNKNOWN, STATUS.UNKNOWN]},
    {word: 'example', identity: [STATUS.NEUTRAL, STATUS.NEUTRAL], revealed: [STATUS.UNKNOWN, STATUS.UNKNOWN]},
    {word: 'teacher', identity: [STATUS.AGENT, STATUS.AGENT], revealed: [STATUS.UNKNOWN, STATUS.UNKNOWN]},
    {word: 'astronaut', identity: [STATUS.NEUTRAL, STATUS.NEUTRAL], revealed: [STATUS.UNKNOWN, STATUS.UNKNOWN]},
    {word: 'bootcamp', identity: [STATUS.NEUTRAL, STATUS.NEUTRAL], revealed: [STATUS.UNKNOWN, STATUS.UNKNOWN]},
    {word: 'bake', identity: [STATUS.AGENT, STATUS.AGENT], revealed: [STATUS.UNKNOWN, STATUS.UNKNOWN]},
    {word: 'meditate', identity: [STATUS.AGENT, STATUS.AGENT], revealed: [STATUS.UNKNOWN, STATUS.UNKNOWN]}
  ];*/
const DefaultWords = ['apple', 'mandarin', 'persimmon', 'javascript', 'kiwi',
        'love', 'jedi', 'clone', 'danish', 'tiramasu',
        'landscape', 'wildlife', 'hike', 'embassy', 'parasite',
        'elephant', 'travel', 'siblings', 'testing', 'example',
        'teacher', 'astronaut', 'bootcamp', 'bake', 'meditate'];


class Game{
    constructor(words, playerNames){
      this.playerNames = (playerNames || ['', '']).map( (name, index) => name ? name : `Player ${index}`);
      this.restart(words);
    }

    restart(words){
      const our_deck = shuffle(DECK);
      // This makes sure we have 25 words, regardless of the length of
      // the array words
      const our_words = DefaultWords.map( (w, index) => ((words && words[index]) || (w)) );
      this.cards = our_words.map( (word, index) => {
          return {
              word,
              identity: our_deck[index],
              revealed: [STATUS.UNKNOWN, STATUS.UNKNOWN]
          }
      });
      this.history = [];
      this.current_turn = {
          player_clue: 0,
          phase: PHASE.CLUE,
          guesses: [],
          turn_end: REASON.NOT_OVER
      };
      this.message = '';
      this.game_over = false;
      this.validationErrors = ['', ''];
    }

    canClick({playerIndex}){
        if (this.game_over){
            return false;
        }
        const otherPlayer = 1 - this.current_turn.player_clue;
        return ((this.current_turn.phase === PHASE.CLICK) && (otherPlayer === playerIndex));
    }

    canGiveClue({playerIndex}){
        if (this.game_over){
            return false;
        }
        const cluePlayer = this.current_turn.player_clue;
        return ((this.current_turn.phase === PHASE.CLUE) && (cluePlayer === playerIndex));
    }

    canPass({playerIndex}){
        if (this.game_over){
            return false;
        }
        return (this.canClick({playerIndex}) && (this.current_turn.guesses.length > 0));
    }

    clickCardNumber({playerIndex, cardIndex}){
        const thisCard = this.cards[cardIndex];
        if (!thisCard){
            return {success: false, revealed: null, reason: 'no such card'};
        }
        if (!this.canClick({playerIndex})){
            return {success: false, revealed: null, reason: 'not turn to click'};
        }
        const revealedIdentity = thisCard.identity[playerIndex];
        if (thisCard.revealed[playerIndex] !== STATUS.UNKNOWN){
            return {success: false, revealed: thisCard.revealed[playerIndex],
                    reason: 'card already revealed'};
        }

        switch(revealedIdentity){
            case STATUS.ASSASIAN:
            case STATUS.AGENT:
                thisCard.revealed = [revealedIdentity, revealedIdentity];
            break;

            case STATUS.NEUTRAL:
                thisCard.revealed[playerIndex] = revealedIdentity;
            break;

            default:
                break;
        }
        this._updateStateOnClick({word: thisCard.word,
                                  revealed: revealedIdentity});

        return {success: true, revealed: revealedIdentity, reason:''}
    }

    clickPass({playerIndex}){
        if (!this.canPass({playerIndex})){
            return {success: false};
        }
        this.makeNewTurn(REASON.PASS);
        return {success: true};
    }

    sendClue({playerIndex, clue, number}){
        if (!this.canGiveClue({playerIndex})){
            return {success: false, message: 'Not turn to give clues'}
        }

        const {isValid, message} = clueValidation(clue, number);
        if (!isValid){
            return {success: false, message};
        }

        this.current_turn = {
            ...this.current_turn,
            phase: PHASE.CLICK,
            clue,
            number: parseInt(number)
        }
        this.history = [
            ...this.history,
            {...this.current_turn}
        ];
        return {success: true, message: ''};
    }

    numAgentsRevealed(){
        // agents revealed for all players
        const revealed_agent = this.cards.map((card) => {
            return arrayEquals(card.revealed, [STATUS.AGENT, STATUS.AGENT]);
        })
        return revealed_agent.reduce( (acc, val) => acc + val, 0);
    }

    numAgentsRemaining(){
        // agents revealed for all players, but WHO
        // is an agent is player dependent
        const revealed_agents = this.cards.map((card) => {
            return card.identity.some( (element) => (element === STATUS.AGENT));
        });
        const num_agents = revealed_agents.reduce( (acc, val) => acc + val, 0);
        return (num_agents - this.numAgentsRevealed());
    }

    totalAgents(){
      const total_number_agents = this.cards.map((card) => {
        return card.identity.some( (element) => (element === STATUS.AGENT) );
      }).reduce( (acc, val) => acc + val, 0);
      // Assumes that number of agents for player 0 === number of agents for player 1
      const agents_per_player = this.cards.map((card) => {
        return card.identity[0] === STATUS.AGENT;
      }).reduce( (acc, val) => acc + val, 0);
      return {
        total_agents: total_number_agents,
        agents_per_player
      };
    }

    numOfPlayerAgentsRevealed(playerIndex){
      const revealed_agent = this.cards.map((card) => {
        return (card.identity[playerIndex] === STATUS.AGENT) && (card.revealed[playerIndex] === STATUS.AGENT);
      });
      return revealed_agent.reduce( (acc, val) => acc + val, 0);
    }

    isAssassianRevealed(){
        const revealed_assassians = this.cards.map( (card) => {
            return card.revealed.some((element) => (element === STATUS.ASSASIAN))
        } );
        return revealed_assassians.some( (element) => element);
    }

    makeNewTurn(reason){
      const nextPlayer = () => {
        const playerIndex = this.current_turn.player_clue;
        const otherPlayer = 1 - playerIndex;
        const {agents_per_player} = this.totalAgents();
        const numAgentsToClue = agents_per_player - this.numOfPlayerAgentsRevealed(playerIndex);
        return (numAgentsToClue) > 0 ? otherPlayer : playerIndex;
      }

        const newTurn = {
            player_clue: nextPlayer(),
            phase: PHASE.CLUE,
            clue: '',
            number: 2,
            guesses: [],
            turn_end: REASON.NOT_OVER
        };
        this.history[this.history.length-1].turn_end = reason;
        this.current_turn = newTurn;
    }

    _updateGameOverStatus(){
        // this method is idempotent
        this.game_over = (this.isAssassianRevealed()) || (this.numAgentsRemaining() === 0);
    }

    _updateStateOnClick({word, revealed}){
        this.current_turn.guesses.push({
            word, result: revealed
        });
        this.history = [
            ...this.history.slice(0, -1),
            {...this.current_turn}
        ];

        switch(revealed){
            case STATUS.NEUTRAL:
                this.makeNewTurn(REASON.BYSTANDER_GUESS);
                return;
            break;

            case STATUS.ASSASIAN:
                this.history[this.history.length-1].turn_end = REASON.DEATH_GUESS;
            break;

            default:
                break;
        }

        this._updateGameOverStatus();
        if (this.game_over){
            return;
        }

        const guessNumber = this.current_turn.guesses.length;
        if ((guessNumber === this.current_turn.number + 1) &&
            (this.current_turn.number > 0) &&
            (this.current_turn.phase === PHASE.CLICK)){
                this.makeNewTurn(REASON.OUT_OF_GUESSES);
            }
    }
}

module.exports = Game
