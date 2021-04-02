import React, { useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { Container, Box, AppBar, Toolbar, Tooltip, IconButton, Badge, Hidden, Typography } from "@material-ui/core";

import NotificationsIcon from "@material-ui/icons/NotificationsActiveOutlined";
import MailIcon from "@material-ui/icons/MailOutline";
import SearchIcon from "@material-ui/icons/SearchOutlined";
import ArrowBackIcon from "@material-ui/icons/ArrowBackIosOutlined";

import { CHAT_ROUTE, HOME_ROUTE, SEARCH_ROUTE } from "../../constants/routes";
import { USER_RANKING } from "../../constants/user";

import Avatar from "../../components/Avatar";

import useStyles from "./styles";

import Menu from "./Menu";

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
    <AppBar position="fixed" className={classes.root} >
      <Container>
        <Toolbar disableGutters>
          {location.pathname !== HOME_ROUTE && (
            <>
              <Box display="flex" alignItems="center" onClick={() => history.goBack()}>
                <IconButton>
                  <ArrowBackIcon />
                </IconButton>
                <Typography>Back</Typography>
              </Box>
              <Box className={classes.grow} />
            </>
          )}

          <Box className={classes.logo} to={HOME_ROUTE} component={Link}></Box>

          <Box className={classes.grow} />

          <Box display="inline" >
            <Hidden smDown>
              <Tooltip title={t("SidebarSearchText")}>
                <IconButton
                  onClick={() => {
                    history.push(SEARCH_ROUTE);
                  }}
                >
                  <SearchIcon />
                </IconButton>
              </Tooltip>

              <Tooltip title={t("SidebarNotificationText")}>
                <IconButton>
                  <Badge variant="dot" invisible={!newNotification} color="primary">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
              </Tooltip>
            </Hidden>

            <Tooltip title={t("SidebarChatText")}>
              <IconButton onClick={handleMessage}>
                <Badge variant="dot" invisible={!newMessage} color="primary">
                  <MailIcon />
                </Badge>
              </IconButton>
            </Tooltip>

            <IconButton
              ref={anchorEl}
              aria-controls={menuId}
              onClick={handleMenuOpen}
            >
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
      </Container>
    </AppBar>
  );
}

export default Navbar;
