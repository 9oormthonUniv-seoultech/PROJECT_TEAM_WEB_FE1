const CustomMarkerOverlay = ({ imageUrl, onClick }) => {
  return (
    <div 
      onClick={onClick} // 클릭 이벤트 추가
      style={{
        position: 'relative',
        width: '52px',
        height: '60px',
        cursor: 'pointer'
      }}>
      {/* SVG 마커 */}
      <svg width="52" height="60" viewBox="0 0 52 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 6.45488V41.905C0 44.2531 1.18205 46.4151 3.1003 47.553L22.6664 59.1904C24.4499 60.2558 26.6169 60.2662 28.4108 59.2421L48.8168 47.5323C50.7765 46.4151 52 44.2221 52 41.8429V6.45488C52 2.88608 49.3041 0 45.986 0H6.01396C2.69591 0 0 2.88608 0 6.45488Z" fill="#2A303A"/>
      </svg>
      
      {/* 이미지가 들어갈 원형 영역 */}
      <div style={{
        position: 'absolute',
        top: '45%',
        left: '50%',
        width: '32.35px',
        height: '32.35px',
        borderRadius: '50%',
        overflow: 'hidden',
        transform: 'translate(-50%, -50%)', 
      }}>
        <img 
          src={imageUrl} 
          alt="marker" 
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

export default CustomMarkerOverlay;
