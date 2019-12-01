import React from 'react';
import './map.css';


function Tile({value, index}){
  return (
    <div className={`map-cell map-${value}`} key={index}>
    </div>
  );
}

function Map({my_locations}){
  return (
    <div className="map-area">
      <div className="map-board">
        {my_locations.map( (v, idx) => Tile({value: my_locations[idx], index: idx}))}
      </div>
    </div>
  );
}


export default Map;
