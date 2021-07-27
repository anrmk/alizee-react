import React from "react";
import ReactPlayer from "react-player";
import clsx from "clsx";

import useStyles from "./styles";

function MediaPreview({
  type,
  url,
  fullWidth,
}) {
  const classes = useStyles();

  const renderMediaItem = (type, url, fw) => {
    if (type === 1) {
      return (
        <ReactPlayer
          className={clsx(classes.video, fw && classes.videoPreview)}
          controls={fw}
          muted={true}
          url={url}
        />
      );
    } else if (type === 2) {
      return <img src={url} className={clsx(!fw && classes.image, fw && classes.imagePreview)} />;
    }
  };

  return renderMediaItem(type, url, fullWidth);
}

export default MediaPreview;
