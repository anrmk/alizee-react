import React from "react";

import "./Thumbnail.scss";

function Thumbnail({ name, url, className }) {
  return (
    <div className={`thumbnail ${className}`} title={name} style={{backgroundImage: `url(${url})` }}></div>
  );
}

Thumbnail.defaultProps = {
  name : "",
  url: "",
  className: ""
}

export default Thumbnail;
