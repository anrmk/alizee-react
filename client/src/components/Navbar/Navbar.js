import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { Container, Box, AppBar, Toolbar, IconButton, InputBase, Badge } from "@material-ui/core";

import NotificationsIcon from "@material-ui/icons/NotificationsActiveOutlined";
import HomeIcon from "@material-ui/icons/HomeOutlined";
import AddIcon from "@material-ui/icons/Add";
import MailIcon from "@material-ui/icons/MailOutline";
import SearchIcon from "@material-ui/icons/SearchOutlined";

import { CHAT_ROUTE, HOME_ROUTE } from "../../constants/routes";
import Avatar from "../Avatar";

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
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>

          <div className={classes.controls}>
            <IconButton onClick={() => history.push(HOME_ROUTE)}>
              <HomeIcon />
            </IconButton>

            <IconButton onClick={() => history.push(HOME_ROUTE)}>
              <AddIcon />
            </IconButton>
          </div>

          <div className={classes.grow} />

          <Box className={classes.controls}>
            <IconButton aria-label="show 17 new notifications">
              <Badge badgeContent={notificationsCount}>
                <NotificationsIcon />
              </Badge>
            </IconButton>

            <IconButton onClick={() => {
              history.push(CHAT_ROUTE(username))
              }}>
              <Badge badgeContent={messagesCount} color="primary">
                <MailIcon />
              </Badge>
            </IconButton>

            <IconButton
              ref={anchorEl}
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleMenuOpen}
            >
              <Avatar src={avatarUrl} size="small" borderColor="blue" />
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
