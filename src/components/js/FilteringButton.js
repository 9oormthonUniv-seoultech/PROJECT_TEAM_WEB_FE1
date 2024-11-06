import React from 'react';
import '../css/FilteringButton.css';

function FilteringButton({ text, onClick, marginTop, marginRight, position, zIndex, isSelected }) {
  const buttonStyle = {
    marginTop: marginTop,
    marginRight: marginRight,
    position: position,
    zIndex: zIndex,
    flexShrink: "0", 
  };

  return (
    <button
      onClick={onClick}
      style={buttonStyle}
      className={`filtering-button ${isSelected ? 'selected' : ''}`}
    >
      {text}
    </button>
  );
}

export default FilteringButton;
