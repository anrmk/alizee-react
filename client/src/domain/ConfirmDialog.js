import React from "react";
import { Box, Typography } from "@material-ui/core";

function ConfirmDialog({ contentText, helpText }) {
  return (
    <Box>
      <Typography variant="body1">{contentText}</Typography>
      {helpText && <Typography variant="caption" color="textSecondary">{helpText}</Typography>}
    </Box>
  )
}

export default ConfirmDialog;
