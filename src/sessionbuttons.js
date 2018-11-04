import React from 'react';

const SessionButtons = ({id, text, sessionTime, disableIncDec}) => {

  const handleClick = (event) => {
    disableIncDec(id, sessionTime)
  }

  return (
    <div id={id} onClick={handleClick}>
      <button id={id}>{text}</button>
    </div>
  )
}

export default SessionButtons
