import React from "react";
import ReactPlayer from "react-player";
import clsx from "clsx";

import useStyles from "./styles";

function MediaPreview({ type, url, fullWidth }) {
  const classes = useStyles();

  return (
    <>
      {type === 1 && (
        <ReactPlayer
          className={clsx(classes.video, fullWidth && classes.videoPreview)}
          controls={fullWidth}
          muted
          url={url}
        />
      )}
      {type === 2 && (
        <img
          src={url}
          className={clsx(
            !fullWidth && classes.image,
            fullWidth && classes.imagePreview
          )}
          alt="media-preview-img"
        />
      )}
    </>
  );
}

export default MediaPreview;
