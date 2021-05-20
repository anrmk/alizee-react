import React from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import clsx from "clsx";
import { useTranslation } from "react-i18next";

import { Grid, Typography, Box } from "@material-ui/core";
import { Drawer, Divider, Tooltip, Switch } from "@material-ui/core";
import { List, ListItem, ListItemIcon, ListItemText, IconButton } from "@material-ui/core";

import useTheme from "@material-ui/core/styles/useTheme";

import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import PersonOutlineIcon from "@material-ui/icons/PersonOutlineOutlined";
import HomeIcon from "@material-ui/icons/HomeOutlined";
import MailIcon from "@material-ui/icons/MailOutline";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorderOutlined";
import ExploreIcon from "@material-ui/icons/ExploreOutlined";
import NightIcon from "@material-ui/icons/NightsStayOutlined";
import SunnyIcon from "@material-ui/icons/WbSunnyOutlined";

import { HOME_ROUTE, CHAT_ROUTE, PROFILE_USERNAME_ROUTE, EXPLORE_ROUTE, ACTIVITY_ROUTE } from "../../constants/routes";
import useChangeTheme from "../../hooks/useChangeTheme";
import UserCard from "./UserCard";
import { Wallet } from "../Wallet";

import useStyles from "./styles";

function Sidebar({
  user,
  open,

  onCreateMeet,
  onCreatePost,
  onCreateStory,
  onDrawerToggle,
}) {
  const classes = useStyles({ open });
  const { t } = useTranslation();
  const location = useLocation();
  const history = useHistory();

  const theme = useTheme();
  const changeTheme = useChangeTheme();

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
            <NightIcon />
          </Grid>
          <Grid item>
            <Switch
              name="gilad"
              checked={theme.palette.type === "light"}
              color="primary"
              onChange={() => changeTheme.toggle()}
            />
          </Grid>
          <Grid item>
            <SunnyIcon />
          </Grid>
        </Grid>
      </Typography>

      {open && (
        <UserCard
          userName={user.userName}
          name={user.name}
          avatarUrl={user.avatarUrl}
          ranking={user.ranking}
          identityVerified={user.identityVerified}
          open={open}
          onCreateMeet={onCreateMeet}
          onCreatePost={onCreatePost}
          onCreateStory={onCreateStory}
        />
      )}

      {open && user.identityVerified && <Wallet deposit={user.deposit} />}

      <List className={classes.pageList}>
        <Tooltip title={t("SidebarFeedText")} placement="right">
          <ListItem button selected={location.pathname === HOME_ROUTE} to={HOME_ROUTE} component={Link}>
            <ListItemIcon>
              <HomeIcon color="secondary" />
            </ListItemIcon>
            <ListItemText primary={t("SidebarFeedText")} />
          </ListItem>
        </Tooltip>

        <Tooltip title={t("SidebarExploreText")} placement="right">
          <ListItem button selected={location.pathname.includes(EXPLORE_ROUTE)} to={EXPLORE_ROUTE} component={Link}>
            <ListItemIcon>
              <ExploreIcon color="secondary" />
            </ListItemIcon>
            <ListItemText primary={t("SidebarExploreText")} />
          </ListItem>
        </Tooltip>

        <Tooltip title={t("SidebarProfileText")} placement="right">
          <ListItem
            button
            selected={location.pathname.includes(PROFILE_USERNAME_ROUTE(user.userName))}
            to={PROFILE_USERNAME_ROUTE(user.userName)}
            component={Link}
          >
            <ListItemIcon>
              <PersonOutlineIcon color="secondary" />
            </ListItemIcon>
            <ListItemText primary={t("SidebarProfileText")} />
          </ListItem>
        </Tooltip>

        <Tooltip title={t("SidebarChatText")} placement="right">
          <ListItem button selected={location.pathname.includes(CHAT_ROUTE(""))} to={CHAT_ROUTE("")} component={Link}>
            <ListItemIcon>
              <MailIcon color="secondary" />
            </ListItemIcon>
            <ListItemText primary={t("SidebarChatText")} />
          </ListItem>
        </Tooltip>

        {/* <Tooltip title={t("SidebarActivityText")} placement="right">
          <ListItem
            button
            selected={location.pathname.includes(ACTIVITY_ROUTE)}
            to={ACTIVITY_ROUTE}
            component={Link}>
            <ListItemIcon>
              <FavoriteBorderIcon  color="secondary" />
            </ListItemIcon>
            <ListItemText primary={t("SidebarActivityText")} />
          </ListItem>
        </Tooltip> */}
      </List>
    </Drawer>
  );
}

export default Sidebar;
