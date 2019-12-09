import React from 'react';
import FlashMessage from 'react-flash-message';
import './AlertDiv.css';

const AlertDiv = ({message, duration_millis}) => {
  return (
    <div className='error_div' duration={duration_millis}>
    {message}
    </div>
    );
}

export default AlertDiv;
