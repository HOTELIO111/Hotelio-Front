import React from "react";

const GlobalModal = ({ children, isOpen, onClose, height, width }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="modal-overlay"
      style={{
        position: "fixed",
        width: "100%",
        left: "0",
        top: "0",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0,0,0,0.5)",
        zIndex: "300",
      }}
    >
      <div
        className="modal-content"
        style={{
          background: "white",
          width: width ? width : "30vw",
          height: height ? height : "25vh",
          borderRadius: "15px",
        }}
      >
        <div
          className="modal-close"
          style={{ padding: ".5rem 1rem", fontSize: "32px", cursor: "pointer" }}
          onClick={onClose}
        >
          &times;
        </div>
        {children}
      </div>
    </div>
  );
};

export default GlobalModal;
