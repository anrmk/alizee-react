import React from "react";
import { Link } from "react-router-dom";
import { ListItem, Typography } from "@material-ui/core";

import Avatar from "../../components/Avatar";
import { STORIES_ROUTE } from "../../constants/routes";
import useStyles from "./styles";

// Not optimized
const PreviewStoryListItem = React.memo(({
  id,
  username,
  name,
  previewUrl,
  avatarUrl,

  onClick
}) => {
  const classes = useStyles({
    previewUrl
  });
  
  const handleItemClick = () => {
    onClick && onClick(id);
  }

  return (
    <ListItem
      button
      className={classes.previewStoryListItem}
      to={previewUrl ? STORIES_ROUTE(username) : "#"}
      component={Link}
      onClick={handleItemClick}>
      <Avatar className={classes.previewStoryListItemAvatar} size="small" src={avatarUrl} />
      <Typography className={classes.previewStoryListItemName} variant="caption" noWrap>{name}</Typography>
    </ListItem>
  )
});

export default PreviewStoryListItem;
