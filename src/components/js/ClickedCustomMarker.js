const ClickedCustomMarker = ({ imageUrl, onClick }) => {
    return (
      <div 
        onClick={onClick} // 클릭 이벤트 추가
        style={{
          position: 'relative',
          width: '79px',
          height: '88px',
          cursor: 'pointer'
        }}>
        {/* SVG 클릭된 마커 */}
        <svg width="79" height="88" viewBox="0 0 79 88" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g filter="url(#filter0_d_1300_4330)">
            <path d="M7 14.2961V54.366C7 57.0201 8.33293 59.4638 10.496 60.75L32.5596 73.904C34.5707 75.1083 37.0144 75.12 39.0372 73.9624L62.0479 60.7266C64.2577 59.4638 65.6374 56.9851 65.6374 54.2958V14.2961C65.6374 10.2622 62.5974 7 58.8558 7H13.7816C10.04 7 7 10.2622 7 14.2961Z" fill="#5453EE"/>
          </g>
        </svg>
  
        {/* 이미지가 들어갈 원형 영역 */}
        <div style={{
          position: 'absolute',
          top: '43%', 
          left: '47%',
          width: '44px',
          height: '44px',
          borderRadius: '50%',
          overflow: 'hidden',
          transform: 'translate(-50%, -50%)', 
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
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
  
  export default ClickedCustomMarker;
  