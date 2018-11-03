import React from 'react';

const Start_stop = ({id, text, startStopState, startStop}) => {

  const handleClick = () => {
    startStop(startStopState);
  }

  return (
    <div onClick={handleClick}>
      <button id={id}>{text}</button>
    </div>
  )
}

export default Start_stop
