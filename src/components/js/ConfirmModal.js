import React from 'react';
import Text from './Text';
import Button from './Button';


function ConfirmModal({ message, onConfirm, onCancel }) {
  const overlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // 어두운 배경
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const containerStyle = {
    width: '350px',
    height: '170px',
    backgroundColor: '#E9EAEE',
    borderRadius: '8px',
    textAlign: 'left',
  };

  return (
    <div style={overlayStyle}>
      <div style={containerStyle}>
      <Text fontSize="18px" fontWeight="500" color = "#171D24" marginTop="39px" marginLeft="20px">{message}</Text>
        <div style={{display:'flex'}} >
            <Button
            text="네"
            backgroundColor="#5453EE"
            borderRadius="8px"
            width="150px"
            height="50px"
            color="#FFFFFF"
            fontSize="16px"
            fontWeight="600"
            marginTop="30px"
            boxShadow="none"
            marginLeft="20px"
            onClick={onConfirm} // '확인' 버튼 클릭 시 처리
            /> 
            <Button
            text="아니오"
            backgroundColor="#FFFFFF"
            borderRadius="8px"
            width="150px"
            height="50px"
            color="#676F7B"
            fontSize="16px"
            fontWeight="600"
            marginTop="30px"
            boxShadow="none"
            marginLeft="10px"
            onClick={onCancel} // '확인' 버튼 클릭 시 처리
            /> 

        </div>
    
      </div>
    </div>
  );
}

export default ConfirmModal;
