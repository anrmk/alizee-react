import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import clsx from "clsx";

import { Container, AppBar, Toolbar, IconButton } from "@material-ui/core";

import SearchIcon from "@material-ui/icons/SearchOutlined";
import HomeIcon from "@material-ui/icons/HomeOutlined";
import ExploreIcon from "@material-ui/icons/ExploreOutlined";

import { PostSprout } from "../PostsList";
import Avatar from "../../components/Avatar";

import {HOME_ROUTE, SEARCH_ROUTE, EXPLORE_ROUTE, PROFILE_USERNAME_ROUTE } from "../../constants/routes";

import useStyles from "./styles";

function BottomBar({
  user,

  onDialogToggle
}) {
  const classes = useStyles()();
  const location = useLocation();
  const history = useHistory();

  return (
    <AppBar className={clsx (classes.root, "bottom")} component="footer" >
      <Container>
        <Toolbar className={classes.toolbar} >
          <IconButton onClick={() => history.push(HOME_ROUTE)} color={`${location.pathname.includes(HOME_ROUTE) ? "primary" : "default" }`}>
            <HomeIcon />
          </IconButton>
          <IconButton onClick={() => history.push(SEARCH_ROUTE)} color={`${location.pathname.includes(SEARCH_ROUTE) ? "primary" : "default" }`}>
            <SearchIcon />
          </IconButton>

          <PostSprout variant="icon" userName={user.userName} onDialogToggle={onDialogToggle} />

          <IconButton onClick={() => history.push(EXPLORE_ROUTE)} color={`${location.pathname.includes(EXPLORE_ROUTE) ? "primary" : "default" }`}>
            <ExploreIcon />
          </IconButton>
          <IconButton onClick={() => history.push(PROFILE_USERNAME_ROUTE(user.userName))}>
            <Avatar src={user.avatarUrl} size="small" borderColor="default" />
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default BottomBar;
