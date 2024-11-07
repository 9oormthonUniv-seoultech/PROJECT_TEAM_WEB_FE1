import React, { useState } from 'react';
import Text from './Text';
import cameraIcon from '../../assets/camera-icon.svg';
import thunderIcon from '../../assets/thunder-icon.svg';
import { ReactComponent as BackIcon } from '../../assets/x-icon.svg';
import { QrReader } from 'react-qr-reader';
import Button from './Button';
import axios from 'axios';

const OverlayQrReader = ({ onClose, iconColor = "#D9D9D9", onConfirm, userId }) => {
  const [qrUrl, setQrUrl] = useState(null);

  // QR 인식 시 URL 저장
  const handleQrScan = (data) => {
    if (data) {
      setQrUrl(data); // QR 코드를 읽으면 URL을 저장
    }
  };

  // 오류 처리
  const handleQrError = (error) => {
    console.error("QR 코드 인식 오류:", error);
  };

  // 확인 버튼 클릭 시 API로 데이터 전송
  const handleConfirmClick = async () => {
    if (qrUrl && userId) {
      try {
        const response = await axios.post('/api/photo/temp/upload/qr', {
          user_id: userId,
          url: qrUrl,
        });
        console.log("QR 코드 업로드 성공:", response.data);
        onConfirm(); // 완료 후 다음 작업 실행
      } catch (error) {
        console.error("QR 코드 업로드 실패:", error);
      }
    } else {
      console.log("QR 코드 URL 또는 user_id가 없습니다.");
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
          padding: '10px',
        }}
      >
        <BackIcon style={{ width: '24px', height: '24px', color: iconColor, stroke: '#FFFFFF' }} />
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
          maxHeight: '69px',
        }}
      >
        <Text icon={cameraIcon} fontSize="14px" color="#171D24" fontWeight="400" textAlign="left" marginTop="0">
          어둡고 깔끔한 배경에서 더 잘 인식해요
        </Text>
        <Text icon={thunderIcon} fontSize="14px" color="#171D24" fontWeight="400" textAlign="left" marginTop="5px">
          문서가 빛 반사되지 않도록 주의해주세요
        </Text>
      </div>

      {/* QR 리더 */}
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
          marginTop: '40px',
        }}
      >
        <QrReader
          delay={300}
          onError={handleQrError}
          onResult={(result, error) => {
            if (!!result) {
              handleQrScan(result?.text);
            }
            if (!!error) {
              handleQrError(error);
            }
          }}
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      <Text fontSize="18px" color="#FFFFFF" fontWeight="500" marginTop="20px">
        네모 안에 QR을 인식해주세요
      </Text>

      <Button
        text="확인"
        backgroundColor="#5453EE"
        borderRadius="8px"
        width="267px"
        height="50px"
        color="#FFFFFF"
        fontSize="16px"
        marginTop="40px"
        onClick={handleConfirmClick} // 확인 버튼 클릭 시 handleConfirmClick 호출
      />
    </div>
  );
};

export default OverlayQrReader;
