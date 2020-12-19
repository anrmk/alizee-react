import React from "react";
import PropTypes from "prop-types";

import { formatDate } from "../../helpers/functions";

import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Badge,
  IconButton,
  Typography,
} from "@material-ui/core";
import MailIcon from "@material-ui/icons/MailOutlineOutlined";

import Avatar from "../../components/Avatar";

function SidebarListItem({
  id,
  fullName,
  avatarUrl,
  description,
  showActivity,
  offlineDate,
  newMessages,
  selected,

  onItemClick,
  onActionClick,
}) {
  const handleItemClick = (e) => {
    e.preventDefault();
    onItemClick && onItemClick(id);
  };

  const handleActionClick = (e) => {
    e.preventDefault();
    onActionClick && onActionClick(id);
  };

  const renderActionButtons = () => {
    return newMessages > 0 ? (
      <IconButton edge="start" aria-label="new messages" onClick={handleActionClick}>
        <Badge color="primary" badgeContent={newMessages}>
          <MailIcon />
        </Badge>
      </IconButton>
    ) : (
      <Typography variant="caption">{showActivity && offlineDate && formatDate(offlineDate)}</Typography>
    );
  };

  return (
    <ListItem button key={id} selected={selected} onClick={handleItemClick}>
      <ListItemAvatar>
        <Avatar src={avatarUrl} online={showActivity && !offlineDate} />
      </ListItemAvatar>

      <ListItemText primary={fullName} secondary={description}></ListItemText>
      <ListItemSecondaryAction>{renderActionButtons()}</ListItemSecondaryAction>
    </ListItem>
  );
}

SidebarListItem.propTypes = {
  id: PropTypes.string,
  fullName: PropTypes.string,
  avatarUrl: PropTypes.string,
  description: PropTypes.string,
  showActivity: PropTypes.bool,
  offlineDate: PropTypes.string,
  newMessages: PropTypes.number,
  selected: PropTypes.bool,

  onItemClick: PropTypes.func,
  onActionClick: PropTypes.func,
};

SidebarListItem.defaultProps = {
  id: "",
  fullName: "",
  avatarUrl: "",
  description: "",
  showActivity: false,
  offlineDate: null,

  newMessages: 0,
  selected: false,

  onItemClick: undefined,
  onActionClick: undefined,
};

export default SidebarListItem;
