import React, { useCallback } from "react";

import { Box, Typography, LinearProgress, Button } from "@material-ui/core";

import useStyles from "./styles";

function FundraisingPost({
  targetProgress = 0,
  amount = 0,
  onSendDonate,
  user,
  id,
  isOwner,
}) {
  const classes = useStyles();

  const handleSendDonateClick = useCallback(() => {
    onSendDonate && onSendDonate({ ...user, id }, true);
  }, [user]);

  const findPercent = () => {
    if (targetProgress > amount) {
      return 100;
    }
    const result = (targetProgress / amount) * 100;
    return Math.floor(result);
  };

  return (
    <Box className={classes.root} width="100%">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box width="100%" position="relative" mr={1}>
          <LinearProgress
            variant="determinate"
            color="primary"
            value={findPercent()}
            className={classes.progressBar}
          />
          <Typography
            variant="body2"
            color="textPrimary"
            align="right"
            className={classes.targetFunds}>
            {`$${amount}`}
          </Typography>
          <Box position="absolute" left="10px" top="4px">
            {`$${targetProgress}`}
          </Box>
        </Box>
        {!isOwner && (
          <Button
            label="Donate"
            color="primary"
            variant="contained"
            size="small"
            onClick={handleSendDonateClick}>
            Donate
          </Button>
        )}
      </Box>
    </Box>
  );
}

export default FundraisingPost;
