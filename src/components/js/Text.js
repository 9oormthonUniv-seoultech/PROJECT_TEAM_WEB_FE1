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
  position = 'static', // 기본값 설정
  zIndex = 1, // 기본 zIndex 설정
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
    position: position, // position 속성 추가
    zIndex: zIndex, // zIndex 속성 추가
    top: top, // 추가: 필요 시 top 속성
    left: left, // 추가: 필요 시 left 속성
    right: right, // 추가: 필요 시 right 속성
    bottom: bottom, // 추가: 필요 시 bottom 속성
    display: 'flex', // 아이콘과 텍스트를 가로로 정렬
    alignItems: 'center', // 아이콘과 텍스트를 세로로 정렬
  };

  const iconStyle = {
    width: iconSize,
    height: iconSize,
    marginRight: iconMarginRight, // 아이콘과 텍스트 사이 간격
  };

  return (
    <div style={textStyle} className="custom-text">
      {icon && <img src={icon} alt="icon" style={iconStyle} />}
      {children}
    </div>
  );
}

export default Text;
