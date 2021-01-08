import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import CircularProgress from "@material-ui/core/CircularProgress";

import useStyles from "./styles";

export default function VideoContent({
  url,
  action,
  paused,
  config,

  onDuration
}) {
  const classes = useStyles();
  const [loaded, setLoaded] = useState(false);
  const [muted, setMuted] = useState(true);
  const { videoContentClassName } = config;
  let videoEl = useRef(null);

  useEffect(() => {
    if (videoEl.current) {
      if (paused) {
        videoEl.current.pause();
      } else {
        videoEl.current.play().catch(() => { });
      }
    }
  }, [paused]);

  const handleLoadedData = () => {
    onDuration(videoEl.current.duration);
    setLoaded(true);
    videoEl.current.play().then(() => {
      action("play");
    }).catch(() => {
      setMuted(true);
      videoEl.current.play().finally(() => {
        action("play");
      })
    });
  }
  
  return (
    <>
      <video
        className={clsx(classes.video, videoContentClassName)}
        ref={videoEl}
        src={url}
        controls={false}
        onLoadedData={handleLoadedData}
        playsInline
        muted={muted} />
      {!loaded && (
        <CircularProgress className={classes.loader} />
      )}
    </>
  );
}
