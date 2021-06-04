import React, { useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { Grid, Box, AppBar, Toolbar, IconButton, Badge, Hidden, Typography, Switch } from "@material-ui/core";

import NotificationsIcon from "@material-ui/icons/NotificationsActiveOutlined";
import MailIcon from "@material-ui/icons/MailOutline";
import SearchIcon from "@material-ui/icons/SearchOutlined";
import ArrowBackIcon from "@material-ui/icons/ArrowBackIosOutlined";
import NightIcon from "@material-ui/icons/NightsStayOutlined";
import SunnyIcon from "@material-ui/icons/WbSunnyOutlined";

import { CHAT_ROUTE, HOME_ROUTE, SEARCH_ROUTE } from "../../constants/routes";
import { USER_RANKING } from "../../constants/user";
import Avatar from "../../components/Avatar";
import Menu from "./Menu";

import useChangeTheme from "../../hooks/useChangeTheme";
import useStyles from "./styles";

function Navbar({
  userName,
  ranking,
  newMessage,
  newNotification,
  avatarUrl,
  open,

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

  return (
    <AppBar position="sticky" className={classes.root}>
      <Grid container>
        <Hidden smDown>
          <Grid container item md={3} lg={2} alignItems="center" justify="flex-end" component="label">
            <Grid item>
              <NightIcon />
            </Grid>
            <Grid item>
              <Switch
                name="gilad"
                checked={changeTheme.currentTheme === "light"}
                color="primary"
                onChange={() => changeTheme.toggle()}
              />
            </Grid>
            <Grid item>
              <SunnyIcon />
            </Grid>
          </Grid>
        </Hidden>
        <Grid item xs={12} md={9} lg={10}>
          <Toolbar disableGutters>
            {location.pathname !== HOME_ROUTE && (
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

            {location.pathname !== HOME_ROUTE && <Box className={classes.logo} to={HOME_ROUTE} component={Link}></Box>}

            <Box className={classes.grow} />

            <Box display="inline">
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
          </Toolbar>
        </Grid>
      </Grid>
    </AppBar>
  );
}

export default Navbar;
