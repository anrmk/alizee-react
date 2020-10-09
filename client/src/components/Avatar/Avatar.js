import React from "react";

import "./Avatar.scss";

function Avatar({ url, size }) {
  return (
    <img className={`avatar__${size} border rounded-circle ml-1 mr-2`} src={url} />
  );
}

Avatar.defaultProps = {
  url: "",
  size: "medium",
};

export default Avatar;
