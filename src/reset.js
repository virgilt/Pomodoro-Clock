import React from 'react';

const Reset = ({id, text, resetClock, enableSBButtons}) => {

  const handleClick = () => {
    resetClock();
    enableSBButtons();
  }

  return (
    <div id={id} onClick={handleClick}>
      <button id={id}>{text}</button>
    </div>
  )
}

export default Reset
