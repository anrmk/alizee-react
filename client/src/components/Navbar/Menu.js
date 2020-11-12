import React from "react";
import { useTranslation } from 'react-i18next';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ExitToAppIcon from "@material-ui/icons/ExitToAppOutlined";
import AccountIcon from "@material-ui/icons/AccountCircleOutlined";
import SearchIcon from "@material-ui/icons/SearchOutlined";

import CustomLink from "../CustomLink";
import { PROFILE_ROUTE, SEARCH_ROUTE } from '../../constants/routes';

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

  const handleCloseClick = () => {
    onCloseClick && onCloseClick();
    onClose && onClose();
  };

  return (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={id}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={open}
      onClose={onClose}>
      <CustomLink 
        as={MenuItem}
        to={PROFILE_ROUTE(username)}
        color="inherit"
        onClick={handleCloseClick}>
        <AccountIcon fontSize="small" className="mr-2" />
        {t("ProfileNavMenu")}
      </CustomLink>
      <CustomLink
        as={MenuItem}
        to={SEARCH_ROUTE}
        color="inherit"
        onClick={handleCloseClick}>
        <SearchIcon fontSize="small" className="mr-2" />
        {t("SearchNavMenu")}
      </CustomLink>
      <MenuItem onClick={onLogout}>
        <ExitToAppIcon fontSize="small" className="mr-2" />
        {t("SignOutNavMenu")}
      </MenuItem>
    </Menu>
  );
}
