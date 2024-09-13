import React from 'react';
import '../css/Button.css'; // 기본 스타일

function Button({ text, onClick, backgroundColor, borderRadius, width, height, fontSize, color, 
  boxShadow, marginTop, marginLeft, padding }) {
  const buttonStyle = {
    backgroundColor: backgroundColor, 
    borderRadius: borderRadius,     
    width: width,
    height: height,
    fontSize: fontSize,
    color: color,
    boxShadow: boxShadow,
    marginTop: marginTop,
    marginLeft: marginLeft,
    padding: padding // padding을 한 번에 설정
  };

  return (
    <button onClick={onClick} style={buttonStyle} className="custom-button">
      {text}
    </button>
  );
}

export default Button;
