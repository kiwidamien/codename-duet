import React from 'react';
import './info.css';


function Message({message}){
  return (
  <div className="info-area">
        {message}
  </div>
  );
}

export default Message;
