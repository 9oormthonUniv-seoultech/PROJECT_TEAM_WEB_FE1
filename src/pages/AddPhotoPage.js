import React, { useState } from 'react';
import HeaderBar from '../components/js/HeaderBar'; 
import Button from '../components/js/Button';
import circleIcon from '../assets/circle-icon.svg';
import clickedCircleIcon from '../assets/clicked-circle-icon.svg';
import OverlayQrReader from '../components/js/OverlayQrReader';
import LoadingOverlay from '../components/js/LoadingOverlay'; // 로딩 오버레이 컴포넌트 가져오기

function AddPhotoPage() {
  const [showQrOverlay, setShowQrOverlay] = useState(false); // QR 오버레이 표시 상태 관리
  const [selectedOption, setSelectedOption] = useState('');
  const [loading, setLoading] = useState(false); // 로딩 상태 관리
  const [loadingId, setLoadingId] = useState(''); // 로딩 아이디 상태 관리

  const handleNextClick = () => {
    if (selectedOption === 'qr') {
      setShowQrOverlay(true);
    } else if (selectedOption === 'album') {
      setLoadingId('download'); // 'download' ID로 로딩 설정
      setLoading(true); // 로딩 화면 표시
      // 앨범 로직 추가
      setTimeout(() => {
        setLoading(false); // 로딩 화면 숨김
        alert('앨범 불러오기 완료'); // 예제 로직, 실제로는 다른 처리 로직
      }, 3000); // 3초 후 로딩 숨김
    }
  };

  const handleQrClick = () => {
    setSelectedOption('qr');
  };

  const handleAlbumClick = () => {
    setSelectedOption('album');
  };

  const closeOverlay = () => {
    setShowQrOverlay(false);
  };

  const handleConfirm = () => {
    setShowQrOverlay(false);
    setLoadingId('upload'); // 'upload' ID로 로딩 설정
    setLoading(true); // 로딩 화면 표시
    // 여기에 원하는 로직 추가 가능
    setTimeout(() => {
      setLoading(false); // 로딩 화면 숨김
    }, 3000); // 3초 후 로딩 숨김
  };

  return (
    <div style={{
      width: '100%', 
      height: '100%', 
      position: 'relative',
    }}>
      <HeaderBar title="사진 등록" showBackButton={false} showCloseButton={true} />

      <div 
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
          top: '203px'
        }}
      >
        <Button 
            text="QR 인식" 
            onClick={handleQrClick}
            borderRadius= "8px"
            width="267px"
            height="90px"
            backgroundColor={selectedOption === 'qr' ? "#E1E0FF" : "transparent"}
            color={selectedOption === 'qr' ? "#5453EE" : "#C7C9CE"} // 선택된 옵션에 따라 색상 변경
            fontSize="16px"
            position="relative"
            icon= {selectedOption === 'qr' ? clickedCircleIcon : circleIcon}
            iconMargin="12px" 
            boxShadow="none"
            border= {selectedOption === 'qr' ? "1px solid #5453EE"  : "1px solid #C7C9CE"}
          />

          <Button 
            text="내 사진첩 불러오기" 
            onClick={handleAlbumClick}
            borderRadius= "8px"
            width="267px"
            height="90px"
            backgroundColor={selectedOption === 'album' ? "#E1E0FF" : "transparent"}
            color={selectedOption === 'album' ? "#5453EE" : "#C7C9CE"} // 선택된 옵션에 따라 색상 변경
            fontSize="16px"
            position="relative"
            icon= {selectedOption === 'album' ? clickedCircleIcon : circleIcon}
            iconMargin="12px" 
            boxShadow="none"
            border={selectedOption === 'album' ? "1px solid #5453EE"  : "1px solid #C7C9CE"}
            marginTop="22px"
          />

          <Button 
            text="다음"
            onClick={handleNextClick} // '다음' 버튼 클릭 시 처리
            backgroundColor="#5453EE"
            borderRadius="8px"
            width="267px"
            height="50px"
            color="#FFFFFF"
            fontSize="22px"
            fontWeight = "500"
            marginTop="126px"

          />
      </div>

      {showQrOverlay && <OverlayQrReader onClose={closeOverlay} onConfirm={handleConfirm} />} {/* QR 오버레이 표시 */}
      {loading && <LoadingOverlay id={loadingId} />} {/* 로딩 오버레이에 id를 전달 */}
    </div>
  );
}

export default AddPhotoPage;
