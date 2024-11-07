// Modal.js
import React from 'react';

const Modal = ({ children, onClose }) => (
  <div style={{
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 30
  }} onClick={onClose}>
    <div style={{
      width: '300px',
      backgroundColor: '#E9EAEE',
      borderRadius: '10px',
      padding: '20px',
      position: 'relative',
      textAlign: 'center'
    }} onClick={(e) => e.stopPropagation()}>
      {children}
    </div>
  </div>
);

export default Modal;
