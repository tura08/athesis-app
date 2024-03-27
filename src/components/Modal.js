// Modal.js
import React from "react";
import "./Modal.css"; // Ensure you have some basic styling for the modal

const Modal = ({ children, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {children}
        <button onClick={onClose} className="modal-close-btn">
          x
        </button>
      </div>
    </div>
  );
};

export default Modal;
