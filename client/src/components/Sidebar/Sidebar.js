import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

import {
  Grid,
  Box,
  Switch,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@material-ui/core";

import PersonOutlineIcon from "@material-ui/icons/PersonOutlineOutlined";
import HomeIcon from "@material-ui/icons/HomeOutlined";
import MailIcon from "@material-ui/icons/MailOutline";
import ExploreIcon from "@material-ui/icons/ExploreOutlined";
import NightIcon from "@material-ui/icons/NightsStayOutlined";
import SunnyIcon from "@material-ui/icons/WbSunnyOutlined";

import { HOME_ROUTE, CHAT_ROUTE, PROFILE_USERNAME_ROUTE, EXPLORE_ROUTE, ACTIVITY_ROUTE } from "../../constants/routes";

import UserCard from "./UserCard";
import { Wallet } from "../Wallet";

function Sidebar({
  user,
  open,

  onCreateMeet,
  onCreatePost,
  onCreateStory,
}) {
  const { t } = useTranslation();
  const location = useLocation();

  return (
    <Box position="sticky" top="4rem">
      <Grid container direction="column" >
        {/* <Grid item >
          <Grid container item alignItems="center" justify="flex-end" component="label">
            <Grid item>
              <NightIcon />
            </Grid>
            <Grid item>
              <Switch
                name="gilad"
                checked={changeTheme.currentTheme === "light"}
                color="primary"
                onChange={() => changeTheme.toggle()}
              />
            </Grid>
            <Grid item>
              <SunnyIcon />
            </Grid>
          </Grid>
        </Grid> */}
        <Grid item>
          <UserCard
            userName={user.userName}
            name={user.name}
            avatarUrl={user.avatarUrl}
            coverUrl={user.coverUrl}
            ranking={user.ranking}
            identityVerified={user.identityVerified}
            open={open}
            onCreateMeet={onCreateMeet}
            onCreatePost={onCreatePost}
            onCreateStory={onCreateStory}
          />
        </Grid>
        <Grid item>{open && user.identityVerified && <Wallet deposit={user.deposit} />}</Grid>
        <Grid item>
          <List component="nav" dense>
            <ListItem button selected={location.pathname === HOME_ROUTE} to={HOME_ROUTE} component={Link}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText>
                <Typography variant="h6">{t("SidebarFeedText")}</Typography>
              </ListItemText>
            </ListItem>

            <ListItem button selected={location.pathname.includes(EXPLORE_ROUTE)} to={EXPLORE_ROUTE} component={Link}>
              <ListItemIcon>
                <ExploreIcon />
              </ListItemIcon>
              <ListItemText>
                <Typography variant="h6">{t("SidebarExploreText")}</Typography>
              </ListItemText>
            </ListItem>

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
                <Typography variant="h6">{t("SidebarProfileText")}</Typography>
              </ListItemText>
            </ListItem>

            <ListItem button selected={location.pathname.includes(CHAT_ROUTE(""))} to={CHAT_ROUTE("")} component={Link}>
              <ListItemIcon>
                <MailIcon />
              </ListItemIcon>
              <ListItemText>
                <Typography variant="h6">{t("SidebarChatText")}</Typography>
              </ListItemText>
            </ListItem>

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
        </Grid>
      </Grid>
    </Box>
  );
}

export default Sidebar;
