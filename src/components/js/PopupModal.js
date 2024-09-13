import React from 'react';
import './css/PopupModal.css'; // 스타일 정의
import Button from './Button'; // 재사용할 버튼
import Text from './Text'; // 재사용할 텍스트

function PopupModal({ isOpen, onClose, content }) {
  if (!isOpen) return null; // 팝업이 열리지 않으면 아무것도 렌더링하지 않음

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <Text>{content}</Text>
        <Button onClick={onClose}>Close</Button>
      </div>
    </div>
  );
}

export default PopupModal;
