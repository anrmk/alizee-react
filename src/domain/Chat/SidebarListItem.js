import React from "react";
import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@material-ui/core";

import Avatar from "../../components/Avatar";
import { formatDate } from "../../helpers/functions";

import useStyles, { StyledBadge } from "./styles";

function SidebarListItem({
  item,
  selected,

  onItemClick,
}) {
  const classes = useStyles();

  const handleItemClick = (e) => {
    e.preventDefault();
    onItemClick && onItemClick(item.userName);
  };

  return (
    <ListItem button selected={selected} onClick={handleItemClick}>
      <ListItemAvatar>
        <Avatar
          src={item.avatarUrl}
          online={item.showActivity && !item.offlineDate}
        />
      </ListItemAvatar>

      <ListItemText
        className={classes.sidebarListItemText}
        primary={
          <Typography noWrap variant="body1" color="textPrimary">
            {item.name}
          </Typography>
        }
        secondary={
          <Typography noWrap variant="body2" color="textPrimary">
            {item.lastMessageText}
          </Typography>
        }
      />

      <StyledBadge color="primary" badgeContent={item.unreadMessageCount}>
        <Typography noWrap variant="caption" color="textSecondary">
          {formatDate(item.lastMessageDate, {
            timeOffset: 24,
            showSubText: false,
          })}
        </Typography>
      </StyledBadge>
    </ListItem>
  );
}

export default SidebarListItem;
