// CustomOverlay.js
import React from 'react';

const CustomMarkerOverlay = ({ imageUrl, text }) => {
  return (
    <div style={{
      backgroundColor: '#2A303A',
      borderRadius: '8px',
      padding: '5px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '60px',
      textAlign: 'center',
      color: '#fff',
    }}>
      <div style={{
        width: '32.35px',
        height: '32.35px',
        borderRadius: '50%',
        overflow: 'hidden',
        marginBottom: '5px',
      }}>
        <img 
          src={imageUrl} 
          alt="marker" 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>
      <div style={{ fontSize: '12px' }}>{text}</div>
    </div>
  );
};

export default CustomMarkerOverlay;
