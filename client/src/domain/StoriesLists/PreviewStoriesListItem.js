import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import { Box, ListItem, Typography } from "@material-ui/core";

import AddIcon from "@material-ui/icons/AddRounded";

import Avatar from "../../components/Avatar";
import { STORIES_ROUTE } from "../../constants/routes";
import useStyles from "./styles";

const PreviewStoryListItem = React.memo(({
  id,
  username,
  name,
  previewUrl,
  avatarUrl,
  empty = false,

  onClick
}) => {
  const classes = useStyles({
    previewUrl,
    empty
  });
  const additionalProps = empty ? { } : { to: previewUrl ? STORIES_ROUTE(username) : "#", component: Link };
  
  const handleItemClick = useCallback(() => {
    onClick && onClick(id);
  }, []);

  return (
    <ListItem
      button
      className={classes.previewStoryListItem}
      {...additionalProps}
      onClick={handleItemClick}> 
      {empty ? (
        <AddIcon className={classes.previewStoryListItemAddButton} />
      ) : (
        <Box className={classes.previewStoryItemUserInfo}>
          <Avatar className={classes.previewStoryListItemAvatar} size="small" src={avatarUrl} /> 
          <Typography className={classes.previewStoryListItemName} variant="caption" noWrap>{name}</Typography>
        </Box>
      )}
    </ListItem>
  )
});

export default PreviewStoryListItem;
