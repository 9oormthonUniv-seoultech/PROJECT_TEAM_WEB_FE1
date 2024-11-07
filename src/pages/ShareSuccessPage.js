// ShareSuccessPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import successIcon from '../assets/share-success-icon.svg';
import Text from '../components/js/Text';
import Button from '../components/js/Button';
import Modal from '../components/js/Modal';

const ShareSuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const newPhotoId = location.state?.newPhotoId;
  const photoboothName = location.state?.photoboothName;
  const formattedDate = location.state?.formattedDate;
  console.log("received newphotoid!" , newPhotoId);
  console.log("received photoBoothName!" , photoboothName);
  console.log("received formattedDate!" , formattedDate);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsModalOpen(true); // 3초 후 모달 열기
    }, 3000);

    return () => clearTimeout(timer); // 타이머 클리어
  }, []);

  const handleWriteReview = () => {
    // 보낼 데이터 로그 출력
    console.log("Navigating to /review with data:", {
      newPhotoId: newPhotoId,
      photoboothName: photoboothName,
      formattedDate: formattedDate
    });
    
    setIsModalOpen(false);
    navigate('/review', { state: { newPhotoId: newPhotoId, photoboothName: photoboothName, formattedDate: formattedDate } });
  };
  

  const handleCloseModal = () => {
    setIsModalOpen(false);
    navigate('/Album'); // 모달 닫을 때 Album으로 이동
  };

  return (
    <div className='app-container'>
    <div 
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: '#ffffff',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        zIndex: 20,
      }}
    >
      <img src={successIcon} alt="Success Icon" style={{ marginBottom: '20px'}} />
      <Text fontSize="22px" color="#757575" fontWeight="500" textAlign="center" marginTop="27px">
        링크가 <br/> 복사됐어요!
      </Text>

      {isModalOpen && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 25,
          }}
        >
          <div
            style={{
              width: '350px',
              height: '169px',
              backgroundColor: '#E9EAEE',
              borderRadius: '8px',
              textAlign: 'center',
              position: 'relative',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <Text fontSize="12px" color="#676F7B" fontWeight="400" marginTop="20px" marginLeft="20px">
              {photoboothName}
            </Text>
            <Text fontSize="18px" color="#171D24" fontWeight="500" marginTop="5px" marginLeft="20px">
            지금 바로 리뷰를 작성해보세요!
            </Text>
            <div style={{ display: 'flex', alignItems: 'center', marginTop: '30px' }}>
              <Button 
                text="작성할래요"
                onClick={handleWriteReview}
                backgroundColor="#5453EE"
                borderRadius="8px"
                width="150px"
                height="50px"
                color="#FFFFFF"
                fontSize="16px"
                boxShadow="none"
                marginLeft="20px"
              />
              <Button 
                text="괜찮아요"
                onClick={handleCloseModal}
                backgroundColor="#FFFFFF"
                borderRadius="8px"
                width="150px"
                height="50px"
                color="#676F7B"
                fontSize="16px"
                boxShadow="none"
                marginLeft="10px"
              />
            </div>
          </div>
        </div>
 
      )}
    </div>
    </div>
  );
};

export default ShareSuccessPage;
