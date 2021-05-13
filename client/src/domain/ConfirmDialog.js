import React from "react";
import { Box, Typography } from "@material-ui/core";

function ConfirmDialog({ contentText, helpText }) {
  return (
    <Box>
      {contentText}
      {helpText && <Typography variant="caption" color="textSecondary">{helpText}</Typography>}
    </Box>
  )
}

export default ConfirmDialog;
