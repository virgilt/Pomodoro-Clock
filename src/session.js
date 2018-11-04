import React from 'react';

const Session = ({id, text}) => {
  return (
    <div id={id}>
      <div id={id}>{text}</div>
    </div>
  )
}

export default Session
