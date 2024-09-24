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
  padding,
  placeholderPosition = 'center' // placeholderPosition prop 추가, 기본값은 'center'
}) => {
  // placeholder 위치를 설정하는 동적 스타일
  const getPlaceholderStyle = () => {
    if (placeholderPosition === 'top-left') {
      return {
        textAlign: 'left',
        paddingTop: '16px', // 위쪽 여백 추가
        paddingLeft: '16px', // 왼쪽 여백 추가
      };
    }
    return {
      textAlign: textAlign || 'center',
      padding: padding,
    };
  };

  const inputStyle = {
    width: width,
    height: height || '35.05px',
    fontSize: fontSize || '16px',
    color: color || '#C7C9CE',
    backgroundColor: backgroundColor || '#E9EAEE',
    borderRadius: borderRadius || '6.68px',
    marginTop: marginTop || '0',
    marginLeft: marginLeft,
    border: border || 'none',
    outline: 'none',
    boxSizing: 'border-box',
    ...getPlaceholderStyle() // placeholder 스타일 병합
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
