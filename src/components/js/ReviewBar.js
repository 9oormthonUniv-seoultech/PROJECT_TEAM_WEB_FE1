// ReviewBar.js
import React from 'react';

const ReviewBar = ({ icon, label, count, percentage }) => {
  return (
    <div style={{ width: '358px', height: '42px', backgroundColor: '#C7C9CE', borderRadius: '8px', display: 'flex', alignItems: 'center', position: 'relative', marginBottom : '8px'}}>
      {/* 바 */}
      <div 
        style={{
          position: 'absolute',
          top: '0',
          left: '0',
          height: '100%',
          width: `${percentage}%`,
          backgroundColor: '#5453EE',
          borderRadius: '8px',
        }}
      />
      
      {/* 아이콘 */}
      {icon && (
        <img 
          src={icon} 
          alt={`${label} 아이콘`} 
          style={{ width: '24px', height: '24px', marginLeft: '13px', zIndex: 2 }} 
        />
      )}
      
      {/* 라벨 */}
      <span style={{ flex: 1, color: '#ffffff', zIndex: 2, fontSize: '16px',marginLeft: '13px', fontWeight: '600' }}>
        {label}
      </span>

      {/* 리뷰 수 */}
      <span style={{ color: '#ffffff', zIndex: 2, fontSize: '14px', fontWeight: '600', marginRight : '15px' }}>
        {count}
      </span>
    </div>
  );
};

export default ReviewBar;
