import React from "react";

import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from "@material-ui/core";

import { calcDiscount } from "../../helpers/functions";

import useStyles from "./styles";

function Bundle({
  isOwner,
  duration,
  discount,
  price,
  id,

  onDelete,
}) {
  const classes = useStyles();

  return (
    <>
      {isOwner ? (
        <ListItem disabled={price < 0.1} dense disableGutters>
          <ListItemAvatar>
            <Avatar variant="circular" className={classes.avatar}>
              {discount}%
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={`$${calcDiscount(price, discount, duration)} USD`}
            secondary={`total for ${duration} months`}
          />
          <ListItemSecondaryAction onClick={() => onDelete({ id })}>
            <IconButton edge="end" aria-label="delete">
              <DeleteForeverIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ) : (
        ""
      )}
    </>
  );
}

export default Bundle;
