import React from "react";

import "./Avatar.scss";

function Avatar({ url, size, className }) {
  return (
    <div className={className}>
      <img className={`avatar avatar--${size} rounded-circle`} src={url} alt="" />
    </div>
  );
}

Avatar.defaultProps = {
  url: "",
  size: "medium",
  className: ""
};

export default Avatar;
