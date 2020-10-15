import React from "react";

import "./Avatar.scss";

function Avatar({ url, size }) {
  return (
    <div>
      <img className={`avatar avatar--${size} rounded-circle`} src={url} />
    </div>
  );
}

Avatar.defaultProps = {
  url: "",
  size: "medium",
};

export default Avatar;
