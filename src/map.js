import React from 'react';

const tile_info = (index) => {
  return {
    value: index,
    type: 'neutral'
  }
}

function Tile({value}){
  return (
    <div className={`tile ${value}`}>
    </div>
  );
}

function Map({my_locations}){
  return (
    <div className="map-container">
      <div className="map">
        {my_locations.map( (v, idx) => Tile({value: my_locations[idx]}))}
      </div>
    </div>
  );
}


export default Map;
