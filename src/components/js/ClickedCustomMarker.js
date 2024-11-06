import React from 'react';

const ClickedCustomMarker = ({ imageUrl, onClick }) => {
  return (
    <div 
      onClick={onClick} // 클릭 이벤트 추가
      style={{
        position: 'relative',
        width: '58px',
        height: '67px',
        cursor: 'pointer',
        transform: 'scale(1.1)' // 클릭된 상태를 강조하기 위한 크기 조정
      }}>
      <svg width="58" height="67" viewBox="0 0 60 68" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 6.45488V53.905C0 56.2531 1.18205 58.4151 3.1003 59.553L28.6664 67.1904C30.4499 68.2558 32.6169 68.2662 34.4108 67.2421L58.8168 59.5323C60.7765 58.4151 62 56.2221 62 53.8429V6.45488C62 2.88608 59.3041 0 55.986 0H6.01396C2.69591 0 0 2.88608 0 6.45488Z" fill="#5453EE"/>
      </svg>
      
      <div style={{
        position: 'absolute',
        top: '45%',
        left: '50%',
        width: '44px',
        height: '44px',
        borderRadius: '50%',
        overflow: 'hidden',
        transform: 'translate(-50%, -50%)', 
      }}>
        <img 
          src={imageUrl} 
          alt="clicked marker" 
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover', 
            objectPosition: 'center', 
          }} 
        />
      </div>
    </div>
  );
};

export default ClickedCustomMarker;
