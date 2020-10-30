import React, { useState } from 'react';
import PropTypes from 'prop-types';

import ReactPlayer from 'react-player';
import PlayArrow from '@material-ui/icons/PlayArrow';
import Pause from '@material-ui/icons/Pause';
import VolumeOff from '@material-ui/icons/VolumeOff';
import VolumeUp from '@material-ui/icons/VolumeUp';

export default function VideoContent({ url }) {
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
  }

  const handlePlayBtnClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setPlaying(!playing);
  }

  const handleMuteBtnClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setMuted(!muted);
  }

  const renderPlayBtn = (show, stop) => {
    let styleOpacity = getControlsOpacity(show, stop);

    return (
      <div 
        className="react-player__controls react-player-btn-play"
        style={{ opacity: styleOpacity }}
        onClick={handlePlayBtnClick}>
        {!stop ? <PlayArrow /> : <Pause />}
      </div>
    )
  }

  const renderMuteBtn = (show, mute, stop) => {
    let styleOpacity = getControlsOpacity(show, stop);

    return (
      <div 
        className="react-player__controls react-player__controls--margin react-player-btn-mute"
        style={{ opacity: styleOpacity }}
        onClick={handleMuteBtnClick}>
        {!mute ? <VolumeUp /> : <VolumeOff />}
      </div>
    )
  }

  return (
      <div 
        className="react-player-wrapper"
        onMouseEnter={() => setShowing(true)}
        onMouseLeave={() => setShowing(false)}>
        {renderPlayBtn(showing, playing)}
        {renderMuteBtn(showing, muted, playing)}
        <ReactPlayer 
        
          className="react-player"
          width="100%"
          playing={playing}
          muted={muted}
          url={url} />
      </div>
  )
}

VideoContent.propTypes = {
  url: PropTypes.string
}

VideoContent.defaultProps = {
  url: ""
}