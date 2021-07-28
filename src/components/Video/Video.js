import React, { useEffect, useRef } from "react";
import { Box } from "@material-ui/core";

import VideoControlButtons from "./VideoControlButtons";
import useStyles from "./styles";

function Video({
  classVideoName,
  controls = true,
  customControls = true,

  stream,
}) {
  const classes = useStyles();

  const videoRef = useRef(null);

  useEffect(() => {
    videoRef.current.srcObject = stream;
  }, [stream]);

  return (
    <Box className={classes.videoBox}>
      <video
        className={classVideoName}
        ref={videoRef}
        autoPlay
        playsInline
        allowFullScreen
        controls={controls}
      />
      {customControls && <VideoControlButtons />}
    </Box>
  );
}

export default Video;
