import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import clsx from "clsx";

import { Container, AppBar, Toolbar, IconButton, InputBase, Badge, Hidden } from "@material-ui/core";

import NotificationsIcon from "@material-ui/icons/NotificationsActiveOutlined";
import MailIcon from "@material-ui/icons/MailOutline";
import SearchIcon from "@material-ui/icons/SearchOutlined";
import HomeIcon from "@material-ui/icons/HomeOutlined";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorderOutlined";
import ExploreIcon from "@material-ui/icons/ExploreOutlined";
import ShopIcon from "@material-ui/icons/Storefront";
import AddCircleIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import StoriesIcon from '@material-ui/icons/AmpStoriesOutlined';
import CameraIcon from '@material-ui/icons/CameraAltOutlined';
import MoodIcon from '@material-ui/icons/MoodOutlined';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';

import {HOME_ROUTE, SEARCH_ROUTE, EXPLORE_ROUTE, PROFILE_ROUTE } from "../../constants/routes";
import Avatar from "../Avatar";

import useStyles from "./styles";

function BottomBar(props) {
  const {userName, avatarUrl} = props;
  const {onClick} = props;

  const classes = useStyles()();
  const { t } = useTranslation();
  const location = useLocation();
  const history = useHistory();

  return (
    <AppBar className={clsx (classes.root, "bottom")} >
      <Container>
        <Toolbar className={classes.toolbar} >
          <IconButton onClick={() => { history.push(HOME_ROUTE)}} color={`${location.pathname.includes(HOME_ROUTE) ? "primary" : "default" }`}  >
            <HomeIcon />
          </IconButton>
          <IconButton onClick={() => { history.push(SEARCH_ROUTE)}} color={`${location.pathname.includes(SEARCH_ROUTE) ? "primary" : "default" }`}>
            <SearchIcon />
          </IconButton>
          <IconButton onClick={onClick} >
            <AddCircleIcon />
          </IconButton>
          <IconButton onClick={() => { history.push(EXPLORE_ROUTE)}} color={`${location.pathname.includes(EXPLORE_ROUTE) ? "primary" : "default" }`}>
            <ExploreIcon />
          </IconButton>
          <IconButton onClick={() => { history.push(PROFILE_ROUTE(userName))}} >
            <Avatar src={avatarUrl} size="small" borderColor="default" />
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default BottomBar;
