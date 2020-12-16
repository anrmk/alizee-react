import React from "react";
import { Box, IconButton, Hidden } from "@material-ui/core";

import CallEndIcon from "@material-ui/icons/CallEnd";
import ChatIcon from "@material-ui/icons/Chat";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import MicNoneIcon from "@material-ui/icons/MicNone";
import VideocamIcon from "@material-ui/icons/Videocam";

import useStyles, { StyledButton } from "./styles";

function VideoControlButtons({
  onOpenDrawer
}) {
  const classes = useStyles();

  return (
    <Box className={classes.buttonGroup}>
      <StyledButton
        className={classes.button}
        size="medium"
        variant="contained"
        color="secondary"
        startIcon={<MicNoneIcon />}
        endIcon={<ExpandLessIcon />} />
      <StyledButton
        className={classes.button}
        size="medium"
        variant="contained"
        color="secondary"
        endIcon={<CallEndIcon />} />
      <StyledButton
        className={classes.button}
        size="medium"
        variant="contained"
        color="secondary"
        startIcon={<VideocamIcon />}
        endIcon={<ExpandLessIcon />} />

      <Hidden lgUp >
        <IconButton color="secondary"
          onClick={onOpenDrawer()}>
          <ChatIcon />
        </IconButton>
      </Hidden>
    </Box>
  );
}

export default VideoControlButtons;
