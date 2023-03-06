import React, { memo } from "react";

const Overlay = ({ onClick, active }) => {
  return (
    <div
      onClick={onClick}
      className={`overlay ${active ? "active" : ""}`}
    ></div>
  );
};

export default memo(Overlay);
