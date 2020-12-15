import React, { useEffect, useRef } from "react";

function Video({
  classVideoName,
  stream
}) {
  const videoRef = useRef(null);

  useEffect(() => {
    videoRef.current.srcObject = stream;
  }, [stream]);

  return <video
    className={classVideoName}
    ref={videoRef}
    autoPlay
    playsInline
    allowFullScreen
    controls />;
}

export default Video;
