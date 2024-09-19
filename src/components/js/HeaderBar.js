import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/HeaderBar.css'; // CSS 파일을 따로 만들어서 스타일을 정의
import { ReactComponent as BackIcon } from '../../assets/back-icon.svg'; // 뒤로가기 아이콘 import
import { ReactComponent as CloseIcon } from '../../assets/x-icon.svg'; // 닫기 아이콘 import


const HeaderBar = ({ title, showBackButton, showCloseButton }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // 이전 페이지로 이동
  };

  const handleClose = () => {
    navigate('/Home'); // 홈 페이지로 이동 (혹은 원하는 페이지로 이동)
  };

  return (
    <div className="header-bar">
      {showBackButton && (
        <button className="back-button" onClick={handleBack}>
           <BackIcon className="icon" />
        </button>
      )}
      <h1 className="title">{title}</h1>
      {showCloseButton && (
        <button className="close-button" onClick={handleClose}>
          <CloseIcon className="icon" />
        </button>
      )}
    </div>
  );
};

export default HeaderBar;
