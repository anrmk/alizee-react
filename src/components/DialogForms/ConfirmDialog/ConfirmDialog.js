import React from "react";
import { Box, Typography } from "@material-ui/core";

function ConfirmDialog({
  contentText,
  helpText,
  textProp = { variant: "caption", color: "textSecondary" },
}) {
  const renderContent = () => contentText;
  return (
    <Box>
      {renderContent()}
      {helpText && <Typography {...textProp}>{helpText}</Typography>}
    </Box>
  );
}

export default ConfirmDialog;
