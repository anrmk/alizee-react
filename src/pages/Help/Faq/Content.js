import React from "react";

import { Box, Typography, Hidden } from "@material-ui/core";

import FaqList from "./FaqList";

import useStyles from "../styles";

const Content = ({ data = [] }) => {
  const classes = useStyles();

  return (
    <Box className={classes.contentWrapper}>
      <Box className={classes.content} />
      <Box className={classes.contentItem}>
        <Box marginBottom={6}>
          <Typography variant="h3">Looking for help?</Typography>
        </Box>
        <Box>
          <Typography variant="body1">
            Explore our Help Center to get immediate assistance.
          </Typography>
        </Box>
      </Box>
      <Hidden xsDown>
        <Box>
          <FaqList data={data} />
        </Box>
      </Hidden>
    </Box>
  );
};

export default Content;
