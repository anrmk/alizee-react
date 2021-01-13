import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import ReactPlayer from "react-player";
import VisibilitySensor from 'react-visibility-sensor';

import { Box } from "@material-ui/core";

import PlayIcon from "@material-ui/icons/PlayCircleOutline";
import PauseIcon from "@material-ui/icons/PauseCircleOutline";
import VolumeOff from "@material-ui/icons/VolumeOff";
import VolumeUp from "@material-ui/icons/VolumeUp";

import useStyles from "./styles";

export default function VideoContent({
  id,
  url,
  showControls,
  wrapperClassName,
  videoClassName,
  videoPlayerProps
}) {
  const classes = useStyles();

  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [showing, setShowing] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setPlaying(true);
    } else {
      if (playing) {
        setPlaying(false);
      }
    }
  }, [isVisible]);

  const getControlsOpacity = (show, stop) => {
    if (stop && show) {
      return 1;
    } else if ((!stop && show) || (!stop && !show)) {
      return 1;
    }

    return 0;
  };

  const handlePlayBtnClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setPlaying(!playing);
  };

  const handleMuteBtnClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setMuted(!muted);
  };

  const renderPlayBtn = (show, stop) => {
    let styleOpacity = getControlsOpacity(show, stop);

    return (
      <div className={`${classes.playerControlls} play`} style={{ opacity: styleOpacity }} onClick={handlePlayBtnClick}>
        {!stop ? <PlayIcon /> : <PauseIcon />}
      </div>
    );
  };

  const renderMuteBtn = (show, mute, stop) => {
    let styleOpacity = getControlsOpacity(show, stop);

    return (
      <div
        className={`${classes.playerControlls} volume`}
        style={{ opacity: styleOpacity }}
        onClick={handleMuteBtnClick}
      >
        {!mute ? <VolumeUp /> : <VolumeOff />}
      </div>
    );
  };

  return (
    <Box id={id} className={clsx(classes.videoContent, wrapperClassName)} onMouseEnter={() => setShowing(true)} onMouseLeave={() => setShowing(false)}>
      {showControls && renderPlayBtn(showing, playing)}
      {showControls && renderMuteBtn(showing, muted, playing)}
      <VisibilitySensor onChange={(isVisible) => setIsVisible(isVisible)}>
        <ReactPlayer className={clsx(classes.player, videoClassName)} width="100%" height="100%" playing={playing} muted={muted} url={url} {...videoPlayerProps} />
      </VisibilitySensor>
    </Box>
  );
}

VideoContent.propTypes = {
  url: PropTypes.string,
  showControls: PropTypes.bool
};

VideoContent.defaultProps = {
  url: "",
  showControls: true
};
