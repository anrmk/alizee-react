import React, { useState } from 'react';
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

  const handleMuteBtnClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setMuted(!muted);
  }

  const renderPlayBtn = (show, stop) => {
    let styleOpacity = getControlsOpacity(show, stop);

    return (
      <div className="react-player__controls react-player-btn-play" style={{ opacity: styleOpacity }}>
        {!stop ? <PlayArrow /> : <Pause />}
      </div>
    )
  }

  const renderMuteBtn = (show, mute, stop) => {
    let styleOpacity = getControlsOpacity(show, stop);

    return (
      <div 
        className="react-player__controls react-player__controls-margin react-player-btn-mute"
        style={{ opacity: styleOpacity }}
        onClick={handleMuteBtnClick}>
        {!mute ? <VolumeUp /> : <VolumeOff />}
      </div>
    )
  }

  return (
      <div 
        className="d-flex justify-content-center align-items-center"
        onMouseEnter={() => setShowing(true)}
        onMouseLeave={() => setShowing(false)}
        onClick={() => setPlaying(!playing)}>
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