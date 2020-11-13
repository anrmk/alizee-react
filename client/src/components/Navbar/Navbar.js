import React from "react";
import { useHistory } from "react-router-dom";

import Menu from "./Menu";

import Avatar from "@material-ui/core/Avatar";
import NotificationsIcon from "@material-ui/icons/NotificationsActiveOutlined";
import HomeIcon from "@material-ui/icons/HomeOutlined";
import StorefrontIcon from "@material-ui/icons/StorefrontOutlined";
import SendIcon from "@material-ui/icons/SendOutlined";
import SearchIcon from "@material-ui/icons/SearchOutlined";

import { Container, AppBar, Toolbar, Typography, IconButton, InputBase, Badge } from "@material-ui/core";

import { CHAT_ROUTE, HOME_ROUTE, PROFILE_ROUTE, SEARCH_ROUTE } from "../../constants/routes";

import iconSrc from "../../assets/img/logo.png";
import useStyles from "./styles";

function Header({
  username,
  messagesCount,
  notificationsCount,
  avatarUrl,

  onSignOut,
}) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const history = useHistory();

  const menuId = "account-menu";
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
    <div className={classes.grow}>
      <AppBar className={classes.container} position="static">
        <Container>
          <Toolbar>
            <span>
              <img src={iconSrc} width="30" height="30" alt="" loading="lazy" />
            </span>
            <Typography className={classes.title} variant="h6" noWrap>
              Alizee Meet
            </Typography>

            <div className={classes.grow} />
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
                <HomeIcon className={classes.link} />
              </IconButton>

              <IconButton onClick={() => history.push(HOME_ROUTE)}>
                <StorefrontIcon className={classes.link} />
              </IconButton>

              <IconButton onClick={() => history.push(CHAT_ROUTE)}>
                <Badge badgeContent={messagesCount} color="primary">
                  <SendIcon className={classes.link} />
                </Badge>
              </IconButton>

              <IconButton aria-label="show 17 new notifications" color="inherit">
                <Badge badgeContent={notificationsCount} color="secondary">
                  <NotificationsIcon className={classes.link} />
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
                <Avatar src={avatarUrl} className={classes.small} />
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
            </div>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}

export default Header;
