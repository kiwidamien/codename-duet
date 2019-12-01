import React, { useRef } from 'react';
import './ClueRegion.css';


const ClueRegion = ({clue, number, onClickPass, onClickSubmit}) => {
  const clueRef = useRef();
  const numberRef = useRef();

  const handleSubmit = (event) => {
    const [word, number] = [clueRef.current.value, numberRef.current.value];
    onClickSubmit(word, number);
  }

  return (
    <div className="control-area">
            <input placeholder="Type your one-word clue..." ref={clueRef}/>
            <input placeholder="# of words" ref={numberRef}/>
            <button type="submit" onClick={handleSubmit}>Submit!</button>
            <button type="submit" onClick={onClickPass}>Pass</button>
    </div>
  );
}

export default ClueRegion;
