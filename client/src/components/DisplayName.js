import React from "react";

import { Box, Typography } from "@material-ui/core";
import { VerifiedIcon } from "./Icons";

function DisplayName({ name, identityVerified }) {
  return (
    <Box display="flex" alignItems="center">
      <Typography variant="body1" style={{marginRight: "4px"}}>
        {name}
      </Typography>
      {identityVerified && <VerifiedIcon fontSize="small" color="primary" />}
    </Box>
  );
}

export default DisplayName;
