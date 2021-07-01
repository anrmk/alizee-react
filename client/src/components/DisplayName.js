import React from "react";

import { Box, Typography } from "@material-ui/core";
import { VerifiedIcon } from "./Icons";

function DisplayName({ name, userName, identityVerified, noWrap = true, typographyProps = { variant: "h6" } }) {
  return (
    <Box display="flex" alignItems="center" flexDirection={noWrap ? "row" : "column"}>
      <Typography {...typographyProps} style={noWrap ? { marginRight: "4px" } : null}>
        {name ?? "No Name"}
        &nbsp;
        {identityVerified && <VerifiedIcon fontSize="small" color="primary" style={{ verticalAlign: "middle" }} />}
      </Typography>
      {userName && (
        <Typography variant="caption" color="textSecondary">
          @{userName}
        </Typography>
      )}
    </Box>
  );
}

export default DisplayName;
