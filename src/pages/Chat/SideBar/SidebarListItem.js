import React from "react";
import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@material-ui/core";

import Avatar from "../../../components/Avatar";
import { formatDate } from "../../../helpers/functions";
import DisplayName from "../../../components/DisplayName";

import useStyles, { StyledBadge } from "../styles";

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
          <DisplayName
            typographyProps={{ variant: "body1", color: "textPrimary" }}
            name={item.name}
            identityVerified={item.identityVerified}
            noWrap={false}
            alignItems="flex-start"
          />
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
