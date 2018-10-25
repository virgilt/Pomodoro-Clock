import React from 'react';

const SessionButtons = ({id, text}) => {
  return (
    <div>
      <button id={id}>{text}</button>
    </div>
  )
}

export default SessionButtons
