import React from "react";

import "./StatusError.scss";

export default function StatusError({ code, message })
{
  return (
    <div className="vc-container">
      <div className="vc-content">
        <h1 className="vc-heading">{code}</h1>
        <p className="vc-sub-heading">{message}<span className="blink-infinite">!</span></p>
      </div>
    </div>
  );
}
