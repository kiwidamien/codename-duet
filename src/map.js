import React from 'react';
import './map.css';

const tile_info = (index) => {
  return {
    value: index,
    type: 'neutral'
  }
}

function Tile({value}){
  return (
    <div className={`map-cell map-${value}`}>
    </div>
  );
}

function Map({my_locations}){
  return (
    <div className="map-area">
      <div className="map-board">
        {my_locations.map( (v, idx) => Tile({value: my_locations[idx]}))}
      </div>
    </div>
  );
}


export default Map;
