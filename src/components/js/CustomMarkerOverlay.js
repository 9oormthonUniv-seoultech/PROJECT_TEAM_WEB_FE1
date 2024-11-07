import React from 'react';

const CustomMarkerOverlay = ({ imageUrl, boothId, boothLat, boothLng, isClicked, onClick }) => {
  return (
    <div
      onClick={() => onClick(boothId)} // boothId 전달
      style={{
        position: 'relative',
        width: isClicked ? '59px' : '52px',
        height: isClicked ? '68px' : '60px',
        cursor: 'pointer',
      }}
    >
      {isClicked ? (
        <svg width="59" height="68" viewBox="0 0 59 68" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 7.29606V47.366C0 50.0201 1.33293 52.4638 3.49603 53.75L25.5596 66.904C27.5707 68.1083 30.0144 68.12 32.0372 66.9624L55.0479 53.7266C57.2577 52.4638 58.6374 49.9851 58.6374 47.2958V7.29606C58.6374 3.26218 55.5974 0 51.8558 0H6.7816C3.04003 0 0 3.26218 0 7.29606Z" fill="#5453EE"/>
        </svg>
      ) : (
        <svg width="43" height="49" viewBox="0 0 52 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 6.45488V41.905C0 44.2531 1.18205 46.4151 3.1003 47.553L22.6664 59.1904C24.4498 60.2558 26.6169 60.2662 28.4108 59.2421L48.8168 47.5323C50.7765 46.4151 52 44.2221 52 41.8429V6.45488C52 2.88608 49.3041 0 45.986 0H6.01396C2.69591 0 0 2.88608 0 6.45488Z" fill="#2A303A"/>
        </svg>
      )}

      <div 
        style={{
          position: 'absolute',
          top: isClicked ? '45%' : '37%',
          left: isClicked ? '52%' : '43%',
          width: isClicked ? '44px' : '32.35px',
          height: isClicked ? '44px' : '32.35px',
          borderRadius: '50%',
          overflow: 'hidden',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'white',
        }}
      >
        <img 
          src={imageUrl} 
          alt="marker" 
          style={{ 
            width: '100%', 
            height: '100%',
            objectFit: 'cover',
            transition: 'width 0.2s, height 0.2s',
          }} 
        />
      </div>
    </div>
  );
};

export default CustomMarkerOverlay;
