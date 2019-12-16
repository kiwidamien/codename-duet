import React from 'react';
import './AlertDiv.css';

const AlertDiv = ({message, duration_millis}) => {
  return (
    <div className='error_div' duration={duration_millis}>
    {message}
    </div>
    );
}

export default AlertDiv;
