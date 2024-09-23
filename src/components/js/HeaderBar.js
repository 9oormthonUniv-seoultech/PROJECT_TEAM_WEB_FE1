// HeaderBar.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/HeaderBar.css'; // CSS 파일을 따로 만들어서 스타일을 정의
import { ReactComponent as BackIcon } from '../../assets/back-icon.svg'; // 뒤로가기 아이콘 import
import { ReactComponent as CloseIcon } from '../../assets/x-icon.svg'; // 닫기 아이콘 import
import Text from './Text'; // Text 컴포넌트 import (선택 사항)

const HeaderBar = ({ title, subtitle, showBackButton, showCloseButton, backgroundColor, buttonColor, titleColor }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // 이전 페이지로 이동
  };

  const handleClose = () => {
    navigate('/Home'); // 홈 페이지로 이동 (혹은 원하는 페이지로 이동)
  };

  return (
    <div 
      className="header-bar" 
      style={{ backgroundColor: backgroundColor || '#ffffff' }} // 배경색 prop 추가, 기본값은 흰색
    >
      {showBackButton && (
        <button 
          className="back-button" 
          onClick={handleBack} 
          style={{ color: buttonColor || '#171D24' }} // 버튼 색상 prop 추가, 기본값은 검정색
        >
           <BackIcon className="icon" /> {/* 아이콘 색상도 변경 */}
        </button>
      )}
      <div className="title-container" style={{ textAlign: 'center' }}> {/* 타이틀과 서브타이틀을 담는 컨테이너 */}
        <h1 className="title" style={{ color: titleColor || '#171D24' }} > {/* 타이틀 색상 prop 추가, 기본값은 검정색 */}
          {title}
        </h1>
        {subtitle && (
          <p className="subtitle" style={{ color: titleColor || '#676F7B', fontSize: '12px' }}>
            {subtitle}
          </p>
        )}
      </div>
      {showCloseButton && (
        <button 
          className="close-button" 
          onClick={handleClose} 
          style={{ color: buttonColor || '#171D24' }} // 버튼 색상 prop 추가, 기본값은 검정색
        >
          <CloseIcon className="icon" /> {/* 아이콘 색상도 변경 */}
        </button>
      )}
    </div>
  );
};

export default HeaderBar;
