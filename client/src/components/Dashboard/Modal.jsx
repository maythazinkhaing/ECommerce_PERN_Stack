import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <div
              className="fixed inset-0 bg-black opacity-50"
              onClick={onClose}
            ></div>
            <div className="bg-white rounded shadow-lg z-50 py-5 px-7">
              {children}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
