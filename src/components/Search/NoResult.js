import { Box, Typography } from "@material-ui/core";
import React from "react";

function NoResult() {
  return (
    <Box p={1}>
      <Typography variant="h6" align="center">
        No Result
      </Typography>
      <Typography variant="body2" align="center" color="textSecondary">
        We couldn&apos;t find anything for that search.
      </Typography>
    </Box>
  );
}

export default NoResult;
