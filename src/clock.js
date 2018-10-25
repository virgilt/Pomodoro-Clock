import React from 'react';

const Clock = ({id, time, createClock}) => {
  return (
    <div>
      <div id={id}>{createClock(time)}</div>
    </div>
  )
}

export default Clock
