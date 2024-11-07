import React from 'react';

function Text({
  children,
  fontSize,
  color,
  fontWeight,
  textAlign,
  marginTop,
  marginBottom,
  marginLeft,
  borderRadius,
  backgroundColor,
  padding,
  border, // 테두리 두께와 스타일
  width, // 텍스트 박스 전체 너비
  height, // 텍스트 박스 전체 높이
  position = 'static',
  zIndex = 1,
  top,
  left,
  right,
  bottom,
  icon,
  iconPosition = 'left', // 기본적으로 아이콘이 왼쪽에 오도록 설정
  iconSize = '16px',
  iconMarginRight = '8px',
  iconMarginLeft = '8px'
}) {
  const textStyle = {
    fontSize: fontSize,
    color: color,
    fontWeight: fontWeight,
    textAlign: textAlign,
    marginTop: marginTop,
    marginBottom: marginBottom,
    marginLeft: marginLeft,
    borderRadius: borderRadius,
    backgroundColor: backgroundColor,
    padding: padding,
    border: border, // border 스타일 추가
    width: width, // width 추가
    height: height, // height 추가
    position: position,
    zIndex: zIndex,
    top: top,
    left: left,
    right: right,
    bottom: bottom,
    display: 'flex',
    alignItems: 'center',
  };

  const iconStyle = {
    width: iconSize,
    height: iconSize,
    marginRight: iconPosition === 'left' ? iconMarginRight : 0,
    marginLeft: iconPosition === 'right' ? iconMarginLeft : 0,
  };

  return (
    <div style={textStyle} className="custom-text">
      {icon && iconPosition === 'left' && <img src={icon} alt="icon" style={iconStyle} />}
      {children}
      {icon && iconPosition === 'right' && <img src={icon} alt="icon" style={iconStyle} />}
    </div>
  );
}

export default Text;
