import React from "react";

import defaultAvatar from "../../assets/img/avatar_female.jpg"

import "./Avatar.scss";

const avatartOnError = (e) => {
  e.target.src = defaultAvatar;
}

function Avatar({ url, size, className }) {
  return (
    <div className={`avatar avatar--${size} ${className}`} >
      <img src={url} alt="" onError={avatartOnError} />
    </div>
  );
}

Avatar.defaultProps = {
  url: "",
  size: "medium",
  className: ""
};

export default Avatar;