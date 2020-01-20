import React, {useState} from 'react';
import './Instructions.css';


const Instructions = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className='collapsible-header'>
            <div onClick={() => setIsOpen(!isOpen)}>
                {`${isOpen ? 'Hide':'Show'} Instructions`}
            </div>
            <div className={`content ${isOpen ? '':'hide-div'}`}>
                
                <h3>Goal</h3>
                The aim is to find all 15 agents (green) within 9 turns. How people act depends on
                who approaches them -- you and your partner might get different responses from the
                same person/card!
                
                <h3>Types of cards</h3>
                <div>
                    Cards represent different types of agents:
                    <ul>
                        <li>Green: Agents to find (there are 9 green tiles)</li>
                        <li>Orange: Bystanders, selecting one will end your turn</li>
                        <li>Black: Assassians, selection one will end the game</li>
                    </ul>
                    You each have 9 agents for a total of 15 on the board (i.e. 3 agents will "talk" to
                    both of you)
                </div>

                <div>
                    Your map shows how the people will respond to being approached by your partner.
                    Pick clues that help your partner choose the green tiles on your map, and avoid
                    the black tiles.
                </div>

                <h3>A turn</h3>
                
                <div>
                On each turn, one player is the <b>clue giver</b> and the other is the <b>guesser</b>.
                </div>
                
                <div>
                <ul>
                  <li><b>For the clue-giver:</b> Give <i>one word</i> as a clue, and a number of (green) words you are associating with your clue. Your goal is to get your partner to guess all the <b>green</b> words on your map, regardless of information on your board.</li>
                  <li><b>For the guesser:</b> You will get one word and a number. Try to guess that number of words to uncover agents. You are trying to guess based  on what is on your partner's map -- regardless of what it shows on your map! You can pass once you have made at least one guess. Note: You will always be able to make one more guess than the number (this allows you to "catch up" on clues you miss on earlier turns). Your turn ends as soon as you pass, or after your first non-agent guess.</li>
                </ul>
                At the end of each turn, the clue giver and the guesser will swap roles.
                </div>
                
                <div>
                    <h4>Note on Assassian cards:</h4>

                    There are 3 assassin cards on your map (black). One of them is an assassin
                    card for both of you, one is an agent that will respond to you, one is a bystander.

                    Storywise, this means that out of the three people that would eliminate your partner:
                    <ul>
                        <li>One trusts you but not your partner  (i.e. an agent that only you can approach)</li>
                        <li>One would ignore you (a bystander) but will defend herself against your partner with deadly force</li>
                        <li>One would eliminate either of you gladly</li>
                    </ul> 
                    Sadly, you only know how any given person/card responds to your partner.
                </div>
                
                <h3>Hints</h3>
                <ul>
                  <li>When guessing, start with the words you are most confident in (remember, your turn ends after the first incorrect guess).</li>
                  <li>If you are really unsure, you can pass (instead of risking an assassin) after selecting at least one word.</li>
                  <li>When giving clues, check to make sure that none of your clues can be associated with the assassin cards!</li>
                  <li>Recall that one of the three assassin cards on your map is an agent for you -- i.e. you need to click on exactly one of the three cards you are trying to get your partner to avoid.</li>
                </ul>

            </div>
        </div>
    )
}

export default Instructions;
