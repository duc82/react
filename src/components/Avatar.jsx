import React from "react";

const Avatar = ({ src, alt }) => {
  return (
    <div className="flex-center">
      <img src={src} alt={alt} className="avatar-img" />
    </div>
  );
};

export default Avatar;
