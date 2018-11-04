import React from 'react';

const BreakButtons = ({id, text, breakTime, disableIncDec}) => {

  const handleClick = (event) => {
    disableIncDec(id, breakTime)
  }

  if(id === 'break-increment') {

  }

  return (
    <div id={id} onClick={handleClick}>
      <button id={id}>{text}</button>
    </div>
  )
}

export default BreakButtons
