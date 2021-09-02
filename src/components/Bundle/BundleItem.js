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
  user,
  disabled,

  onSubscribeClick,
  onDelete,
}) {
  const classes = useStyles();

  const subscriptionPrice = calcDiscount(price, discount, duration);

  return (
    <ListItem className={classes.item} disabled={disabled}>
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
      {isProfile ? (
        <Button
          color="primary"
          variant="contained"
          size="small"
          onClick={(e) => {
            onSubscribeClick(e, { ...user, bundleId: id, subscriptionPrice });
          }}>
          Subscribe
        </Button>
      ) : (
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
