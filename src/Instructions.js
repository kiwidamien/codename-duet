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
                <div>
                The aim is to find all 15 agents (green) within 9 turns. How people act depends on
                who approaches them -- you and your partner might get different responses from the
                same person/card!
                </div>

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

                <div>
                    <h4>Note on Assassian cards:</h4>

                    There are 3 assassian cards on your map (black). One of them is an assassian
                    card for both of you, one is an agent that will respond to you, one is a bystander.

                    Storywise, this means that out of the three people that would eliminate your partner, 
                    one would actually talk to you!
                </div>

            </div>
        </div>
    )
}

export default Instructions;
