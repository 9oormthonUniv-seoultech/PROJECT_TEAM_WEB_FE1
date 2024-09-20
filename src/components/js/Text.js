import React from 'react';

function Text({ children, fontSize, color, fontWeight, textAlign, marginTop, borderRadius, backgroundColor, padding, icon, iconSize = '16px', iconMarginRight = '8px' }) {
  const textStyle = {
    fontSize: fontSize, // 폰트 크기
    color: color, // 텍스트 색상
    fontWeight: fontWeight, // 폰트 굵기
    textAlign: textAlign, // 텍스트 정렬
    marginTop: marginTop, // 상단 마진
    borderRadius : borderRadius,
    backgroundColor : backgroundColor,
    padding : padding,
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
