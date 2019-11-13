import React from 'react';

function Tile({value}){
  return (
    <div>
      {value}
    </div>
  );
}

function Map(){
  return (
    <div>
      {Array(25).fill(0).map( (v, idx) => Tile({value: idx}))}
    </div>
  );
}

export default Map;
