import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderBar from '../components/js/HeaderBar';
import Text from '../components/js/Text';
import CircleIcon from '../assets/circle-icon.svg';
import clickedCircleIcon from '../assets/clicked-circle-icon.svg';

const booths = [
  '하루필름', '인생네컷', '셀픽스', '포토시그니처', 
  '포토이즘 컬러드', '포토이즘 박스', '포토그레이', '포토매틱', '비룸'
];

function AlbumBoothSelectionPage() {
  const navigate = useNavigate();
  const [selectedBooths, setSelectedBooths] = useState([]); // 선택된 부스들

  const handleBoothClick = (booth) => {
    setSelectedBooths((prevSelectedBooths) =>
      prevSelectedBooths.includes(booth)
        ? prevSelectedBooths.filter((selected) => selected !== booth) // 선택 해제
        : [...prevSelectedBooths, booth] // 선택
    );
  };

  const handleApplySelection = () => {
    navigate('/Album', { state: { selectedButton: 'photobooth', selectedBooth: selectedBooths[0] || '포토부스' } });
  };

  const handleBack = () => {
    navigate('/Album', { state: { selectedButton: 'photobooth' } });
  };

  const containerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '26px 12px',
    padding: '20px',
    marginTop: '58px',
  };

  const boothBoxStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  return (
    <div className="app-container">
      <HeaderBar 
        title="필터"  
        showBackButton={true} 
        showCloseButton={false} 
        backgroundColor="#FFFFFF" 
        buttonColor="#171D24" 
        titleColor="#171D24"
        onBack={handleBack} // 뒤로가기 버튼에 handleBack 전달
      />
      <div style={containerStyle}>
        {booths.map((booth, index) => (
          <div 
            style={boothBoxStyle} 
            key={index}
            onClick={() => handleBoothClick(booth)}
          >
            <Text 
              fontSize="16px" 
              color={selectedBooths.includes(booth) ? '#5453EE' : '#C7C9CE'}
              fontWeight="600" 
              backgroundColor="#FFFFFF"
              borderRadius="8px"
              width="156px"
              height="38px"
              border= {selectedBooths.includes(booth) ? "1px solid #5453EE" : "1px solid #C7C9CE"}
              icon={selectedBooths.includes(booth) ? clickedCircleIcon : CircleIcon}
              iconSize="22px"
              padding="0 0 0 12px"
            >
              {booth}
            </Text>
          </div>
        ))}
      </div>

      {selectedBooths.length > 0 && (
        <button
          onClick={handleApplySelection}
          style={{
            position: 'relative',
            left: '50%',
            width : '280px',
            height : '62px',
            transform: 'translateX(-50%)',
            backgroundColor: '#5453EE',
            color: '#FFFFFF',
            fontSize : '22px',
            borderRadius: '8px',
            border : 'none',
            marginTop : '78px'
          }}
        >
          적용하기
        </button>
      )}
    </div>
  );
}

export default AlbumBoothSelectionPage;
