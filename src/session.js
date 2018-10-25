import React from 'react';

const Session = ({id, text}) => {
  return (
    <div>
      <div id={id}>{text}</div>
    </div>
  )
}

export default Session
