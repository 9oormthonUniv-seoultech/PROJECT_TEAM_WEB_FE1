import React, { useState } from 'react';
import axios from 'axios';
import Text from './Text';
import { ReactComponent as BackIcon } from '../../assets/x-icon.svg';
import Button from './Button';

const OverlayQrReader = ({ onClose, iconColor = "#D9D9D9" }) => {
  const [qrData, setQrData] = useState(null);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        // FormData로 파일을 서버에 전송
        const formData = new FormData();
        formData.append("file", file);

        const response = await axios.post('/api/photo/temp/upload/qr', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        
        // 서버에서 QR 코드의 링크를 반환하는 경우
        setQrData(response.data.qr_link); // 서버에서 반환한 QR 링크 설정
        alert("QR 코드가 성공적으로 인식되었습니다!");
      } catch (error) {
        console.error("QR 코드 인식 실패:", error);
        alert("QR 코드 인식에 실패했습니다.");
      }
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
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        zIndex: 10,
      }}
    >
      <button 
        onClick={onClose}
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
        <BackIcon style={{ width: '24px', height: '24px', color: iconColor, stroke : '#FFFFFF' }} />
      </button>

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
        <Text fontSize="14px" color="#171D24" fontWeight="400" textAlign="left" marginTop="0">
          QR 코드를 촬영하여 인식하세요
        </Text>
      </div>

      {/* QR 촬영 버튼 */}
      <input
        type="file"
        accept="image/*"
        capture="environment" // 모바일 카메라 활성화
        onChange={handleFileChange}
        style={{
          width: '270px',
          height: '270px',
          border: '5px solid #5453EE',
          backgroundColor: '#FFFFFF',
          borderRadius: '24px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop : '40px'
        }}
      />

      <Text fontSize="18px" color="#FFFFFF" fontWeight="500" marginTop="20px">
        QR 코드를 인식해주세요
      </Text>

      <Button 
        text="확인" 
        backgroundColor="#5453EE" 
        borderRadius= "8px"
        width="267px"
        height="50px"
        color="#FFFFFF"
        fontSize="16px"
        marginTop="40px"
        onClick={() => {
          if (qrData) {
            alert(`QR 링크: ${qrData}`);
          } else {
            alert("QR 코드를 먼저 인식하세요");
          }
        }}
      />
    </div>
  );
};

export default OverlayQrReader;
