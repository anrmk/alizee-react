import React from "react";
import {
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from "@material-ui/core/";

import CheckCircleIcon from "@material-ui/icons/CheckCircleRounded";

export default function SelectableListItem({
  name,
  userName,
  avatarUrl,
  active,

  onClick,
}) {
  return (
    <ListItem button data-key={userName} onClick={onClick}>
      <ListItemAvatar>
        {active ? (
          <CheckCircleIcon color="primary" fontSize="large" />
        ) : (
          <Avatar src={avatarUrl} />
        )}
      </ListItemAvatar>
      <ListItemText primary={name} secondary={`@${userName}`} />
    </ListItem>
  );
}
