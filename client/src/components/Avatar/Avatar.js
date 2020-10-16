import React from "react";

import defaultAvatar from "../../assets/img/avatar.png"

import "./Avatar.scss";

function Avatar({ url, size, className }) {
  return (
    <div className={className}>
      <img className={`avatar avatar--${size} rounded-circle`} src={url || defaultAvatar} alt="" />
    </div>
  );
}

Avatar.defaultProps = {
  url: "",
  size: "medium",
  className: ""
};

export default Avatar;
