import React from "react";

import { Typography } from "@material-ui/core";

function Error({ errorText }) {
  return (
    <Typography variant="h6" color="error" align="center">
      {errorText}
    </Typography>
  );
}

export default Error;
