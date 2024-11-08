import axios from 'axios';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import HeaderBar from '../components/js/HeaderBar';
import Button from '../components/js/Button';
import Text from '../components/js/Text';
import HashtagModal from '../components/js/HashtagModal';
import RecordModal from '../components/js/RecordModal';
import shareIcon from '../assets/share-icon.svg';
import clickedShareIcon from '../assets/clicked-share-icon.svg';
import unclickedShareIcon from '../assets/unclicked-share-icon.svg';
import SpeechBubble from '../components/js/SpeechBubble';
import { BASE_URL } from '../config';


const NotePhotoPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const photoTempUrl = location.state?.photoTempUrl;
  const photoTempId = location.state?.photoTempId;
  const photoboothId = location.state?.photoboothId;
  const photoboothName = location.state?.photoboothName;
  const formattedDate = location.state?.formattedDate;
  const [showHashtagModal, setShowHashtagModal] = useState(false);
  const [showRecordModal, setShowRecordModal] = useState(false);
  const [showSharingOptions, setShowSharingOptions] = useState(false);
  const [isIconClicked, setIsIconClicked] = useState(false);
  const [record, setRecord] = useState('오늘 있었던 일들을 기록해보세요');
  const [hashtags, setHashtags] = useState({ hashtag_1: '', hashtag_2: '', hashtag_3: '' });

  const hashtagCount = Object.values(hashtags).filter(tag => tag).length;
  console.log("Received photoTempuRL:", photoTempUrl, "photoTempId", photoTempId, "photoboothid", photoboothId, "photoboothName", photoboothName, "formattedDate", formattedDate);

  const handleAddClick = () => {
    setShowHashtagModal(true);
  };

  const handleHashtagModalClose = () => {
    setShowHashtagModal(false);
  };

  const handleHashtagAdd = (newHashtags) => {
    // Update hashtags with the new values from HashtagModal
    setHashtags({
      hashtag_1: newHashtags.hashtag_1 || '',
      hashtag_2: newHashtags.hashtag_2 || '',
      hashtag_3: newHashtags.hashtag_3 || ''
    });
    setShowHashtagModal(false);
  };

  const handleRecordModalOpen = () => {
    setShowRecordModal(true);
  };

  const handleRecordModalClose = () => {
    setShowRecordModal(false);
  };

  const handleRecordConfirm = (text) => {
    setRecord(text || '오늘 있었던 일들을 기록해보세요'); // Update button text or set default
    setShowRecordModal(false);
  };

  const handleIconClick = () => {
    setIsIconClicked(!isIconClicked); // 클릭할 때마다 상태를 토글
  };

  const handleShareClick = async () => {
    if (!photoTempId) {
      console.error('photoTempId가 없습니다.');
      return;
    }

    try {
      console.log("POST 요청을 보냅니다: `${BASE_URL}api/photo/save/${photoTempId}`");

      // 첫 번째 요청: '/api/photo/save/:photoTemp_id'로 POST 요청 보내기
      const saveResponse = await axios.post(`${BASE_URL}api/photo/save/${photoTempId}`);
      console.log('POST 요청 응답 데이터:', saveResponse.data);
      const newPhotoId = saveResponse.data?.newPhoto?.id;

      // 'isIconClicked'가 true이면 추가로 '/api/photo/share/:photo_id'로 GET 요청 보내기
      if (isIconClicked) {
        console.log(`GET 요청을 보냅니다: ${BASE_URL}api/photo/share/${newPhotoId}`);
        const shareResponse = await axios.get(`${BASE_URL}api/photo/share/${newPhotoId}`);
        console.log('GET 요청 응답 데이터:', shareResponse.data);

        const shareLink = shareResponse.data?.shareLink;
        if (shareLink) {
          await navigator.clipboard.writeText(shareLink);
          alert('링크가 복사되었습니다!');
        } else {
          console.error('응답에서 shareLink를 찾을 수 없습니다.');
        }
      }

      // 요청이 완료된 후 '/sharesuccess'로 이동
      navigate('/ShareSuccess', { state: { newPhotoId : newPhotoId,photoboothId: photoboothId, photoboothName : photoboothName , formattedDate : formattedDate} });
    } catch (error) {
      console.error('공유 요청 실패:', error);
      console.error('에러 상세:', {
        message: error.message,
        code: error.code,
        config: error.config,
        response: error.response,
      });
    }
  };

  const handleNextTimeClick = async () => {
    // '다음에 할게요' 버튼을 클릭하면 '/home'으로 이동
    const saveResponse = await axios.post(`${BASE_URL}api/photo/save/${photoTempId}`);
    console.log('POST 요청 응답 데이터:', saveResponse.data);
    navigate('/home');
  };

  const handleNextClick = async () => {
    if (!photoTempId) {
      console.error('photoTempId가 없습니다.');
      return;
    }
  
    try {
      const response = await axios.put(`${BASE_URL}api/photo/temp/${photoTempId}/update-record`, {
        hashtag_1: hashtags.hashtag_1,
        hashtag_2: hashtags.hashtag_2,
        hashtag_3: hashtags.hashtag_3,
        record: record
      });
  
      console.log('전송된 데이터:', {
        hashtag_1: hashtags.hashtag_1,
        hashtag_2: hashtags.hashtag_2,
        hashtag_3: hashtags.hashtag_3,
        record: record
      });
      console.log('서버 응답:', response.data);
  
      // ShareSuccess 페이지로 이동 대신 공유 옵션을 표시
      setShowSharingOptions(true);
    } catch (error) {
      console.error('데이터 전송 실패:', error);
    }
  };

  const handleIconButtonClick = () => {
    setIsIconClicked(true); // 아이콘 클릭 시 상태 변경
    
  };
  

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
      <HeaderBar title="사진 기록" showBackButton={true} showCloseButton={false} backgroundColor="#2A303A" buttonColor="#FFFFFF" titleColor="#FFFFFF" />
      <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: '#2A303A', height: '715px' }}>
        {!showSharingOptions ? (
          <>
            <div class="scrollable-content-x" style={{ display: 'flex', gap: '8px', marginTop: '16px', marginLeft: '13.5px', flexWrap: 'wrap' }}>
              {Object.values(hashtags).some((tag) => tag) ? (
                <>
                  {Object.entries(hashtags).map(([key, tag]) => 
                    tag && (
                      <Button 
                        key={key}
                        text={`# ${tag}`}
                        backgroundColor="#E1E0FF"
                        borderRadius="24px"
                        padding = "8px 20px"
                        color="#5453EE"
                        fontSize="16px"
                        fontWeight="400"
                        marginBottom="5px"
                      />
                    )
                  )}
                  <Text fontSize="12px" color="#C7C9CE" marginTop="23px">{`${hashtagCount}/3`}</Text>
                </>
              ) : (
                <>
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
                  <Text fontSize="12px" color="#C7C9CE" marginTop="23px">0/3</Text>
                </>
              )}
            </div>

            {Object.values(hashtags).every((tag) => !tag) && (
              <SpeechBubble 
                text="해시태그를 추가하면 사진을 쉽게 찾을 수 있어요" 
                marginTop="60px" 
                marginLeft="32px"
              />
            )}

            <img
              src= {photoTempUrl}
              alt="사진 확인"
              style={{
                maxWidth: '252px',
                maxHeight: '380px',
                marginTop: '100px',
                objectFit: 'cover',
                marginLeft: '69px'
              }}
            />
            <Button
              text={record}
              backgroundColor="#FFFFFF"
              borderRadius="8px"
              width="321px"
              height="49px"
              color="#676F7B"
              fontSize="16px"
              fontWeight="400"
              marginTop="24px"
              marginLeft="34px"
              onClick={handleRecordModalOpen}
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
              onClick={handleNextClick} 
            />
          </>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '100px' }}>
            <img
              src={shareIcon} // 클릭 상태에 따라 아이콘 표시
              alt="Sharing..."
              style={{ marginBottom: '20px', cursor: 'pointer' }}
         
            />
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '65px' }}>
              <img
                src={isIconClicked ? clickedShareIcon : unclickedShareIcon}
                alt="Share Icon"
                style={{ width: '24px', height: '24px', cursor: 'pointer' }}
                onClick={handleIconClick} // 이미지 클릭 이벤트 설정
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
              onClick={handleShareClick}
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
              onClick={handleNextTimeClick}
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
          onClose={handleRecordModalClose}
          onConfirm={handleRecordConfirm} // Pass the input text to the confirm handler
        />
      )}
    </div>
  );
};

export default NotePhotoPage;
