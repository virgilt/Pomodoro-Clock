import React from 'react';

const BreakButtons = ({id, text, breakTime, disableIncDec}) => {

  const handleClick = (event) => {
    disableIncDec(id, breakTime)
  }

  return (
    <div onClick={handleClick}>
      <button id={id}>{text}</button>
    </div>
  )
}

export default BreakButtons
