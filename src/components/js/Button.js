import React from 'react';
import '../css/Button.css'; // 기본 스타일

function Button({ 
  text, 
  onClick, 
  backgroundColor, 
  border,
  borderBottom,
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
  iconPosition = "left"
}) {
  const buttonStyle = {
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
    marginRight,
    padding,
    position,
    bottom,
    left,
    transform,
    zIndex,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: iconPosition === 'top' ? 'column' : 'row', // 'top' 위치일 때 column으로 설정
    borderBottom,
  };

  const iconStyle = {
    marginBottom: iconPosition === 'top' ? (iconMargin || '8px') : '0', // 'top'일 때 아래쪽 간격 설정
    marginLeft: iconPosition === 'right' ? (iconMargin || '8px') : '0',
    marginRight: iconPosition === 'left' ? (iconMargin || '8px') : '0',
  };

  return (
    <button onClick={onClick} style={buttonStyle} className="custom-button">
      {iconPosition === 'top' && icon && <img src={icon} alt="icon" style={iconStyle} />} {/* 아이콘이 위에 있을 때 */}
      {iconPosition === 'left' && icon && <img src={icon} alt="icon" style={iconStyle} />} {/* 아이콘이 왼쪽에 있을 때 */}
      {text}
      {iconPosition === 'right' && icon && <img src={icon} alt="icon" style={iconStyle} />} {/* 아이콘이 오른쪽에 있을 때 */}
    </button>
  );
}

export default Button;
