import React from 'react';
import '../css/Button.css'; // 기본 스타일

function Button({ 
  text, 
  onClick, 
  backgroundColor, 
  borderBottom,  // 아래쪽 테두리 설정을 위한 prop 추가
  borderRadius, 
  width, 
  height, 
  fontSize, 
  color, 
  boxShadow, 
  marginTop, 
  marginLeft,
  marginRight, 
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
    borderRadius: borderRadius,
    width: width,
    height: height,
    fontSize: fontSize,
    color: color,
    boxShadow: boxShadow,
    marginTop: marginTop,
    marginLeft: marginLeft,
    marginRight: marginRight,
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
    borderBottom: borderBottom,  // 아래쪽 테두리만 적용
  };

  const iconStyle = {
    marginLeft: iconPosition === 'right' ? (iconMargin || '8px') : '0', // 아이콘이 텍스트 오른쪽에 있을 때 간격
    marginRight: iconPosition === 'left' ? (iconMargin || '8px') : '0', // 아이콘이 텍스트 왼쪽에 있을 때 간격
  };

  return (
    <button onClick={onClick} style={buttonStyle} className="custom-button">
      {iconPosition === 'left' && icon && <img src={icon} alt="icon" style={iconStyle} />} {/* 아이콘이 왼쪽에 있을 때 */}
      {text}
      {iconPosition === 'right' && icon && <img src={icon} alt="icon" style={iconStyle} />} {/* 아이콘이 오른쪽에 있을 때 */}
    </button>
  );
}

export default Button;
