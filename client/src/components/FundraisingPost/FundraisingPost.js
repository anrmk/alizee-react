import React from "react";

import EmojiEventsIcon from "@material-ui/icons/EmojiEvents";

import { Box, Typography, LinearProgress } from "@material-ui/core";

import useStyles from "./styles";

function FundraisingPost({ fundraising = 0, targetFunds = 0, positionDirection = "bottom" }) {
  const classes = useStyles();

  const findPercent = () => {
    const result = (fundraising / targetFunds) * 100;
    return Math.floor(result);
  };

  return (
    <Box className={classes.root} {...{ [positionDirection]: 0 }}>
      <EmojiEventsIcon color="secondary" fontSize="small" />
      <LinearProgress variant="determinate" color="secondary" value={findPercent()} className={classes.progressBar} />
      <Box position="absolute" lineHeight="16px" fontSize={12} component="span">
        {"$" + fundraising}
      </Box>
      <Typography variant="body2" color="textPrimary" align="right" className={classes.targetFunds}>
        {"$" + targetFunds}
      </Typography>
    </Box>
  );
}

export default FundraisingPost;
