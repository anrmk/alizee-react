import React from "react";

import { Box, Typography } from "@material-ui/core";
import { VerifiedIcon } from "./Icons";

function DisplayName({ name, userName, identityVerified, typographyProps = { variant: "h6" } }) {
  return (
    <Box display="flex" alignItems="center">
      <Typography {...typographyProps} style={{ marginRight: "4px" }}>
        {name ?? "No Name"}
        &nbsp;
        {userName && (
          <Typography variant="caption" color="textSecondary">
            @{userName}
          </Typography>
        )}
      </Typography>
      {identityVerified && <VerifiedIcon fontSize="small" color="primary" />}
    </Box>
  );
}

export default DisplayName;
