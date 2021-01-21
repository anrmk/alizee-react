import React from "react";
import PropTypes from "prop-types";

import { ListItem, ListItemAvatar, ListItemText, Badge, IconButton, Typography } from "@material-ui/core";
import MailIcon from "@material-ui/icons/MailOutlineOutlined";

import Avatar from "../../components/Avatar";
import useStyles from "./styles";

function SidebarListItem({
  id,
  userName,
  fullName,
  avatarUrl,
  description,
  showActivity,
  offlineDate,
  newMessages,
  selected,

  onItemClick,
}) {
  const classes = useStyles();

  const handleItemClick = () => {
    onItemClick && onItemClick(userName);
  };

  return (
    <ListItem button key={id} selected={selected} onClick={handleItemClick}>
      <ListItemAvatar>
        <Avatar src={avatarUrl} online={showActivity && !offlineDate} />
      </ListItemAvatar>

      <ListItemText
        className={classes.sidebarListItemText}
        primary={fullName}
        secondary={
          <Typography noWrap variant="body2" color="textPrimary">
            {description}
          </Typography>
        }
      />
      {newMessages > 0 && (
        <Badge color="primary" badgeContent={newMessages}>
          <MailIcon />
        </Badge>
      )}
    </ListItem>
  );
}

SidebarListItem.propTypes = {
  id: PropTypes.string,
  fullName: PropTypes.string,
  userName: PropTypes.string,
  avatarUrl: PropTypes.string,
  description: PropTypes.string,
  showActivity: PropTypes.bool,
  offlineDate: PropTypes.string,
  newMessages: PropTypes.number,
  selected: PropTypes.bool,

  onItemClick: PropTypes.func,
};

SidebarListItem.defaultProps = {
  id: "",
  fullName: "",
  userName: "",
  avatarUrl: "",
  description: "",
  showActivity: false,
  offlineDate: null,

  newMessages: 0,
  selected: false,

  onItemClick: undefined,
};

export default SidebarListItem;
