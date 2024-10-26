// YearMonthModal.js
import React, { useState } from 'react';
import Text from './Text';
import Button from './Button';
import InputValue from './InputValue';
import { ReactComponent as CloseIcon } from '../../assets/x-icon.svg';

const YearMonthModal = ({ onClose, onConfirm }) => {
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');

  const handleYearChange = (e) => {
    setYear(e.target.value);
  };

  const handleMonthChange = (e) => {
    setMonth(e.target.value);
  };

  const handleConfirmClick = () => {
    if (year.trim() && month.trim()) {
      onConfirm({ year, month });
      setYear('');
      setMonth('');
      onClose(); // 확인 버튼 클릭 시 모달 닫기
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container" style={{ height: '290px' }}>
        <button className="close-button" onClick={onClose} style={{
          backgroundColor: '#E9EAEE',
          borderRadius: '50%',
          width: '39px',
          height: '39px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: 'none',
          position: 'absolute',
          top: '31px',
          right: '16px',
        }}>
          <CloseIcon className="close-icon" width="14px" height="14px" color= "#676F7B" strokeWidth="2" />
        </button>
        <Text fontSize="22px" fontWeight="600" marginTop="21px">날짜 입력</Text>
        <div style={{ marginTop: '59px', display: 'flex', alignItems: 'center' }}>
          <InputValue
            type="text"
            width="115px"
            height="42px"
            backgroundColor="#E9EAEE"
            padding="0px"
            fontSize="18px"
            placeholder="0000"
            value={year}
            onChange={handleYearChange}
          />
          <Text fontSize="22px" fontWeight="600" color="#676f7b" marginLeft="8px">년</Text>
          <InputValue
            type="text"
            width="85px"
            height="42px"
            backgroundColor="#E9EAEE"
            padding="0px"
            marginLeft="40px"
            fontSize="18px"
            placeholder="00"
            value={month}
            onChange={handleMonthChange}
          />
          <Text fontSize="22px" fontWeight="600" color="#676f7b" marginLeft="8px">월</Text>
        </div>
        <Button
          text="확인"
          backgroundColor="#5453EE"
          borderRadius="6.45px"
          width="226px"
          height="50px"
          color="#FFFFFF"
          fontSize="22px"
          fontWeight="500"  // 원하는 글꼴 굵기 지정
          marginTop="42px"
          boxShadow="none"
          onClick={handleConfirmClick}
        />
      </div>
    </div>
  );
};

export default YearMonthModal;
