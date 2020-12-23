import React from "react";
import { Link } from "react-router-dom";
import { ListItem, Typography } from "@material-ui/core";

import Avatar from "../../components/Avatar";
import { STORIES_ROUTE } from "../../constants/routes";
import useStyles from "./styles";

export default function PreviewStoryListItem({
  id,
  userId,
  name,
  previewUrl,
  avatarUrl,

  onClick
}) {
  const classes = useStyles({
    previewUrl
  });
  
  const handleItemClick = (_id) => {
    onClick && onClick(_id);
  }

  return (
    <ListItem
      button
      className={classes.previewStoryListItem}
      to={STORIES_ROUTE(userId)}
      component={Link}
      onClick={() => handleItemClick(id)}>
      <Avatar className={classes.previewStoryListItemAvatar} size="small" src={avatarUrl} />
      <Typography variant="caption" noWrap>{name}</Typography>
    </ListItem>
  )
};
