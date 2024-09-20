import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderBar from '../components/js/HeaderBar';
import Button from '../components/js/Button';
import Text from '../components/js/Text';
import SpeechBubble from '../components/js/SpeechBubble';
import HashtagModal from '../components/js/HashtagModal';
import RecordModal from '../components/js/RecordModal';
import shareIcon from '../assets/share-icon.svg';

const NotePhotoPage = () => {
  const navigate = useNavigate(); 
  const [showHashtagModal, setShowHashtagModal] = useState(false); // 해시태그 모달 상태
  const [showRecordModal, setShowRecordModal] = useState(false); // Record 모달 상태
  const [showSharingOptions, setShowSharingOptions] = useState(false); // 공유 버튼 상태

  // 해시태그 추가 버튼 클릭 시 해시태그 모달 열기
  const handleAddClick = () => {
    setShowHashtagModal(true);
  };
  
  // 해시태그 모달 닫기
  const handleHashtagModalClose = () => {
    setShowHashtagModal(false);
  };

  // 해시태그 추가 처리
  const handleHashtagAdd = (hashtag) => {
    console.log('해시태그 추가:', hashtag); 
    setShowHashtagModal(false); 
  };

  // 기록 모달 열기
  const handleRecordModalOpen = () => {
    setShowRecordModal(true); // 입력 창에 포커스 시 기록 모달 열기
  };

  // 기록 모달 닫기
  const handleRecordModalClose = () => {
    setShowRecordModal(false); // 기록 모달 닫기
  };

  // 기록 모달 확인 버튼 클릭 시 공유 옵션 표시
  const handleRecordConfirm = () => {
    setShowRecordModal(false); // 기록 모달 닫기
    setShowSharingOptions(true); // 공유 옵션 표시
  };

  // 공유할래요 버튼 클릭 시 공유 성공 페이지로 이동
  const handleShareClick = () => {
    navigate('/ShareSuccess');
  };

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
      <HeaderBar title="사진 기록" showBackButton={true} showCloseButton={false} backgroundColor="#2A303A" buttonColor="#FFFFFF" titleColor="#FFFFFF"/>
      <div 
        style={{
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#2A303A',
          height: '715px'
        }}
      >
        {!showSharingOptions ? (
          <>
            <div style={{ display: 'flex', gap: '8px', marginTop: '16px', marginLeft: '33.5px' }}>
              <Button 
                text="# 추가하기"
                backgroundColor="#5453EE"
                borderRadius="8px"
                width="109px"
                height="35px"
                color="#FFFFFF"
                fontSize="16px"
                fontWeight="600"
                onClick={handleAddClick} 
              />
              <Text fontSize="12px" color="#C7C9CE" marginTop="23px">1/3</Text>
            </div>

            <SpeechBubble text="해시태그를 추가하면 사진을 쉽게 찾을 수 있어요" marginTop="60px" marginLeft="32px"/>

            <img 
              src="https://blog.kakaocdn.net/dn/bAcXqJ/btsIrIVNTWX/x5YOnykYEfOEGbyEcedQCk/img.jpg" // 이미지 경로 변경
              alt="사진 확인"
              style={{
                maxWidth: '252px',
                maxHeight: '380px',
                marginTop: '60px',
                objectFit: 'cover',
                marginLeft: '69px'
              }}
            />
            <Button 
              text="오늘 있었던 일들을 기록해보세요"
              backgroundColor="#FFFFFF"
              borderRadius="8px"
              width="321px"
              height="49px"
              color="#676F7B"
              fontSize="16px"
              fontWeight="400"
              marginTop="24px"
              marginLeft="34px"
              onClick={handleRecordModalOpen} // 버튼 클릭 시 기록 모달 열기
            />
            <Button 
              text="다음"
              backgroundColor="#5453EE"
              borderRadius="8px"
              width="280px"
              height="62px"
              color="#FFFFFF"
              fontSize="22px"
              fontWeight="500"
              marginTop="22px"
              marginLeft="55px"
            />
          </>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '100px' }}>
            <img 
              src={shareIcon} 
              alt="Sharing..." 
              style={{ marginBottom: '20px' }} // 아이콘 크기 및 간격 설정
            />
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '65px' }}>
              <Button 
                backgroundColor="#E9EAEE"
                borderRadius="3px"
                width="24px"
                height="24px"
              />
              <Text fontSize="18px" color="#FFFFFF" fontWeight="500">
                해시태그, 사진 기록까지 공유하기
              </Text>
            </div>
            <Button 
              text="공유할래요"
              backgroundColor="#5453EE"
              borderRadius="8px"
              width="280px"
              height="62px"
              color="#FFFFFF"
              fontSize="22px"
              fontWeight="400"
              marginTop="65.73px"
              onClick={handleShareClick} // 공유 버튼 클릭 시 ShareSuccessPage로 이동
            />
            <Button 
              text="다음에 할게요"
              backgroundColor="#FFFFFF"
              borderRadius="8px"
              width="280px"
              height="62px"
              color="#676F7B"
              fontSize="22px"
              fontWeight="400"
              marginTop="10px"
            />
          </div>
        )}
      </div>

      {showHashtagModal && (
        <HashtagModal 
          onClose={handleHashtagModalClose} 
          onAdd={handleHashtagAdd} 
        />
      )}

      {showRecordModal && (
        <RecordModal
          onClose={handleRecordModalClose} // 모달 닫기
          onConfirm={handleRecordConfirm} // 기록 모달 확인 버튼 클릭 시
        />
      )}
    </div>
  );
};

export default NotePhotoPage;
