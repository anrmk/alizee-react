import React from "react";
import { Box, Typography } from "@material-ui/core";

function ConfirmDialog({ contentText, helpText }) {
  const renderContent = () => {
    if (typeof contentText === "string") {
      return contentText;
    }

    return contentText;
  };
  return (
    <Box>
      {renderContent()}
      {helpText && (
        <Typography variant="caption" color="textSecondary">
          {helpText}
        </Typography>
      )}
    </Box>
  );
}

export default ConfirmDialog;
