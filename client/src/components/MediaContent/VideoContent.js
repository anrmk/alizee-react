import React, { useState } from "react";
import PropTypes from "prop-types";
import ReactPlayer from "react-player";

import { Box } from "@material-ui/core";

import PlayIcon from "@material-ui/icons/PlayCircleOutline";
import PauseIcon from "@material-ui/icons/PauseCircleOutline";
import VolumeOff from "@material-ui/icons/VolumeOff";
import VolumeUp from "@material-ui/icons/VolumeUp";

import useStyles from "./styles";

export default function VideoContent({ id, url, lock }) {
  const classes = useStyles();

  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [showing, setShowing] = useState(true);

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
    <Box id={id} className={classes.videoContent} onMouseEnter={() => setShowing(true)} onMouseLeave={() => setShowing(false)}>
      {renderPlayBtn(showing, playing)}
      {renderMuteBtn(showing, muted, playing)}
     
      <ReactPlayer className={classes.player} width="100%" height="100%" playing={playing} muted={muted} url={url} />
    </Box>
  );
}

VideoContent.propTypes = {
  url: PropTypes.string,
  lock: PropTypes.bool
};

VideoContent.defaultProps = {
  url: "",
  lock: true
};
