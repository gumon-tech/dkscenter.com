import React from "react";

const Modal = ({ isOpen, onClose, children, title }) => {
  const modalStyle = {
    minWidth: '70vw', // ขนาดขั้นต่ำของ modal เป็น 70% ของ viewport width
    minHeight: '70vh', // ขนาดขั้นต่ำของ modal เป็น 70% ของ viewport height
    overflow: 'auto', // การเพิ่มสไลด์บาร์เมื่อข้อมูลมีมากเกินไป
  };

  if (!isOpen) return <></>;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="bg-white p-8 max-w-4xl w-full md:max-w-2xl md:w-3/4 lg:w-1/2 xl:w-1/3 mx-auto z-10 rounded-lg shadow-lg" style={modalStyle}>
        <div className="flex justify-between mb-4">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button
            className="text-gray-600 hover:text-gray-800 focus:outline-none"
            onClick={onClose}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
