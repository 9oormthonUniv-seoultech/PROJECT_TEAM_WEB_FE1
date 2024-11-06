import React, { useState } from 'react';
import '../css/HashtagModal.css'; // 모달 스타일을 위한 CSS 파일
import Text from './Text';
import Button from './Button';
import InputValue from './InputValue';
import { ReactComponent as CloseIcon } from '../../assets/x-icon.svg';

const HashtagModal = ({ onClose, onAdd }) => {
  const [hashtag1, setHashtag1] = useState('');
  const [hashtag2, setHashtag2] = useState('');
  const [hashtag3, setHashtag3] = useState('');

  const handleAddClick = () => {
    onAdd({
      hashtag_1: hashtag1.trim(),
      hashtag_2: hashtag2.trim(),
      hashtag_3: hashtag3.trim()
    });
    onClose(); // '확인' 버튼 클릭 시 모달 닫기
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button className="close-button" onClick={onClose}>
          <CloseIcon className="close-icon" /> {/* SVG 아이콘 사용 */}
        </button>
        <Text fontSize="22px" fontWeight="600" marginTop="41px">해시태그 추가</Text>
        <Text fontSize="12px" fontWeight="400" marginTop="6px">최대 3개까지 #을 추가해볼 수 있어요!</Text>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '34px' }}>
          <Text fontSize="22px" fontWeight="600" color="#676F7B">#</Text>
          <InputValue
            type="text"
            width="115px"
            height="42px"
            placeholder="기념일"
            placeholderColor="#C7C9CE"
            value={hashtag1}
            onChange={(e) => setHashtag1(e.target.value)} // 첫 번째 해시태그
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '8px' }}>
          <Text fontSize="22px" fontWeight="600" color="#676F7B">#</Text>
          <InputValue
            type="text"
            width="115px"
            height="42px"
            placeholder="이름"
            placeholderColor="#C7C9CE"
            value={hashtag2}
            onChange={(e) => setHashtag2(e.target.value)} // 두 번째 해시태그
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '8px' }}>
          <Text fontSize="22px" fontWeight="600" color="#676F7B">#</Text>
          <InputValue
            type="text"
            width="115px"
            height="42px"
            placeholder="장소"
            placeholderColor="#C7C9CE"
            value={hashtag3}
            onChange={(e) => setHashtag3(e.target.value)} // 세 번째 해시태그
          />
        </div>

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
          onClick={handleAddClick} // '확인' 버튼 클릭 시 처리
        />
      </div>
    </div>
  );
};

export default HashtagModal;
