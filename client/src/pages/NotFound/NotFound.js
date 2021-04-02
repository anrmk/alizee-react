import React from "react";
import { Link } from "react-router-dom";

import { Box, Typography } from "@material-ui/core";

import { HOME_ROUTE } from "../../constants/routes";

export default function NotFound() {
  return (
    <Box textAlign="center">
      <Typography variant="h4" gutterBottom>Sorry, this page isn't available.</Typography>
      <Typography variant="body1" color="textSecondary">
        The link you followed may be broken, or the page may have been removed. <Link to={HOME_ROUTE}>Go back to home.</Link>
      </Typography>
    </Box>
  );
}
