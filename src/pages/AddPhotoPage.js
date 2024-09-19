import React, { useState } from 'react';
import HeaderBar from '../components/js/HeaderBar'; 
import Button from '../components/js/Button';
import circleIcon from '../assets/circle-icon.svg';
import clickedCircleIcon from '../assets/clicked-circle-icon.svg';

function AddPhotoPage() {
  const [clickedButton, setClickedButton] = useState(null); // 클릭된 버튼 ID를 관리

  const handleClick = (buttonId) => {
    setClickedButton(buttonId); // 클릭된 버튼 ID를 상태로 설정
  };

  // 클릭되었을 때의 색상
  const getBackgroundColor = (buttonId) => {
    return clickedButton === buttonId ? '#E1E0FF' : '#FFFFFF';
  };

  const getTextColor = (buttonId) => {
    return clickedButton === buttonId ? '#5453EE' : '#C7C9CE';
  };

  // 클릭되었을 때의 테두리 색상
  const getBorder = (buttonId) => {
    return clickedButton === buttonId ? '1px solid #5453EE' : '1px solid #C7C9CE';
  };

  // 클릭되었을 때의 아이콘
  const getIcon = (buttonId) => {
    return clickedButton === buttonId ? clickedCircleIcon : circleIcon;
  };


  return (
    <div style={{
      width: '100%',  // App.css에서 설정한 width에 맞추기
      height: '100%', // App.css에서 설정한 height에 맞추기
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
            backgroundColor={getBackgroundColor('qr')} // 클릭 시 배경 색상 변경
            borderRadius= "8px"
            width="267px"
            height="90px"
            color={getTextColor('qr')} // 클릭 시 텍스트 색상 변경
            fontSize="16px"
            position="relative"
            icon={getIcon('qr')} // 클릭 시 아이콘 변경
            iconMargin="12px" 
            boxShadow = "none"
            border={getBorder('qr')} // 클릭 시 테두리 변경
            onClick={() => handleClick('qr')} // 버튼 클릭 시 handleClick 호출
          />

          <Button 
            text="내 사진첩 불러오기" 
            backgroundColor={getBackgroundColor('album')} // 클릭 시 배경 색상 변경
            borderRadius= "8px"
            width="267px"
            height="90px"
            color={getTextColor('album')} // 클릭 시 텍스트 색상 변경
            fontSize="16px"
            position="relative"
            icon={getIcon('album')} // 클릭 시 아이콘 변경
            iconMargin="12px" 
            boxShadow = "none"
            border={getBorder('album')} // 클릭 시 테두리 변경
            marginTop="22px"
            onClick={() => handleClick('album')} // 버튼 클릭 시 handleClick 호출
          />
      </div>

      {/* 다음 버튼 */}
      {clickedButton && (
        <div 
          style={{
            position: 'absolute',
            bottom: '122px', // 화면 하단에 위치하도록 설정
            left: '50%',
            transform: 'translateX(-50%)', // 중앙 정렬
            zIndex: '10'
          }}
        >
          <Button 
            text="다음" 
            backgroundColor="#5453EE" // '다음' 버튼의 배경색
            borderRadius="8px"
            width="280px"
            height="62px"
            color="#FFFFFF" // '다음' 버튼의 텍스트 색상
            fontSize="22px"
            fontWeight = "500"
            boxShadow= "none"
            onClick={() => console.log('다음 버튼 클릭')}
          />
        </div>
      )}
    </div>
  );
}

export default AddPhotoPage;
