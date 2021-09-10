import React from "react";

import { Button, ListItem, ListItemText, Typography } from "@material-ui/core/";

import { calcDiscount } from "../../helpers/functions";

import useStyles from "./styles";

function BundleItem({
  isProfile = false,

  discount,
  duration,
  price,
  id,
  disabled,
  selected,

  onDelete,
}) {
  const classes = useStyles();

  const subscriptionPrice = calcDiscount(price, discount, duration);

  return (
    <ListItem className={classes.item} disabled={disabled} selected={selected}>
      <ListItemText
        className={classes.itemBundleText}
        primary={
          <Typography variant="body1">
            {subscriptionPrice}$ ({discount}% off)
          </Typography>
        }
        secondary={
          <Typography variant="caption" component="p" color="textSecondary">
            for {duration} months
          </Typography>
        }
      />
      {!isProfile && (
        <Button
          disabled={disabled}
          onClick={() => onDelete(id)}
          variant="contained"
          color="primary">
          Delete
        </Button>
      )}
    </ListItem>
  );
}

export default BundleItem;
