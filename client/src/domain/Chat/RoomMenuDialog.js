import React from "react";

import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { List, ListItem, ListItemIcon, ListItemText, Divider } from "@material-ui/core";

import AccountIcon from "@material-ui/icons/AccountCircleOutlined";
import DeleteIcon from "@material-ui/icons/DeleteOutline";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircleOutline";
import BlockIcon from "@material-ui/icons/BlockOutlined";

import { PROFILE_USERNAME_ROUTE } from "../../constants/routes";

function RoomMenuDialog({
  postId,
  userName,

  onBlockClick,
  onDeleteClick,
  onClearClick,
}) {
  const { t } = useTranslation();
  const history = useHistory();

  const handleBlockClick = () => {
    onBlockClick && onBlockClick({ postId, userName });
  };

  const handleClearClick = () => {
    onClearClick && onClearClick(postId);
  };

  const handleDeleteClick = () => {
    onDeleteClick && onDeleteClick(postId);
  };

  return (
    <List component="nav">
      <ListItem button onClick={handleBlockClick}>
        <ListItemIcon>
          <BlockIcon />
        </ListItemIcon>
        <ListItemText primary={t("ChatRoomMenuItemAddAccountToBlackListText")} />
      </ListItem>

      <Divider />

      <ListItem button onClick={handleClearClick}>
        <ListItemIcon>
          <RemoveCircleIcon />
        </ListItemIcon>
        <ListItemText primary={t("ChatRoomMenuItemClearText")} />
      </ListItem>

      <ListItem button onClick={handleDeleteClick}>
        <ListItemIcon>
          <DeleteIcon />
        </ListItemIcon>
        <ListItemText primary={t("ChatRoomMenuItemDeleteText")} color="secondary" />
      </ListItem>
    </List>
  );
}

export default RoomMenuDialog;
