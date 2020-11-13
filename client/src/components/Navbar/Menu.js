import React from "react";
import { useHistory } from "react-router-dom";
import { useTranslation } from 'react-i18next';

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import ExitToAppIcon from "@material-ui/icons/ExitToAppOutlined";
import AccountIcon from "@material-ui/icons/AccountCircleOutlined";
import SearchIcon from "@material-ui/icons/SearchOutlined";

import { PROFILE_ROUTE, SEARCH_ROUTE } from "../../constants/routes";

export default function NavMenu({
  id,
  username,
  open,
  anchorEl,

  onCloseClick,
  onClose,
  onLogout
}) {
  const { t } = useTranslation();
  const history = useHistory();

  const handleCloseClick = () => {
    onCloseClick && onCloseClick();
    onClose && onClose();
  };

  return (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={id}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={open}
      onClose={onClose}
    >
      <MenuItem onClick={() => history.push(PROFILE_ROUTE(username))}>
        <AccountIcon fontSize="small" /> 
        {t("ProfileNavMenu")}
      </MenuItem>

      <MenuItem onClick={() => history.push(SEARCH_ROUTE)}>
        <SearchIcon fontSize="small" /> 
        {t("SearchNavMenu")}
      </MenuItem>

      <MenuItem onClick={onLogout}>
        <ExitToAppIcon fontSize="small" /> 
        {t("SignOutNavMenu")}
      </MenuItem> 
    </Menu>
  );
}


{/* return (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={id}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={open}
      onClose={onClose}
    >
      <MenuItem onClick={() => history.push(PROFILE_ROUTE(username))}>
        <AccountIcon fontSize="small" /> 
        {t("ProfileNavMenu")}
      </MenuItem>

      <MenuItem onClick={() => history.push(SEARCH_ROUTE)}>
        <SearchIcon fontSize="small" /> 
        {t("SearchNavMenu")}
      </MenuItem>

      <MenuItem onClick={onLogout}>
        <ExitToAppIcon fontSize="small" /> 
        {t("SignOutNavMenu")}
      </MenuItem> */}