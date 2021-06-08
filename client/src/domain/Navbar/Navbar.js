import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

import {
  Grid,
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Hidden,
  Typography,
  Switch,
  Button,
  Link,
} from "@material-ui/core";

import NotificationsIcon from "@material-ui/icons/NotificationsActiveOutlined";
import MailIcon from "@material-ui/icons/MailOutline";
import SearchIcon from "@material-ui/icons/SearchOutlined";
import ArrowBackIcon from "@material-ui/icons/ArrowBackIosOutlined";
import NightIcon from "@material-ui/icons/NightsStayOutlined";
import SunnyIcon from "@material-ui/icons/WbSunnyOutlined";

import {
  CHAT_ROUTE,
  HOME_ROUTE,
  SEARCH_ROUTE,
  SIGN_IN_ROUTE,
  SIGN_UP_ROUTE,
  HELP_ROUTE,
  CHANGE_LOG_ROUTE,
} from "../../constants/routes";
import { USER_RANKING } from "../../constants/user";
import Avatar from "../../components/Avatar";
import Menu from "./Menu";
import Logo from "../../components/Logo";

import useChangeTheme from "../../hooks/useChangeTheme";
import useStyles from "./styles";

function Navbar({
  userName,
  ranking,
  newMessage,
  newNotification,
  avatarUrl,
  open,
  isAuthenticated,
  showNotification,

  onChange,
  onSignOut,
}) {
  const classes = useStyles(open)();
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const history = useHistory();
  const location = useLocation();
  const changeTheme = useChangeTheme();

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
        <Grid
          item
          xs={location.pathname === CHANGE_LOG_ROUTE || location.pathname === HELP_ROUTE ? false : 4}
          sm={4}
          lg={6}
        >
          <Toolbar disableGutters component={Box} justifyContent="center">
            {location.pathname !== HOME_ROUTE &&
              location.pathname !== HELP_ROUTE &&
              location.pathname !== CHANGE_LOG_ROUTE && (
                <>
                  <Box className={classes.backBtn} onClick={() => history.goBack()}>
                    <IconButton>
                      <ArrowBackIcon />
                    </IconButton>
                    <Typography>Back</Typography>
                  </Box>
                  <Box className={classes.grow} />
                </>
              )}

            {isAuthenticated && (location.pathname === CHANGE_LOG_ROUTE || location.pathname === HELP_ROUTE) && (
              <Logo />
            )}
          </Toolbar>
        </Grid>
        <Grid
          item
          xs={location.pathname === CHANGE_LOG_ROUTE || location.pathname === HELP_ROUTE ? 12 : 8}
          sm={8}
          lg={6}
        >
          <Toolbar component={Box} justifyContent="flex-end">
            {isAuthenticated ? (
              <Box display="inline">
                {showNotification && (
                  <Hidden smDown>
                    <IconButton
                      onClick={() => {
                        history.push(SEARCH_ROUTE);
                      }}
                    >
                      <SearchIcon />
                    </IconButton>

                    <IconButton>
                      <Badge variant="dot" invisible={!newNotification} color="primary">
                        <NotificationsIcon />
                      </Badge>
                    </IconButton>
                  </Hidden>
                )}

                <IconButton onClick={handleMessage}>
                  <Badge variant="dot" invisible={!newMessage} color="primary">
                    <MailIcon />
                  </Badge>
                </IconButton>

                <IconButton ref={anchorEl} aria-controls={menuId} onClick={handleMenuOpen}>
                  <Avatar src={avatarUrl} size="small" borderColor={USER_RANKING[ranking]} />
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
              </Box>
            ) : (
              <>
                <Button
                  color="primary"
                  variant="outlined"
                  size="small"
                  component={Link}
                  onClick={() => handleChangeRoute(SIGN_UP_ROUTE)}
                >
                  Sign Up
                </Button>

                <Button
                  color="primary"
                  variant="outlined"
                  size="small"
                  component={Link}
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
