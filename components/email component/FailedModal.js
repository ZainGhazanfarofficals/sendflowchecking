import React from 'react';

const FailedModal = ({ FailedMessage, onClose }) => {
  return (
    <div>
      <div>
        <p>{FailedMessage}</p>
        <button onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default FailedModal;
