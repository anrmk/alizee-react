import React, { useEffect, useRef } from "react";
import { Box } from "@material-ui/core";

import VideoControlButtons from "./VideoControlButtons"
import useStyles from "./styles";

function Video({
  classVideoName,
  stream,

  onOpenDrawer
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
        controls>
      </video>
      <VideoControlButtons onOpenDrawer={onOpenDrawer} />
    </Box>
  );
}

export default Video;
