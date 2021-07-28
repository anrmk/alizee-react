import React from "react";

import { Box, Typography } from "@material-ui/core";
import { VerifiedIcon } from "./Icons";

function DisplayName({
  name,
  userName,
  identityVerified,
  noWrap = true,
  alignItems = "center",
  typographyProps = { variant: "h6" },
}) {
  return (
    <>
      {noWrap ? (
        <Box display="flex" alignItems="center">
          <Typography {...typographyProps} style={{ marginRight: "4px" }}>
            {name ?? "No Name"}
            &nbsp;
            {identityVerified && (
              <VerifiedIcon
                fontSize="small"
                color="primary"
                style={{ verticalAlign: "middle" }}
              />
            )}
          </Typography>
          {userName && (
            <Typography variant="caption" color="textSecondary" noWrap>
              @{userName}
            </Typography>
          )}
        </Box>
      ) : (
        <Box display="flex" alignItems={alignItems} flexDirection="column">
          <Typography {...typographyProps} noWrap component={Box} width="100%">
            {name ?? "No Name"}
            &nbsp;
            {identityVerified && (
              <VerifiedIcon
                fontSize="small"
                color="primary"
                style={{ verticalAlign: "middle" }}
              />
            )}
          </Typography>
          {userName && (
            <Typography
              variant="caption"
              color="textSecondary"
              noWrap
              component={Box}
              width="100%">
              @{userName}
            </Typography>
          )}
        </Box>
      )}
    </>
  );
}

export default DisplayName;
