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
  avatarUrl,
  active,
  index,

  onClick
}) {
  return (
    <ListItem button data-key={index} onClick={onClick}>
      <ListItemAvatar>
        {active ? <CheckCircleIcon color="primary" fontSize="large" /> : <Avatar src={avatarUrl} />}
      </ListItemAvatar>
      <ListItemText primary={name} />
    </ListItem>
  );
}
