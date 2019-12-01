import React from 'react';
import './ClueRegion.css';


const ClueRegion = ({clue, number}) => {
  return (
    <div className="control-area">
            <input placeholder="Type your one-word clue..." value={clue}/>
            <input placeholder="# of words" value={number}/>
            <button type="submit">Submit!</button>
            <button type="submit">Pass</button>
    </div>
  );
}

export default ClueRegion;
