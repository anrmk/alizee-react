import React from "react";
import { useHistory } from "react-router-dom";

import i18n from "i18next";
import { useTranslation } from "react-i18next";

import { Menu, MenuItem, ListItemIcon, ListItemText, Divider } from "@material-ui/core";
import useTheme from "@material-ui/core/styles/useTheme";

import ExitToAppIcon from "@material-ui/icons/ExitToAppOutlined";
import AccountIcon from "@material-ui/icons/AccountCircleOutlined";
import SettingsIcon from "@material-ui/icons/Settings";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorderOutlined";
import HelpIcon from "@material-ui/icons/ContactSupportOutlined";
import NightIcon from "@material-ui/icons/NightsStayOutlined";
import SunnyIcon from "@material-ui/icons/WbSunnyOutlined";
import LanguageIcon from "@material-ui/icons/LanguageOutlined";
import AnnouncementIcon from "@material-ui/icons/AnnouncementOutlined";

import {
  HELP_ROUTE,
  CHANGE_LOG_ROUTE,
  PROFILE_USERNAME_ROUTE,
  SEARCH_ROUTE,
  SETTINGS_EDIT_PROFILE_ROUTE,
} from "../../constants/routes";

import useChangeTheme from "../../hooks/useChangeTheme";
import useLanguageDialog from "../../hooks/useLanguageDialog";

export default function NavMenu({
  id,
  userName,
  open,
  anchorEl,

  onClose,
  onLogout,
}) {
  const { t } = useTranslation();
  const theme = useTheme();
  const changeTheme = useChangeTheme();
  const langDialog = useLanguageDialog();

  const history = useHistory();

  const handleMenuItemClick = (url) => {
    history.push(url);
    onClose && onClose();
  };

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
      <MenuItem onClick={() => handleMenuItemClick(PROFILE_USERNAME_ROUTE(userName))}>
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

      <MenuItem onClick={() => handleMenuItemClick(HELP_ROUTE)}>
        <ListItemIcon>
          <HelpIcon />
        </ListItemIcon>
        <ListItemText primary={t("NavbarMenuItemHelpText")} />
      </MenuItem>

      <MenuItem onClick={() => handleMenuItemClick(CHANGE_LOG_ROUTE)}>
        <ListItemIcon>
          <AnnouncementIcon />
        </ListItemIcon>
        <ListItemText primary={t("NavbarMenuItemChangeLogText")} />
      </MenuItem>

      <MenuItem onClick={changeTheme.toggle}>
        <ListItemIcon>{theme.palette.type === "light" ? <NightIcon /> : <SunnyIcon />}</ListItemIcon>
        <ListItemText
          primary={theme.palette.type === "light" ? t("NavbarMenuItemDarkMode") : t("NavbarMenuItemLightMode")}
        />
      </MenuItem>

      <MenuItem onClick={langDialog.toggle}>
        <ListItemIcon>
          <LanguageIcon />
        </ListItemIcon>
        <ListItemText primary={t(i18n.language)} />
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
