import React from 'react';
import '../css/Button.css'; // 기본 스타일

function Button({ 
  text, 
  onClick, 
  backgroundColor, 
  border, 
  borderRadius, 
  width, 
  height, 
  fontSize, 
  color, 
  boxShadow, 
  marginTop, 
  marginLeft, 
  padding, 
  position, 
  bottom, 
  left, 
  transform, 
  zIndex, 
  icon, 
  iconMargin, 
  iconPosition // 아이콘 위치를 지정하는 새로운 prop
}) {
  const buttonStyle = {
    backgroundColor: backgroundColor,
    border: border,
    borderRadius: borderRadius,
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
    zIndex: zIndex,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: iconPosition === 'top' ? 'column' : 'row', // 아이콘 위치에 따라 flex-direction 조정
  };

  const iconStyle = {
    marginRight: iconPosition === 'left' ? (iconMargin || '8px') : '0', // 아이콘이 텍스트 왼쪽에 있을 때 간격
    marginBottom: iconPosition === 'top' ? (iconMargin || '8px') : '0', // 아이콘이 텍스트 위에 있을 때 간격
  };

  return (
    <button onClick={onClick} style={buttonStyle} className="custom-button">
      {icon && <img src={icon} alt="icon" style={iconStyle} />} {/* 아이콘이 존재하면 표시 */}
      {text}
    </button>
  );
}

export default Button;
