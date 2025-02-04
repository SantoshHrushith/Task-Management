import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50  flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-110">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold">Edit Task</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            X
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
