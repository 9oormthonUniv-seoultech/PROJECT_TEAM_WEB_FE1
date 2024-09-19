import React, { useState } from 'react';
import Text from './Text';
import cameraIcon from '../../assets/camera-icon.svg';
import thunderIcon from '../../assets/thunder-icon.svg';
import { ReactComponent as BackIcon } from '../../assets/x-icon.svg'; // SVG를 ReactComponent로 불러오기
import Button from './Button'; // 버튼 컴포넌트 임포트

const OverlayQrReader = ({ onClose, iconColor = "#D9D9D9", onConfirm }) => {
  return (
    <div 
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        zIndex: 10,
      }}
    >
      {/* 상단의 닫기 버튼 */}
      <button 
        onClick={onClose} // 클릭 시 onClose 호출
        style={{
          position: 'absolute',
          top: '41px',
          right: '35px',
          border: 'none',
          background: 'none',
          cursor: 'pointer',
          padding : '10px'
        }}
      >
        <BackIcon style={{ width: '24px', height: '24px', color: iconColor, stroke : '#FFFFFF' }} /> {/* 아이콘 색상 props로 지정 */}
      </button>

      {/* QR 인식 텍스트 상자 */}
      <div 
        style={{
          backgroundColor: '#D9D9D9',
          padding: '10px',
          borderRadius: '8px',
          marginTop: '181px',
          display: 'flex',
          flexDirection: 'column',
          maxWidth: '280px',
          maxHeight : '69px'
        }}
      >
        <Text 
          icon={cameraIcon} 
          fontSize="14px" 
          color="#171D24" 
          fontWeight="400" 
          textAlign="left" 
          marginTop="0"
        >
          어둡고 깔끔한 배경에서 더 잘 인식해요
        </Text>

        <Text 
          icon={thunderIcon} 
          fontSize="14px" 
          color="#171D24" 
          fontWeight="400" 
          textAlign="left" 
          marginTop="5px"
        >
          문서가 빛 반사되지 않도록 주의해주세요
        </Text>
      </div>

      {/* QR 인식 네모칸 */}
      <div 
        style={{
          width: '270px',
          height: '270px',
          border: '5px solid #5453EE',
          backgroundColor: '#FFFFFF',
          borderRadius: '24px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          marginTop : '40px'
        }}
      >
        {/* QR 인식을 위한 네모칸 내부 컨텐츠 추가 가능 */}
      </div>

      <Text 
          fontSize="18px" 
          color="#FFFFFF" 
          fontWeight="500" 
          marginTop="20px"
        >
          네모 안에 QR을 인식해주세요
      </Text>

      {/* 확인 버튼 */}
      <Button 
        text="확인" 
        backgroundColor="#5453EE" 
        borderRadius= "8px"
        width="267px"
        height="50px"
        color="#FFFFFF"
        fontSize="16px"
        marginTop="40px"
        onClick={onConfirm} // 확인 버튼 클릭 시 onConfirm 호출
      />
    </div>
  );
};

export default OverlayQrReader;
