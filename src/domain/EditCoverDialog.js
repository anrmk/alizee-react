import React from "react";
import { Box } from "@material-ui/core";

function EditCoverDialog({ src, alt }) {
  return (
    <Box display="block">
      <img src={src} alt={alt} width="100%" />
    </Box>
  );
}

export default EditCoverDialog;
