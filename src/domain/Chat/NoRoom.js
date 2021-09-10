import React from "react";
import { Box, Typography, Button } from "@material-ui/core";

function NoRoom({ onClick }) {
  return (
    <Box
      width="100%"
      height="100%"
      display="flex"
      textAlign="center"
      alignItems="center"
      justifyItems="center">
      <Box width="100%">
        <Typography variant="h5">
          Select any Conversation or send a New Message
        </Typography>
        <Button
          color="primary"
          variant="contained"
          disableElevation
          onClick={onClick}>
          New Message
        </Button>
      </Box>
    </Box>
  );
}

export default NoRoom;
