import React from "react";

import "./Thumbnail.scss";

function Thumbnail({ name, url }) {
  return (
    <div className="thumbnail" title={name} style={{backgroundImage: `url(${url})` }}></div>
  );
}

Thumbnail.defaultProps = {
  name : "",
  url: ""
}

export default Thumbnail;
