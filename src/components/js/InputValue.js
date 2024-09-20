import React from 'react';
import '../css/InputValue.css'; // 기본 스타일

const InputValue = ({
  value,
  onChange,
  placeholder,
  placeholderColor,
  width,
  height,
  fontSize,
  color,
  border,
  backgroundColor,
  borderRadius,
  marginTop,
  marginLeft,
  textAlign,
  padding
}) => {
  const inputStyle = {
    width: width,
    height: height || '35.05px',
    fontSize: fontSize || '16px',
    color: color || '#C7C9CE',
    backgroundColor: backgroundColor || '#E9EAEE',
    borderRadius: borderRadius || '6.68px',
    marginTop: marginTop || '0',
    marginLeft : marginLeft,
    border: border || 'none',
    outline: 'none',
    boxSizing: 'border-box',
    textAlign: textAlign || 'center',
    padding: padding,
  };

  return (
    <>
      <style>
        {`
          .input-custom::placeholder {
            color: ${placeholderColor || '#C7C9CE'} !important; /* 동적 placeholder 색상 */
          }
        `}
      </style>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="input-custom" // 기존 "input" -> "input-custom"으로 변경
        style={inputStyle} // 스타일 속성 추가
      />
    </>
  );
};

export default InputValue;