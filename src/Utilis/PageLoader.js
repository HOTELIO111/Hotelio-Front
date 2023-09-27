import React from "react";

const PageLoader = ({ loading }) => {
  return (
    <div
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        background: "white",
        height: "100%",
        display: loading === true ? "flex" : "none",
        zIndex: "9999",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1
        style={{
          fontSize: "50px",
          fontWeight: "600",
          animation: "hotelioLoader 2s infinite",
        }}
      >
        Welcome To Hotelio, Your Travel Partner
      </h1>
    </div>
  );
};

export default PageLoader;
