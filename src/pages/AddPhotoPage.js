import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 추가
import HeaderBar from '../components/js/HeaderBar'; 
import Button from '../components/js/Button';
import Text from '../components/js/Text' ;
import InputValue from '../components/js/InputValue' ;
import circleIcon from '../assets/circle-icon.svg';
import clickedCircleIcon from '../assets/clicked-circle-icon.svg';
import OverlayQrReader from '../components/js/OverlayQrReader';
import LoadingOverlay from '../components/js/LoadingOverlay';
import SearchBar from '../components/js/SearchBar';
import searchIcon from '../assets/search-icon.svg'; 

function AddPhotoPage() {
  const navigate = useNavigate(); // navigate hook 사용
  const [showQrOverlay, setShowQrOverlay] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingId, setLoadingId] = useState('');
  const [isPostLoading, setIsPostLoading] = useState(false);
  const [isConfirmationPage, setIsConfirmationPage] = useState(false); // 사진 확인 페이지 상태 추가

  const handleNextClick = () => {
    if (selectedOption === 'qr') {
      setShowQrOverlay(true);
    } else if (selectedOption === 'album') {
      setLoadingId('download');
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setIsPostLoading(true);
      }, 3000);
    }
  };

  const handleSearch = () => {
    console.log('앨범 페이지에서 검색!');
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
    setLoadingId('upload');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsPostLoading(true);
    }, 5000);
  };

  const handleSaveClick = () => {
    setIsConfirmationPage(true); // 저장하기 버튼 클릭 시 사진 확인 페이지로 전환
  };

  const handleConfirmClick = () => {
    navigate('/NotePhoto'); // '/photo-record' 경로로 이동
  };

  return (
    <div style={{
      width: '100%', 
      height: '100%', 
      position: 'relative',
    }}>
      {!isPostLoading ? (
        <>
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
              color={selectedOption === 'qr' ? "#5453EE" : "#C7C9CE"}
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
              color={selectedOption === 'album' ? "#5453EE" : "#C7C9CE"}
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
              onClick={handleNextClick}
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
        </>
      ) : (
        !isConfirmationPage ? (
          <>
            <HeaderBar title="사진 설명" showBackButton={true} showCloseButton={false} />
            <div 
              style={{
                display: 'flex',
                flexDirection: 'column',
                marginLeft : '16px',
                position: 'relative',
                top: '203px'
              }}
            >
              <div style={{ marginBottom: '52.93px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', Top : '196px'}}>
                  <Text 
                    fontSize="18px" 
                    color="#171D24"
                    fontWeight="600" 
                  >
                    언제 사진을 찍으셨나요?
                  </Text>

                  <Text 
                    fontSize="12px" 
                    color="#FFFFFF"
                    fontWeight="600" 
                    backgroundColor = "#A1A6B5"
                    borderRadius = "24px"
                    padding = "6px 10px"
                  >
                    필수
                  </Text>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' , marginTop : '16px'}}>
                  <InputValue
                    type="text"
                    width="96px"
                    placeholder="0000"
                    placeholderColor="#C7C9CE"
                  />
                  <Text>년</Text>
                  <InputValue
                    type="text"
                    width="70.93px"
                    placeholder="00"
                    placeholderColor="#C7C9CE"
                  />
                  <Text>월</Text>
                  <InputValue
                    type="text"
                    width="70.93px"
                    placeholder="00"
                    placeholderColor="#C7C9CE"
                  />
                  <Text>일</Text>
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom : '12px'}}>
                  <Text 
                    fontSize="18px" 
                    color="#171D24"
                    fontWeight="600" 
                  >
                    사용하신 부스의 위치는 어딘가요?
                  </Text>

                  <Text 
                    fontSize="12px" 
                    color="#FFFFFF"
                    fontWeight="600" 
                    backgroundColor = "#A1A6B5"
                    borderRadius = "24px"
                    padding = "6px 10px"
                  >
                    필수
                  </Text>
                </div>
                <SearchBar 
                  placeholder="구, 역, 건물명 등으로 검색해주세요" 
                  icon={searchIcon} 
                  onSearch={handleSearch} 
                  width="348px"
                  height="42px"
                  fontSize="16px"
                  fontWeight="400"
                  backgroundColor="#E9EAEE"
                />
              </div>
              
              <Button 
                text="저장하기"
                backgroundColor="#5453EE"
                borderRadius="8px"
                width="267px"
                height="50px"
                color="#FFFFFF"
                fontSize="22px"
                fontWeight="500"
                marginTop="20px"
                onClick={handleSaveClick} // 저장하기 버튼 클릭 시 사진 확인 페이지로 전환
              />
            </div>
          </>
        ) : (
          <>
            <HeaderBar title="사진 확인" showBackButton={true} showCloseButton={false}  backgroundColor = "#2A303A" buttonColor= "#FFFFFF" titleColor= "#FFFFFF"/>
            <div 
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor : '#2A303A',
                height : '715px'
              }}
            >
              {/* 예시 이미지. 실제 이미지 경로를 설정하세요. */}
              <img 
                src="https://blog.kakaocdn.net/dn/bAcXqJ/btsIrIVNTWX/x5YOnykYEfOEGbyEcedQCk/img.jpg" // 이미지 경로 변경
                alt="사진 확인"
                style={{
                  maxWidth : '327px',
                  maxHeight : '497px',
                  marginTop : '45px',
                  objectFit: 'cover',
                  marginBottom: '39px'
                }}
              />
              <Button 
                text="확인"
                backgroundColor="#5453EE"
                borderRadius="8px"
                width="280px"
                height="62px"
                color="#FFFFFF"
                fontSize="22px"
                fontWeight="500"
                onClick={handleConfirmClick} // 확인 버튼 클릭 시 동작
              />
            </div>
          </>
        )
      )}

      {showQrOverlay && <OverlayQrReader onClose={closeOverlay} onConfirm={handleConfirm} />}
      {loading && <LoadingOverlay id={loadingId} />}
    </div>
  );
}

export default AddPhotoPage;
