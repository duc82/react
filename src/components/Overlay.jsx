import React, { memo } from "react";

const Overlay = ({ onClick, className }) => {
  return <div onClick={onClick} className={`overlay ${className}`}></div>;
};

export default memo(Overlay);
