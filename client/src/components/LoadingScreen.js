import "../styles/loader.css";
import React from "react";

const LoadingScreen = () => {
  return (
    <div className="overlay">
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default LoadingScreen;
