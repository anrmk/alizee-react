import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { Container, Box, AppBar, Toolbar, Tooltip, IconButton, Badge, Hidden } from "@material-ui/core";

import NotificationsIcon from "@material-ui/icons/NotificationsActiveOutlined";
import MailIcon from "@material-ui/icons/MailOutline";
import SearchIcon from "@material-ui/icons/SearchOutlined";

import { CHAT_ROUTE, SEARCH_ROUTE } from "../../constants/routes";
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
    onChange && onChange({newMessage: false})
    history.push(CHAT_ROUTE(""));
  }

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
                  <Badge variant="dot" invisible={!newNotification} color="primary">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
              </Tooltip>
            </Hidden>

            <Tooltip title={t("SidebarChatText")} >
              <IconButton onClick={handleMessage} >
                <Badge variant="dot" invisible={!newMessage} color="primary">
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
              <Avatar src={avatarUrl} 
                size="small" 
                
                borderColor={USER_RANKING[ranking]} />
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
