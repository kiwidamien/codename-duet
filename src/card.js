import React from 'react';
import './card.css'

function CardLayout({card_objects, handleClickOnCard, canClick, mapLocations, showMapState}){
  if (!canClick){
    handleClickOnCard = ()=>{};
  }

  const my_card_objects = card_objects.map( (object, index) => {
    return {
      ...object,
      onClick: () => {handleClickOnCard(index);},
      canClick
    }
  });

  return (
    <div className='card-area'>
      <div className='card-board'>
        {my_card_objects.map( (card_object) => Card(card_object) )}
      </div>
    </div>
  );
}

function Card({word, status, onClick, canClick}){
  return (
    <div className={`card card-${status} ${canClick ? '' : 'disabled'}`} onClick={onClick} key={word}>
      <div className='card-word'>{word}</div>
    </div>
  );
}

export {CardLayout, Card};
