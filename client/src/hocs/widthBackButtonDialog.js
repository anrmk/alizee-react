import React from "react";
import { Box, IconButton } from "@material-ui/core";

import BackIcon from "@material-ui/icons/ArrowBackRounded";

const widthBackButtonDialog = (props) => WrappedComponent => {
  return (
    <Box display="block">
      {props?.onBackClick && (
        <IconButton onClick={props?.onBackClick}>
          <BackIcon />
        </IconButton>
      )}
      <WrappedComponent {...props} />
    </Box>
  )
}

export default widthBackButtonDialog;
