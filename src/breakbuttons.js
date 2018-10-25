import React from 'react';

const BreakButtons = ({id, text}) => {

  const handleClick = (event) => {
    let button = document.getElementById(id)
  }

  return (
    <div onClick={handleClick}>
      <button id={id}>{text}</button>
    </div>
  )
}

export default BreakButtons
