// HeaderBar.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/HeaderBar.css';
import { ReactComponent as BackIcon } from '../../assets/back-icon.svg';
import { ReactComponent as CloseIcon } from '../../assets/x-icon.svg';

const HeaderBar = ({ title, subtitle, showBackButton, showCloseButton, backgroundColor, buttonColor, titleColor }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1, { state: { selectedButton: 'photobooth' } }); // '포토부스별' 선택 상태 전달
  };

  const handleClose = () => {
    navigate('/Home');
  };

  return (
    <div 
      className="header-bar" 
      style={{ backgroundColor: backgroundColor || '#ffffff' }}
    >
      {showBackButton && (
        <button 
          className="back-button" 
          onClick={handleBack} 
          style={{ color: buttonColor || '#171D24' }}
        >
           <BackIcon className="icon" />
        </button>
      )}
      <div className="title-container" style={{ textAlign: 'center' }}>
        <h1 className="title" style={{ color: titleColor || '#171D24' }}>
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
          style={{ color: buttonColor || '#171D24' }}
        >
          <CloseIcon className="icon" />
        </button>
      )}
    </div>
  );
};

export default HeaderBar;
