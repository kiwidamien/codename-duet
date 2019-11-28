import React, { useState } from 'react';
import './card.css'

function CardLayout({card_objects}){
  return (
    <div className='card-area'>
      <div className='card-board'>
        {card_objects.map( (card_object) => Card(card_object) )}
      </div>
    </div>
  );
}

function Card({word, status, onClick}){
  return (
    <div className={`card card-${status}`}>
      <div className='card-word'>{word}</div>
    </div>
  );
}

export {CardLayout, Card};
