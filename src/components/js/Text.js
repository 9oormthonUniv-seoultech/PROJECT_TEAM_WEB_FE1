import React from 'react';

function Text({ children, fontSize, color, fontWeight, textAlign, marginTop }) {
  const textStyle = {
    fontSize: fontSize, // 폰트 크기
    color: color, // 텍스트 색상
    fontWeight: fontWeight, // 폰트 굵기
    textAlign: textAlign, // 텍스트 정렬
    marginTop: marginTop, // 상단 마진
  };

  return (
    <p style={textStyle} className="custom-text">
      {children}
    </p>
  );
}

export default Text;
