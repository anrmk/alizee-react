import React from "react";
import { Box } from "@material-ui/core";

import CallEndIcon from "@material-ui/icons/CallEnd";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import MicNoneIcon from "@material-ui/icons/MicNone";
import VideocamIcon from "@material-ui/icons/Videocam";

import useStyles, { StyledButton } from "./styles";

function VideoControlButtons() {
  const classes = useStyles();

  return (
    <Box className={classes.buttonGroup}>
      <StyledButton
        className={classes.button}
        size="medium"
        variant="contained"
        color="secondary"
        startIcon={<MicNoneIcon />}
        endIcon={<ExpandLessIcon />}
      />
      <StyledButton
        className={classes.button}
        size="medium"
        variant="contained"
        color="secondary"
        endIcon={<CallEndIcon />}
      />
      <StyledButton
        className={classes.button}
        size="medium"
        variant="contained"
        color="secondary"
        startIcon={<VideocamIcon />}
        endIcon={<ExpandLessIcon />}
      />
    </Box>
  );
}

export default VideoControlButtons;
