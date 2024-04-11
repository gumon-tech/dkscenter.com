import React from "react";

const Modal = ({ isOpen, onClose, children, title }) => {
  const modalStyle = {
    minWidth: "70vw", // ขนาดขั้นต่ำของ modal เป็น 70% ของ viewport width
    // minHeight: '100vh', // ขนาดขั้นต่ำของ modal เป็น 70% ของ viewport height
  };

  if (!isOpen) return <></>;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div
        className="relative bg-white p-0 max-w-4xl w-full md:max-w-2xl md:w-3/4 lg:w-1/2 xl:w-1/3 mx-auto z-10 rounded-lg shadow-lg overflow-y-auto max-h-screen h-5/6 w-5/6 dark:bg-gray-800 dark:border-gray-700"
        style={modalStyle}
      >
        <div className="static top-0 left-0 right-0 flex justify-between mb-4 bg-gray-100 border-b border-gray-200 px-4 py-2 rounded-t-lg w-full dark:bg-gray-500 dark:border-gray-700">
          <h2 className="p-2 text-lg font-semibold ">{title}</h2>
          <button
            className="text-gray-600 hover:text-gray-800 focus:outline-none dark:text-gray-100"
            onClick={onClose}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 "
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
        <div className="h-2/3 px-8 pb-8">{children}</div>{" "}
        {/* เพิ่ม class overflow-y-auto และ max-h-96 เพื่อให้มีการเลื่อนแนวตั้งเฉพาะเนื้อหา */}
      </div>
    </div>
  );
};

export default Modal;
