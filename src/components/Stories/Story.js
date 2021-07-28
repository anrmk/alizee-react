import React, { useContext } from "react";
import { Box } from "@material-ui/core";

import GlobalContext from "./Context/GlobalContext";
import MediaContent from "./MediaContent";
import useStyles from "./styles";

export default function Story({
  kind,
  url,
  action,
  playState,
  onVideoDuration,
}) {
  const classes = useStyles();
  const { width, height, loader, header, storyStyles } =
    useContext(GlobalContext);
  const config = { width, height, loader, header, storyStyles };

  const handleVideoDuration = (duration) => {
    onVideoDuration(duration);
  };

  return (
    <Box className={classes.story}>
      <MediaContent
        kind={kind}
        url={url}
        action={action}
        playState={playState}
        config={config}
        onVideoDuration={handleVideoDuration}
      />
    </Box>
  );
}
