import React, { useEffect, useState } from 'react';
import Text from './Text';
import loadIcon from '../../assets/load-icon.svg';

const LoadingOverlay = ({ id, text = "로딩 중...", backgroundColor = "#FFFFFF", textColor = "#000000", onComplete }) => {
  const [progress, setProgress] = useState(0); // 로딩 진행률 상태 관리

  // 로딩 진행률 증가 로직
  useEffect(() => {
    if (progress < 100) {
      const interval = setInterval(() => {
        setProgress((prevProgress) => {
          const nextProgress = prevProgress + 1;
          if (nextProgress >= 100) {
            clearInterval(interval); // 진행률이 100%에 도달하면 인터벌 제거
            if (onComplete) {
              onComplete(); // 로딩 완료 콜백 호출
            }
          }
          return nextProgress;
        });
      }, 30); // 30ms마다 진행률 1% 증가
    }
  }, [progress, onComplete]);

  // id에 따른 텍스트와 스타일 변경 로직 추가
  const getLoadingText = () => {
    switch (id) {
      case 'download':
        return "앨범을 불러오는 중...";
      case 'upload':
        return "사진을 불러오는 중";
      default:
        return text;
    }
  };

  return (
    <div 
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: backgroundColor,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column', // 텍스트와 아이콘을 세로로 정렬
        zIndex: 20, // 충분히 높은 값으로 설정하여 다른 요소 위에 표시되도록 함
      }}
    >
      <div 
        style={{
          color: textColor,
          fontSize: '22px',
          fontWeight: '600',
          marginBottom: '10px', // 텍스트와 아이콘 사이 간격
        }}
      >
        {getLoadingText()}
      </div>

      <img 
        src={loadIcon} 
        alt="Loading..." 
        style={{  marginBottom: '20px' }} // 아이콘 크기 및 간격 설정
      />

      <div 
        style={{
          color: textColor,
          fontSize: '20px',
        }}
      >
        {progress}% {/* 로딩 진행률 표시 */}
      </div>

      <Text 
        fontSize="18px" 
        color="757575"
        fontWeight="500" 
        textAlign="center" 
        marginTop="20px"
      >
        잠시만 기다려주세요
      </Text>
    </div>
  );
};

export default LoadingOverlay;
