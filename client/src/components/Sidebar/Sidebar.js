import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import clsx from "clsx";
import { useTranslation } from "react-i18next";

import { Grid, Typography } from "@material-ui/core";
import { Drawer, Divider, Tooltip, Switch } from "@material-ui/core";
import { List, ListItem, ListItemIcon, ListItemText, IconButton } from "@material-ui/core";

import useTheme from "@material-ui/core/styles/useTheme";

import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import HomeIcon from "@material-ui/icons/HomeOutlined";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorderOutlined";
import ExploreIcon from "@material-ui/icons/ExploreOutlined";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWalletOutlined";
import WhatshotIcon from "@material-ui/icons/WhatshotOutlined";
import GrainIcon from "@material-ui/icons/GrainOutlined";
import NightsStayIcon from "@material-ui/icons/NightsStayOutlined";
import SunnyIcon from "@material-ui/icons/WbSunnyOutlined";

import { HOME_ROUTE, EXPLORE_ROUTE, MEET_ROUTE } from "../../constants/routes";
import { useChangeTheme } from "../../domain/ThemeProvider";
import UserCard from "./UserCard";

import useStyles from "./styles";

function Sidebar({
  userInfo,
  open,

  onDrawerToggle,
}) {
  const classes = useStyles({ open });
  const { t } = useTranslation();
  const location = useLocation();
  const history = useHistory();

  const theme = useTheme();
  const changeTheme = useChangeTheme();

  const handleUserCardNavigationChange = (value) => {
    switch (value) {
      case "goLive":
        history.push(MEET_ROUTE);
        break;
      case "top":
        break;
      case "rewards":
        break;
    }
  };

  return (
    <Drawer
      className={classes.root}
      variant="permanent"
      anchor="left"
      open={open}
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: open,
        [classes.drawerClose]: !open,
      })}
      classes={{
        paper: clsx(classes.papper, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        }),
      }}
    >
      <Typography component="div" className={classes.header}>
        <IconButton onClick={onDrawerToggle} className={classes.drawerHeader}>
          {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
        <Grid component="label" container alignItems="center" className={classes.themeToggle}>
          <Grid item>
            <NightsStayIcon />
          </Grid>
          <Grid item>
            <Switch name="gilad" checked={theme.palette.type === "light"} color="primary" onChange={() => changeTheme()} />
          </Grid>
          <Grid item>
            <SunnyIcon />
          </Grid>
        </Grid>
      </Typography>

      <UserCard
        username={userInfo.userName}
        name={userInfo.name}
        avatarUrl={userInfo.avatarUrl}
        open={open}
        onNavigationChange={handleUserCardNavigationChange}
      />

      <Divider />

      <List>
        <Tooltip title={t("SidebarFeedText")} placement="right">
          <ListItem button selected={location.pathname.includes(HOME_ROUTE)} onClick={() => history.push(HOME_ROUTE)}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary={t("SidebarFeedText")} />
          </ListItem>
        </Tooltip>

        <Tooltip title={t("SidebarExploreText")} placement="right">
          <ListItem
            button
            selected={location.pathname.includes(EXPLORE_ROUTE)}
            onClick={() => history.push(EXPLORE_ROUTE)}
          >
            <ListItemIcon>
              <FavoriteBorderIcon />
            </ListItemIcon>
            <ListItemText primary={t("SidebarExploreText")} />
          </ListItem>
        </Tooltip>

        <Tooltip title={t("SidebarActivityText")} placement="right">
          <ListItem button>
            <ListItemIcon>
              <ExploreIcon />
            </ListItemIcon>
            <ListItemText primary={t("SidebarActivityText")} />
          </ListItem>
        </Tooltip>

        <Tooltip title={t("SidebarPopularTagsText")} placement="right">
          <ListItem button>
            <ListItemIcon>
              <GrainIcon />
            </ListItemIcon>
            <ListItemText primary={t("SidebarPopularTagsText")} />
          </ListItem>
        </Tooltip>

        <Tooltip title={t("SidebarWalletText")} placement="right">
          <ListItem button>
            <ListItemIcon>
              <AccountBalanceWalletIcon />
            </ListItemIcon>
            <ListItemText primary={t("SidebarWalletText")} />
          </ListItem>
        </Tooltip>

        <Tooltip title={t("SidebarHotTipsText")} placement="right">
          <ListItem button>
            <ListItemIcon>
              <WhatshotIcon />
            </ListItemIcon>
            <ListItemText primary={t("SidebarHotTipsText")} />
          </ListItem>
        </Tooltip>
      </List>
    </Drawer>
  );
}

export default Sidebar;
