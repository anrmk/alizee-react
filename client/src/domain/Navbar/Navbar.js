import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { Container, Box, AppBar, Toolbar, Tooltip, IconButton, Badge, Hidden } from "@material-ui/core";

import NotificationsIcon from "@material-ui/icons/NotificationsActiveOutlined";
import MailIcon from "@material-ui/icons/MailOutline";
import SearchIcon from "@material-ui/icons/SearchOutlined";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorderOutlined";

import { ACTIVITY_ROUTE, CHAT_ROUTE, SEARCH_ROUTE } from "../../constants/routes";
import Avatar from "../../components/Avatar";

import useStyles from "./styles";

import Menu from "./Menu";

function Navbar({
  username,
  messagesCount,
  notificationsCount,
  avatarUrl,
  open,

  onSignOut,
}) {
  const classes = useStyles(open)();
  const { t } = useTranslation();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);
  const history = useHistory();

  const menuId = "navbar-menu";
  const isMenuOpen = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    onSignOut && onSignOut();
  };

  return (
    <AppBar position="fixed" className={classes.root}>
      <Container>
        <Toolbar className={classes.toolbar}>
          <Box className={classes.logo} ></Box>

          <Box className={classes.grow} />

          <Box className={classes.grow} />

          <Box className={classes.controls}>
            <Hidden smDown>
              <Tooltip title={t("SidebarSearchText")} >
                <IconButton onClick={() => { history.push(SEARCH_ROUTE) }}>
                  <SearchIcon />
                </IconButton>
              </Tooltip>

              <Tooltip title={t("SidebarNotificationText")} >
                <IconButton>
                  <Badge badgeContent={notificationsCount}>
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
              </Tooltip>
            </Hidden>

            <Tooltip title={t("SidebarChatText")} >
              <IconButton onClick={() => { history.push(CHAT_ROUTE("")) }} >
                <Badge badgeContent={messagesCount} color="primary">
                  <MailIcon />
                </Badge>
              </IconButton>
            </Tooltip>

            <IconButton
              ref={anchorEl}
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleMenuOpen}
            >
              <Avatar src={avatarUrl} size="small" borderColor="default" />
            </IconButton>

            <Menu
              id={menuId}
              username={username}
              anchorEl={anchorEl}
              open={isMenuOpen}
              onCloseClick={handleMenuClose}
              onClose={handleMenuClose}
              onLogout={handleSignOut}
            />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
