import React from "react";

import { MEDIA_IMAGE, MEDIA_VIDEO } from "../../constants/media_types";
import ImageContent from "./ImageContent";
import VideoContent from "./VideoContent";

export default function MediaContent({
  kind,
  url,
  action,
  playState,
  config,

  onVideoDuration
}) {

  if (kind === MEDIA_VIDEO) {
    return (
      <VideoContent
        action={action}
        paused={playState}
        url={url}
        config={config}
        onDuration={onVideoDuration} />
    );
  } else if (kind === MEDIA_IMAGE) {
    return (
      <ImageContent
        action={action}
        isPaused={playState}
        url={url}
        config={config} />
    );
  }

  return null;
}
