import React from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";

import { Typography, Box, Divider } from "@material-ui/core/";
import { FOLLOWERS_ROUTE, FOLLOWINGS_ROUTE, FAVORITES_USERNAME_ROUTE } from "../../constants/routes";

import useStyles from "./style";

function ProfileStatistics({
  userName,
  isOwner,
  followersCount,
  followingsCount,
  favoritesCount,
  postsCount,
  className,
}) {
  const classes = useStyles();

  return (
    <Box className={clsx(classes.root, className)}>
      {isOwner ? (
        <>
          <Typography className={classes.text} to={FOLLOWERS_ROUTE(userName)} component={Link}>
            {followersCount || "0"} followers
          </Typography>
          <Divider className={classes.divider} orientation="vertical" flexItem />
          <Typography className={classes.text} to={FOLLOWINGS_ROUTE(userName)} component={Link}>
            {followingsCount || "0"} followings
          </Typography>
          <Divider className={classes.divider} orientation="vertical" flexItem />
          <Typography className={classes.text} to={FAVORITES_USERNAME_ROUTE(userName)} component={Link}>
            {favoritesCount || "0"} favorites
          </Typography>
        </>
      ) : (
        <>
          <Typography className={classes.text}>{postsCount || "0"} posts</Typography>
          <Divider className={classes.divider} orientation="vertical" flexItem />
          <Typography className={classes.text}>{followersCount || "0"} followers</Typography>
          <Divider className={classes.divider} orientation="vertical" flexItem />
          <Typography className={classes.text}>{followingsCount || "0"} followings</Typography>
        </>
      )}
    </Box>
  );
}

export default ProfileStatistics;
