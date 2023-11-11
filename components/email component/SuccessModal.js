import React from 'react';


//Component for Successfull Message Display
const SuccessModal = ({ SuccessMessage, onClose }) => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-4 rounded-lg">
        <p className="text-green-500">{SuccessMessage}</p>
        <button className="bg-green-500 text-white px-3 py-1 rounded" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;
