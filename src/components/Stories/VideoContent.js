import React, { useState, useEffect, useRef, useContext } from "react";
import clsx from "clsx";
import CircularProgress from "@material-ui/core/CircularProgress";

import useStoriesControls from "../../hooks/useStoriesControls";
import StoriesContext from "./Context/StoriesContext";

import useStyles from "./styles";

export default function VideoContent({
  url,
  action,
  paused,
  config,

  onDuration,
}) {
  const classes = useStyles();
  const [loaded, setLoaded] = useState(false);
  const {
    storyOptions: { muted },
  } = useContext(StoriesContext);
  const { muteAudio } = useStoriesControls();
  const { videoContentClassName } = config;
  const videoEl = useRef(null);

  useEffect(() => muteAudio(false), []);

  useEffect(() => {
    if (videoEl.current) {
      if (paused) {
        videoEl.current.pause();
      } else {
        videoEl.current.play().catch(() => {});
      }
    }
  }, [paused]);

  const handleLoadedData = () => {
    onDuration(videoEl.current.duration);
    setLoaded(true);
    videoEl.current
      .play()
      .then(() => {
        action("play");
      })
      .catch(() => {
        muteAudio(true);
        videoEl.current.play().finally(() => {
          action("play");
        });
      });
  };

  return (
    <>
      {!loaded && <CircularProgress className={classes.loader} />}
      <video
        className={clsx(classes.video, videoContentClassName)}
        ref={videoEl}
        src={url}
        controls={false}
        onLoadedData={handleLoadedData}
        playsInline
        muted={muted}
      />
    </>
  );
}
