import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

import { Grid, AppBar, Toolbar, IconButton, Badge, Button } from "@material-ui/core";

import NotificationsIcon from "@material-ui/icons/NotificationsActiveOutlined";
import MailIcon from "@material-ui/icons/MailOutline";
import ArrowBackIcon from "@material-ui/icons/ArrowBackIosOutlined";

import {
  CHAT_ROUTE,
  HOME_ROUTE,
  SIGN_IN_ROUTE,
  SIGN_UP_ROUTE,
  HELP_ROUTE,
  CHANGE_LOG_ROUTE,
  NOTIFICATION_ROUTE_ALL,
} from "../../constants/routes";
import Avatar from "../../components/Avatar";
import Logo from "../../components/Logo";
import Menu from "./Menu";

import useStyles from "./styles";

function Navbar({
  userName,
  avatarUrl,
  isAuthenticated,

  newMessage,
  newNotification,
  open,

  onChange,
  onSignOut,
}) {
  const classes = useStyles(open)();
  const [anchorEl, setAnchorEl] = useState(null);
  const history = useHistory();
  const location = useLocation();

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

  const handleMessage = () => {
    onChange && onChange({ newMessage: false });
    history.push(CHAT_ROUTE(""));
  };

  const handleChangeRoute = (route) => {
    history.push(route);
  };

  return (
    <AppBar position="sticky" className={classes.root}>
      <Grid container justify="space-between" alignItems="center">
        {isAuthenticated &&
          location.pathname !== HOME_ROUTE &&
          location.pathname !== HELP_ROUTE &&
          location.pathname !== CHANGE_LOG_ROUTE && (
            <Grid item>
              <Toolbar>
                <Button startIcon={<ArrowBackIcon />} onClick={() => history.goBack()}>
                  Back
                </Button>
              </Toolbar>
            </Grid>
          )}

        {!isAuthenticated && (
          <Grid item>
            <Logo />
          </Grid>
        )}

        <Grid item></Grid>

        <Grid item>
          <Toolbar disableGutters>
            {isAuthenticated ? (
              <>
                <IconButton onClick={() => history.push(NOTIFICATION_ROUTE_ALL)}>
                  <Badge variant="dot" invisible={!newNotification} color="primary">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>

                <IconButton onClick={handleMessage}>
                  <Badge variant="dot" invisible={!newMessage} color="primary">
                    <MailIcon />
                  </Badge>
                </IconButton>

                <IconButton ref={anchorEl} aria-controls={menuId} onClick={handleMenuOpen}>
                  <Avatar src={avatarUrl} size="small" />
                </IconButton>

                <Menu
                  id={menuId}
                  userName={userName}
                  anchorEl={anchorEl}
                  open={isMenuOpen}
                  onCloseClick={handleMenuClose}
                  onClose={handleMenuClose}
                  onLogout={handleSignOut}
                />
              </>
            ) : (
              <>
                <Button
                  color="secondary"
                  variant="outlined"
                  size="small"
                  onClick={() => handleChangeRoute(SIGN_UP_ROUTE)}
                >
                  Sign Up
                </Button>
                &nbsp;
                <Button
                  color="primary"
                  variant="outlined"
                  size="small"
                  onClick={() => handleChangeRoute(SIGN_IN_ROUTE)}
                >
                  Log in
                </Button>
              </>
            )}
          </Toolbar>
        </Grid>
      </Grid>
    </AppBar>
  );
}

export default Navbar;
