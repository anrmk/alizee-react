import React from "react";

import { Button, ListItem, ListItemText, Typography } from "@material-ui/core/";

import useStyles from "./styles";

function PublicBundle({ discount, total, duration, onSubscribeClick }) {
  const classes = useStyles();
  return (
    <ListItem disableGutters divider>
      <ListItemText
        className={classes.itemBundleText}
        primary={
          <Typography variant="body1">
            {total}$ ({discount}% off)
          </Typography>
        }
        secondary={
          <Typography variant="caption" component="p" color="textSecondary">
            for {duration} months
          </Typography>
        }
      />
      <Button
        color="primary"
        variant="outlined"
        size="small"
        onClick={onSubscribeClick}>
        Subscribe
      </Button>
    </ListItem>
  );
}

export default PublicBundle;
