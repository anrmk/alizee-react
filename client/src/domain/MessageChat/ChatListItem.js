import React from "react";
import clsx from "clsx";
import { Box, Typography, Avatar, ListItem } from "@material-ui/core";

import useStyles from "./styles";

function ChatListItem({ 
  id,
  fullName,
  avatarUrl,
  description,
  date,
  newMessages,
  active,
  
  onClick
}) {
  const classes = useStyles();

  return (
    <ListItem
      button
      key={id}
      className={clsx(classes.chatListItem, active && classes.chatListItemActive)}
      onClick={() => onClick(id)}>
      <Box display="flex" alignItems="center">
        <Avatar src={avatarUrl} className={classes.chatListAvatar} />
        <Box>
          <Typography className={classes.chatListFullName} variant="subtitle1">{fullName}</Typography>
          <Typography className={classes.chatListDescription} variant="caption">{description}</Typography>
        </Box>
      </Box>
      <Box className={classes.chatListEnd}>
        <Typography className={classes.chatListTime} variant="caption">{date}</Typography>
        {newMessages > 0 && <Box className={classes.chatListMessageCount}>{newMessages}</Box>}
      </Box>
    </ListItem>
  )
}

export default ChatListItem;
