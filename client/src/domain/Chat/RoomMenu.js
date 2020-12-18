import React from "react";
import PropTypes from "prop-types";

import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { Menu, MenuItem, ListItemIcon, ListItemText, Divider } from "@material-ui/core";

import AccountIcon from "@material-ui/icons/AccountCircleOutlined";
import DeleteIcon from "@material-ui/icons/DeleteOutline";
import RemoveCircleIcon from '@material-ui/icons/RemoveCircleOutline';
import BlockIcon from '@material-ui/icons/BlockOutlined';

import { PROFILE_ROUTE } from "../../constants/routes";

function RoomMenu({
  id,
  userName,

  open,
  anchorEl,

  onClose,
  onMessageClear,
  onRoomDelete,
}) {
  const { t } = useTranslation();
  const history = useHistory();

  return (
    <Menu
      id={id}
      keepMounted
      anchorEl={anchorEl}
      
      anchorOrigin={{ vertical: "top", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={open}
      onClose={onClose}
    >
      <MenuItem onClick={() => history.push(PROFILE_ROUTE(userName))}>
        <ListItemIcon>
          <AccountIcon />
        </ListItemIcon>
        <ListItemText primary={t("ChatRoomMenuItemContactText")} />
      </MenuItem>

      <MenuItem>
        <ListItemIcon>
          <BlockIcon />
        </ListItemIcon>
        <ListItemText primary={t("ChatRoomMenuItemBlockContactText")} />
      </MenuItem>

      <Divider />

      <MenuItem onClick={onMessageClear}>
        <ListItemIcon>
          <RemoveCircleIcon />
        </ListItemIcon>
        <ListItemText primary={t("ChatRoomMenuItemClearText")} />
      </MenuItem>

      <MenuItem onClick={onRoomDelete}>
        <ListItemIcon>
          <DeleteIcon />
        </ListItemIcon>
        <ListItemText primary={t("ChatRoomMenuItemDeleteText")} />
      </MenuItem>
    </Menu>
  );
}

RoomMenu.propTypes = {
  id: PropTypes.string,
  userName: PropTypes.string,

  open: PropTypes.bool,
  anchorEl: PropTypes.any,

  onClose: PropTypes.func,
  onMessageClear: PropTypes.func,
  onRoomDelete: PropTypes.func
}

RoomMenu.defaultProps = { 
  id: "",
  userName: "",

  open: false,
  anchorEl: undefined,

  onClose: undefined,
  onMessageClear: undefined,
  onRoomDelete: undefined,
}


export default RoomMenu;