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
  iconSize = '16px',
  iconMarginRight = '8px'
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
    marginRight: iconMarginRight,
  };

  return (
    <div style={textStyle} className="custom-text">
      {icon && <img src={icon} alt="icon" style={iconStyle} />}
      {children}
    </div>
  );
}

export default Text;
