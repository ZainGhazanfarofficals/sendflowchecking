import React from 'react';

// Component for Successful Message Display
const SuccessModal = ({ SuccessMessage, onClose }) => {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 50 }}>
      <div style={{ backgroundColor: 'white', padding: '16px', borderRadius: '8px' }}>
        <p style={{ color: 'green' }}>{SuccessMessage}</p>
        <button style={{ backgroundColor: 'green', color: 'white', padding: '8px', borderRadius: '4px' }} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;
