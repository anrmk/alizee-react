import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { Grid, Box, List, ListItem, ListItemIcon, ListItemText, Typography, Badge, Divider } from "@material-ui/core";

import PersonOutlineIcon from "@material-ui/icons/PersonOutlineOutlined";
import HomeIcon from "@material-ui/icons/HomeOutlined";
import NotificationsIcon from "@material-ui/icons/NotificationsOutlined";
import MailIcon from "@material-ui/icons/MailOutline";
import ExploreIcon from "@material-ui/icons/ExploreOutlined";
import SettingsIcon from "@material-ui/icons/Settings";
import ExitToAppIcon from "@material-ui/icons/ExitToAppOutlined";

import {
  HOME_ROUTE,
  NOTIFICATION_ROUTE,
  NOTIFICATION_ROUTE_ALL,
  CHAT_ROUTE,
  PROFILE_USERNAME_ROUTE,
  EXPLORE_ROUTE,
  SETTINGS_EDIT_PROFILE_ROUTE,
} from "../../constants/routes";

import UserCard from "./UserCard";
import { Wallet } from "../Wallet";
import Animate from "../Animate/Animate";

import useStyles from "./styles";

function Sidebar({
  user,
  open,

  newMessage,
  newNotification,

  onSignOut,
  onCreateMeet,
  onCreatePost,
  onCreateStory,
}) {
  const classes = useStyles();
  const { t } = useTranslation();
  const location = useLocation();

  return (
    <Box className={classes.rootBox}>
      <Grid container direction="column" justify="space-between" alignItems="stretch">
        <Grid item>
          <UserCard
            userName={user.userName}
            name={user.name}
            avatarUrl={user.avatarUrl}
            coverUrl={user.coverUrl}
            identityVerified={user.identityVerified}
            open={open}
            onCreateMeet={onCreateMeet}
            onCreatePost={onCreatePost}
            onCreateStory={onCreateStory}
          />
        </Grid>

        {open && user.identityVerified && (
          <Grid item>
            <Wallet deposit={user.deposit} />{" "}
          </Grid>
        )}

        <Grid item>
          <List component="nav" dense>
            <Animate variant="rubberBand">
              <ListItem button selected={location.pathname === HOME_ROUTE} to={HOME_ROUTE} component={Link}>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText>
                  <Typography color={location.pathname === HOME_ROUTE ? "textPrimary" : "textSecondary"} variant="h6">
                    {t("SidebarFeedText")}
                  </Typography>
                </ListItemText>
              </ListItem>
            </Animate>
            <Animate variant="rotate">
              <ListItem button selected={location.pathname.includes(EXPLORE_ROUTE)} to={EXPLORE_ROUTE} component={Link}>
                <ListItemIcon>
                  <ExploreIcon />
                </ListItemIcon>
                <ListItemText>
                  <Typography
                    color={location.pathname === EXPLORE_ROUTE ? "textPrimary" : "textSecondary"}
                    variant="h6"
                  >
                    {t("SidebarExploreText")}
                  </Typography>
                </ListItemText>
              </ListItem>
            </Animate>

            <Animate variant="swing">
              <ListItem
                button
                selected={location.pathname.includes(NOTIFICATION_ROUTE)}
                to={NOTIFICATION_ROUTE_ALL}
                component={Link}
              >
                <ListItemIcon>
                  <Badge variant="dot" invisible={!newNotification} color="primary">
                    <NotificationsIcon />
                  </Badge>
                </ListItemIcon>
                <ListItemText>
                  <Typography
                    color={location.pathname.includes(NOTIFICATION_ROUTE) ? "textPrimary" : "textSecondary"}
                    variant="h6"
                  >
                    {t("SidebarNotificationText")}
                  </Typography>
                </ListItemText>
              </ListItem>
            </Animate>
            <Animate variant="rubberBand">
              <ListItem
                button
                selected={location.pathname.includes(CHAT_ROUTE(""))}
                to={CHAT_ROUTE("")}
                component={Link}
              >
                <ListItemIcon>
                  <Badge variant="dot" invisible={!newMessage} color="primary">
                    <MailIcon />
                  </Badge>
                </ListItemIcon>
                <ListItemText>
                  <Typography
                    color={location.pathname.includes(CHAT_ROUTE("")) ? "textPrimary" : "textSecondary"}
                    variant="h6"
                  >
                    {t("SidebarChatText")}
                  </Typography>
                </ListItemText>
              </ListItem>
            </Animate>

            <Animate variant="pulse">
              <ListItem
                button
                selected={location.pathname.includes(PROFILE_USERNAME_ROUTE(user.userName))}
                to={PROFILE_USERNAME_ROUTE(user.userName)}
                component={Link}
              >
                <ListItemIcon>
                  <PersonOutlineIcon />
                </ListItemIcon>
                <ListItemText>
                  <Typography
                    color={
                      location.pathname.includes(PROFILE_USERNAME_ROUTE(user.userName))
                        ? "textPrimary"
                        : "textSecondary"
                    }
                    variant="h6"
                  >
                    {t("SidebarProfileText")}
                  </Typography>
                </ListItemText>
              </ListItem>
            </Animate>
          </List>
        </Grid>

        <Grid item>
          <Divider variant="fullWidth" component="div" />

          <List component="nav" dense>
            <Animate variant="rotate">
              <ListItem
                button
                selected={location.pathname.includes(SETTINGS_EDIT_PROFILE_ROUTE)}
                to={SETTINGS_EDIT_PROFILE_ROUTE}
                component={Link}
              >
                <ListItemIcon>
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText>
                  <Typography
                    color={location.pathname.includes(SETTINGS_EDIT_PROFILE_ROUTE) ? "textPrimary" : "textSecondary"}
                    variant="h6"
                  >
                    Settings
                  </Typography>
                </ListItemText>
              </ListItem>
            </Animate>
            <Animate variant="pulse">
              <ListItem button onClick={onSignOut}>
                <ListItemIcon>
                  <ExitToAppIcon />
                </ListItemIcon>
                <ListItemText>
                  <Typography color="textSecondary" variant="h6">
                    {t("SidebarSignOutText")}
                  </Typography>
                </ListItemText>
              </ListItem>
            </Animate>
          </List>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Sidebar;
