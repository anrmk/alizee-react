import React from "react";

import "./../components/VideoBackground.scss";

function VideoBackground(props) {
  return (
    <div className="video-background-holder">
      <div className="video-background-overlay"></div>
      <video muted="muted" loop="loop" autoPlay  >
        <source src={props.src} type="video/mp4" />
      </video>
      <div className="video-background-content h-100">
        {props.children}
      </div>
    </div>
  );
}

export default VideoBackground;
