
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import successIcon from '../assets/review-success-icon.svg'; // 성공 아이콘 경로를 맞게 설정하세요
import Text from '../components/js/Text'; // Text 컴포넌트를 사용하고 있다면 import

const ReviewSuccessPage = () => {
  const navigate = useNavigate();

   // 3초 후에 홈으로 이동하는 로직
   useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/Album');
    }, 3000);

    return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 제거
  }, [navigate]);

 
  return (
    <div 
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: '#ffffff', // 배경 색상 설정
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column', // 텍스트와 아이콘을 세로로 정렬
        zIndex: 20, // 충분히 높은 값으로 설정하여 다른 요소 위에 표시되도록 함
      }}
    >
      <img 
        src={successIcon} 
        alt="Success Icon" 
        style={{ marginBottom: '20px'}} // 아이콘 크기 및 간격 설정
      />

      <Text 
        fontSize="22px" 
        color="#757575" // 텍스트 색상 설정
        fontWeight="500" 
        textAlign="center" 
        marginTop="27px"
      >
        소중한 의견이 <br/> 등록되었어요!
      </Text>

    </div>
  );
};

export default ReviewSuccessPage;
