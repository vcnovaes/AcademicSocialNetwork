// src/components/Modal.tsx
import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div style={modalStyles}>
      <div style={modalContentStyles}>
        <span style={closeButtonStyles} onClick={onClose}>
          &times;
        </span>
        {children}
      </div>
    </div>
  );
};

const modalStyles: React.CSSProperties = {
  position: 'fixed',
  left: '10px',
  top: '10px',
  zIndex: 1,
};

const modalContentStyles: React.CSSProperties = {
  backgroundColor: '#077533',
  padding: '20px',
  borderRadius: '5px',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
};

const closeButtonStyles: React.CSSProperties = {
  position: 'absolute',
  top: '10px',
  right: '10px',
  fontSize: '20px',
  cursor: 'pointer',
};

export default Modal;
