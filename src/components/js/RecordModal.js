import React, { useState } from 'react';
import '../css/HashtagModal.css'; // 모달 스타일을 위한 CSS 파일
import Text from './Text';
import Button from './Button';
import InputValue from './InputValue';
import { ReactComponent as CloseIcon } from '../../assets/x-icon.svg';

const RecordModal = ({ onClose, onConfirm }) => {
  


  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button className="close-button" onClick={onClose}>
          <CloseIcon className="close-icon" /> {/* SVG 아이콘 사용 */}
        </button>
        <Text fontSize="22px" fontWeight="600" marginTop="41px">기록 추가</Text>
        <Text fontSize="12px" fontWeight="400" marginTop="6px">자유롭게 사진에 대한 기록을 추가해보세요!</Text>
        
        <InputValue
            type="text"
            width="321px"
            height = "49px"
            marginTop = "37px"
            placeholder="추억 기록하기"
            placeholderColor="#676F7B"
        />
    
       
        <Button
          text="확인"
          backgroundColor="#5453EE"
          borderRadius="8px"
          width="226px"
          height="50px"
          color="#FFFFFF"
          fontSize="22px"
          fontWeight="500"
          marginTop="30px"
          onClick={onConfirm} // '확인' 버튼 클릭 시 처리
        />
      </div>
    </div>
  );
};

export default RecordModal;
