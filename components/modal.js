import React from 'react';

const Modal = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6 sm:px-6">
      <div
        className="fixed inset-0 bg-[rgba(3,8,17,0.76)] backdrop-blur-md"
        onClick={onClose}
      />
      <div
        className="relative z-10 flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-[32px] border border-border/70 bg-surface-glass shadow-floating backdrop-blur-2xl"
      >
        <div className="flex items-center justify-between border-b border-border/70 bg-surface/80 px-5 py-4 sm:px-6">
          <h2 className="pr-4 text-lg font-semibold tracking-[-0.03em] text-text sm:text-xl">
            {title}
          </h2>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-2xl border border-border/70 bg-surface text-soft hover:text-text"
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
        <div className="overflow-y-auto px-5 pb-6 pt-5 sm:px-6 sm:pb-8">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
