import React from "react";
import ReactPlayer from "react-player";

import {
  MEDIA_GROUP_TYPE,
  MEDIA_TYPE,
} from "../../../constants/media_types";

import useStyles from "./styles";

export default function MediaContent({
  type,
  url
}) {
  const classes = useStyles();

  const mediaTypeToKind = (pType) => {
    if (MEDIA_TYPE[pType] === MEDIA_GROUP_TYPE.VIDEO) {
      return 1;
    }

    return 2;
  }

  return mediaTypeToKind(type) === 1 ? (
    <ReactPlayer
      className={classes.video}
      controls={true}
      muted={true}
      url={url}
    />
  ) : <img loading="lazy" src={url} />;
}
