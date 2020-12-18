import React from "react";
import PropTypes from "prop-types";

import { Box, Typography } from "@material-ui/core";

import useStyles from "./styles";

function Empty({ title, subTitle, iconComponent }) {
  const classes = useStyles();

  return (
    <Box className={classes.emptyMessageContainer}>
      {iconComponent}
      {title && <Typography variant="h6">{title}</Typography>}
      {subTitle && <Typography variant="body1">{subTitle}</Typography>}
    </Box>
  );
}

Empty.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
  iconComponent: PropTypes.any,
};

Empty.defaultProps = {
  title: "",
  subTitle: "",
  iconComponent: undefined,
};

export default Empty;
