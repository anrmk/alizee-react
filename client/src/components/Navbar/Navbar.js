import React from "react";

import SearchIcon from "@material-ui/icons/Search";
import NotificationsIcon from "@material-ui/icons/NotificationsActiveOutlined";
import HomeIcon from "@material-ui/icons/HomeOutlined";
import StorefrontIcon from '@material-ui/icons/StorefrontOutlined';
import SendIcon from '@material-ui/icons/SendOutlined';
import { 
  Container,
  AppBar, 
  Toolbar, 
  Typography, 
  IconButton, 
  InputBase, 
  Badge
} from '@material-ui/core';

import iconSrc from "../../assets/img/logo.png";
import {Avatar} from "../../components/Avatar";
import CustomLink from "../CustomLink";
import { CHAT_ROUTE, HOME_ROUTE } from '../../constants/routes';
import Menu from "./Menu";

import useStyles from "./styles";

function Header({ 
  username,
  messagesCount,
  notificationsCount,
  avatarUrl,

  onSignOut
}) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const menuId = 'account-menu';
  const isMenuOpen = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    onSignOut && onSignOut();
  }

  return (
    <div className={classes.grow}>
      <AppBar className={classes.container} position="static">
        <Container>
          <Toolbar>
              <CustomLink
                as="div"
                className="d-flex"
                to={HOME_ROUTE}
                color="inherit">
                <span>
                  <img
                    src={iconSrc}
                    className="mr-2"
                    width="30"
                    height="30"
                    alt=""
                    loading="lazy"
                  />
                </span>
                <Typography className={classes.title} variant="h6" noWrap>
                  Alizee Meet
                </Typography>
              </CustomLink>
              <div className={classes.grow} />
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput
                  }}
                  inputProps={{ 'aria-label': 'search' }}
                />
              </div>
              <div className={classes.grow} />
              <div className={classes.controls}>
                <CustomLink 
                  as={IconButton}
                  to={HOME_ROUTE}
                  color="inherit">
                  <HomeIcon className={classes.link} />
                </CustomLink>
                <IconButton color="inherit">
                  <StorefrontIcon className={classes.link} />
                </IconButton>
                <CustomLink 
                  as={IconButton}
                  to={CHAT_ROUTE}
                  aria-label="show 4 new mails"
                  color="inherit">
                  <Badge badgeContent={messagesCount} color="secondary">
                    <SendIcon className={classes.link} />
                  </Badge>
                </CustomLink>
                <IconButton aria-label="show 17 new notifications" color="inherit">
                  <Badge badgeContent={notificationsCount} color="secondary">
                    <NotificationsIcon className={classes.link} />
                  </Badge>
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleMenuOpen}
                  color="inherit"
                >
                  <Avatar size="small" url={avatarUrl} />
                </IconButton>
                <Menu
                  id={menuId}
                  username={username}
                  anchorEl={anchorEl}
                  open={isMenuOpen}
                  onCloseClick={handleMenuClose}
                  onClose={handleMenuClose}
                  onLogout={handleSignOut} />
              </div>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}

export default Header;
