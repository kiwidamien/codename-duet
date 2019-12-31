import React, { useRef } from 'react';
import './ClueRegion.css';


const ClueRegion = ({clue, number, onClickPass, onClickSubmit, canPass, canClue}) => {
  const clueRef = useRef();
  const numberRef = useRef();

  const handleSubmit = (event) => {
    const [word, number] = [clueRef.current.value, numberRef.current.value];
    onClickSubmit(word, number);
  }

  let elem;
  if (canPass){
    elem = (
      <button type="submit" className='submit-button' onClick={onClickPass}>Pass</button>
    );
  }
  if (canClue){
    elem = (
      <>
      <div>
        <input placeholder="Type your one-word clue..." ref={clueRef}/> for
        <select className='select-css' ref={numberRef}>
          {Array(9).fill(0).map( (v, idx) => <option value={idx+1} key={`option_${idx+1}`}>{idx + 1}</option>)}
          <option value={10} key="option_10">Unlimited</option>
        </select> words
      </div>
      <button type="submit" className='submit-button' onClick={handleSubmit}>Submit!</button>
      </>
    );
  }
  return (
    <div className="control-area">
       {elem}
    </div>
  );
}

export default ClueRegion;
