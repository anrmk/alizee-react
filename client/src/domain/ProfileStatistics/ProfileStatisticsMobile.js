import React from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";

import { Typography, Box, Divider } from "@material-ui/core/";
import { FOLLOWERS_ROUTE, FOLLOWINGS_ROUTE, FAVORITES_USERNAME_ROUTE } from "../../constants/routes";

import useStyles from "./style";

function ProfileStatisticsMobile({
  userName,
  isOwner,
  followersCount,
  followingsCount,
  favoritesCount,
  className
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
            <Typography
              className={classes.textMobile}>
              {followersCount || "0"}
            </Typography>
            <Typography className={classes.textCaptionMobile}>
              Followers
            </Typography>
          </Box>
          <Box 
            className={classes.itemMobile}
            to={FOLLOWINGS_ROUTE(userName)}
            component={Link}>
            <Typography
              className={classes.textMobile}>
              {followingsCount || "0"}
            </Typography>
            <Typography className={classes.textCaptionMobile}>
              Followings
            </Typography>
          </Box>
          <Box 
            className={classes.itemMobile}
            to={FAVORITES_USERNAME_ROUTE(userName)}
            component={Link}>
            <Typography
              className={classes.textMobile}>
              {favoritesCount || "0"}
            </Typography>
            <Typography className={classes.textCaptionMobile}>
              Favorites
            </Typography>
          </Box>
        </>
      ) : (
        <Box className={classes.itemMobile}>
          <Typography className={classes.textMobile}>
            {followersCount || "0"}
          </Typography>
          <Typography className={classes.textCaptionMobile}>
            Followers
          </Typography>
        </Box>
      )}
    </Box>
  );
}

export default ProfileStatisticsMobile;
