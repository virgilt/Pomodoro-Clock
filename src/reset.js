import React from 'react';

const Reset = ({id, text, resetClock}) => {

  const handleClick = () => {
    resetClock();
  }

  return (
    <div onClick={handleClick}>
      <button id={id}>{text}</button>
    </div>
  )
}

export default Reset
