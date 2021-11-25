import React from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";

import { Typography, Box } from "@material-ui/core/";
import {
  FOLLOWERS_ROUTE,
  FOLLOWINGS_ROUTE,
  FAVORITES_USERNAME_ROUTE,
  BLOCKED_USERNAME_ROUTE,
} from "../../../constants/routes";

import useStyles from "./style";

function ProfileStatisticsMobile({
  userName,
  isOwner,
  followersCount,
  followingsCount,
  favoritesCount,
  postsCount,
  blockedCount,
  className,
}) {
  const classes = useStyles();

  return (
    <Box className={clsx(classes.root, className)}>
      {isOwner ? (
        <>
          <Box
            className={classes.itemMobile}
            to={FOLLOWERS_ROUTE(userName)}
            component={Link}>
            <Typography className={classes.textMobile}>
              {followersCount || "0"}
            </Typography>
            <Typography className={classes.textCaptionMobile}>
              followers
            </Typography>
          </Box>
          <Box
            className={classes.itemMobile}
            to={FOLLOWINGS_ROUTE(userName)}
            component={Link}>
            <Typography className={classes.textMobile}>
              {followingsCount || "0"}
            </Typography>
            <Typography className={classes.textCaptionMobile}>
              followings
            </Typography>
          </Box>
          <Box
            className={classes.itemMobile}
            to={FAVORITES_USERNAME_ROUTE(userName)}
            component={Link}>
            <Typography className={classes.textMobile}>
              {favoritesCount || "0"}
            </Typography>
            <Typography className={classes.textCaptionMobile}>
              favorites
            </Typography>
          </Box>
          <Box
            className={classes.itemMobile}
            to={BLOCKED_USERNAME_ROUTE(userName)}
            component={Link}>
            <Typography className={classes.textMobile}>
              {blockedCount || "0"}
            </Typography>
            <Typography className={classes.textCaptionMobile}>
              blocked
            </Typography>
          </Box>
        </>
      ) : (
        <>
          <Box className={classes.itemMobile}>
            <Typography className={classes.textMobile}>
              {postsCount || "0"}
            </Typography>
            <Typography className={classes.textCaptionMobile}>posts</Typography>
          </Box>
          <Box className={classes.itemMobile}>
            <Typography className={classes.textMobile}>
              {followersCount || "0"}
            </Typography>
            <Typography className={classes.textCaptionMobile}>
              followers
            </Typography>
          </Box>
          <Box className={classes.itemMobile}>
            <Typography className={classes.textMobile}>
              {followingsCount || "0"}
            </Typography>
            <Typography className={classes.textCaptionMobile}>
              followings
            </Typography>
          </Box>
        </>
      )}
    </Box>
  );
}

export default ProfileStatisticsMobile;
