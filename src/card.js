import React, { useState } from 'react';
import './card.css'

function CardLayout({words}){
  return (
    <div className='card-board'>
      {words.map( (word) => Card({word}) )}
    </div>
  );
}

function Card({word, onClick}){
  return (
    <div className='card-container assassian-card-container'>
      <div className='card-content'>
      {word}
      </div>
    </div>
  );
}

export {CardLayout, Card};
