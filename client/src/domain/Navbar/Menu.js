import React from "react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { Menu, MenuItem, ListItemIcon, ListItemText, Divider } from "@material-ui/core";

import ExitToAppIcon from "@material-ui/icons/ExitToAppOutlined";
import AccountIcon from "@material-ui/icons/AccountCircleOutlined";
import SettingsIcon from "@material-ui/icons/Settings";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorderOutlined";

import { PROFILE_USERNAME_ROUTE, SEARCH_ROUTE, SETTINGS_EDIT_PROFILE_ROUTE } from "../../constants/routes";

export default function NavMenu({
  id,
  username,
  open,
  anchorEl,

  onClose,
  onLogout,
}) {
  const { t } = useTranslation();
  const history = useHistory();

  const handleMenuItemClick = (url) => {
    history.push(url);
    onClose && onClose();
  }

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
      <MenuItem onClick={() => handleMenuItemClick(PROFILE_USERNAME_ROUTE(username))}>
        <ListItemIcon>
          <AccountIcon />
        </ListItemIcon>
        <ListItemText primary={t("NavbarMenuItemProfileText")} />
      </MenuItem>

      <MenuItem onClick={() => handleMenuItemClick(SEARCH_ROUTE)}>
        <ListItemIcon>
          <BookmarkBorderIcon />
        </ListItemIcon>
        <ListItemText primary={t("NavbarMenuItemPostSavedText")} />
      </MenuItem>

      <MenuItem onClick={() => handleMenuItemClick(SETTINGS_EDIT_PROFILE_ROUTE)}>
        <ListItemIcon>
          <SettingsIcon />
        </ListItemIcon>
        <ListItemText primary={t("NavbarMenuItemSettingsText")} />
      </MenuItem>

      <Divider />

      <MenuItem onClick={onLogout}>
        <ListItemIcon>
          <ExitToAppIcon />
        </ListItemIcon>
        <ListItemText primary={t("NavbarMenuItemSignOutText")} />
      </MenuItem>
    </Menu>
  );
}
