import React from 'react';
import '../css/FilteringButton.css'; // 기본 스타일

function FilteringButton({ text, onClick, marginTop, marginRight , position,  zIndex }) {
  const buttonStyle = {
    marginTop: marginTop,
    marginRight: marginRight,
    position: position,
    zIndex : zIndex,
    flexShrink: "0", 
  };

  return (
    <button onClick={onClick} style={buttonStyle} className="filtering-button">
      {text}
    </button>
  );
}

export default FilteringButton;
