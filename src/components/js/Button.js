import React from 'react';
import '../css/Button.css'; // 기본 스타일

function Button({ text, onClick, backgroundColor, border, borderRadius, width, height, fontSize, color, 
  boxShadow, marginTop, marginLeft, padding , position, bottom, left, transform , zIndex, icon, iconMargin }) {
  const buttonStyle = {
    backgroundColor: backgroundColor, 
    border : border,
    borderRadius :  borderRadius,
    width: width,
    height: height,
    fontSize: fontSize,
    color: color,
    boxShadow: boxShadow,
    marginTop: marginTop,
    marginLeft: marginLeft,
    padding: padding,
    position: position,
    bottom: bottom,
    left: left,
    transform: transform,
    zIndex : zIndex,
    cursor : 'pointer',
    display: 'flex', // 아이콘과 텍스트를 가로로 정렬
    alignItems: 'center', // 아이콘과 텍스트를 세로로 정렬
    justifyContent: 'center', // 아이콘과 텍스트를 중앙 정렬
  };

  const iconStyle = {
    marginRight: iconMargin || '8px', // 아이콘과 텍스트 사이 간격
  };

  return (
    <button onClick={onClick} style={buttonStyle} className="custom-button">
      {icon && <img src={icon} alt="icon" style={iconStyle} />} {/* 아이콘이 존재하면 표시 */}
      {text}
    </button>
  );
}

export default Button;
