import React from "react";

import { ListItemIcon, ListItemText, List, ListItem } from "@material-ui/core";
import BlockIcon from "@material-ui/icons/BlockOutlined";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

import { FOLLOW_NONE } from "../constants/follow_types";

function InteractionUserMenuDialog({
  userName,
  isBlocked,
  followStatus,
  isPrivate,
  subscriptionPrice,
  isFavorite,

  onBlock,
  onUnsubscribe,
  onFavorite,
}) {
  const handleBlockClick = () => {
    onBlock && onBlock({ userName, isBlocked });
  };

  const handleUnsubscribeClick = () => {
    onUnsubscribe &&
      onUnsubscribe({
        followStatus,
        isPrivate,
        subscriptionPrice,
        userName,
      });
  };

  const handleFavoriteUserClick = () => {
    onFavorite && onFavorite({ userName, isFavorite });
  };

  return (
    <List disablePadding>
      {onFavorite && (
        <ListItem
          button
          onClick={handleFavoriteUserClick}
          divider
          disableGutters>
          <ListItemIcon>
            {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </ListItemIcon>
          <ListItemText primary="Add to favorites" />
        </ListItem>
      )}
      {onBlock && (
        <ListItem button onClick={handleBlockClick} divider disableGutters>
          <ListItemIcon>
            <BlockIcon />
          </ListItemIcon>
          <ListItemText
            primary={isBlocked ? "Unblock this user" : "Block this user"}
          />
        </ListItem>
      )}

      {onUnsubscribe && followStatus !== FOLLOW_NONE && (
        <ListItem button onClick={handleUnsubscribeClick} disableGutters>
          <ListItemIcon>
            <DeleteForeverIcon />
          </ListItemIcon>
          <ListItemText primary="Unsubscribe" />
        </ListItem>
      )}
    </List>
  );
}

export default InteractionUserMenuDialog;
