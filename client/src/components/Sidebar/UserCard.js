import React from "react";
import PropTypes from "prop-types";

import { FOLLOWERS_ROUTE, FOLLOWINGS_ROUTE } from "../../constants/routes";

import { Box, Link, Grid, Divider, Typography, BottomNavigation, BottomNavigationAction } from "@material-ui/core";

import LiveTvIcon from "@material-ui/icons/LiveTvOutlined";
import GradeIcon from "@material-ui/icons/GradeOutlined";
import GrainIcon from "@material-ui/icons/GrainOutlined";

import Avatar from "../Avatar";
import useStyles from "./styles";

function UserCard(props) {
  const { open } = props;
  const { name, username, avatarUrl } = props;
  const { postsCount, followersCount, followingCount } = props;

  const classes = useStyles({ open });

  const handleNavigationChange = (e, newValue) => {
    e.preventDefault();

    props.onNavigationChange && props.onNavigationChange(newValue);
  };

  return (
    <Box m={3} className={classes.card}>
      <Avatar src={avatarUrl} size="large" borderColor="blue" live />
      <br />
      <Typography variant="h6">{name}</Typography>
      <Typography variant="subtitle1">{username}</Typography>
      <br />
      <Grid container alignItems="center" justify="space-evenly" direction="row" spacing={1}>
        <Grid item>
          <Typography variant="caption">Posts</Typography>
          <Typography>{postsCount}</Typography>
        </Grid>
        <Divider orientation="vertical" flexItem />
        <Grid item>
          <Link href={FOLLOWERS_ROUTE(username)} variant="caption">
            Followers
          </Link>
          <Typography>{followersCount}</Typography>
        </Grid>
        <Divider orientation="vertical" flexItem />
        <Grid item>
          <Link href={FOLLOWINGS_ROUTE(username)} variant="caption">
            Following
          </Link>
          <Typography>{followingCount}</Typography>
        </Grid>
      </Grid>

      <BottomNavigation showLabels className={classes.navigation} onChange={handleNavigationChange}>
        <BottomNavigationAction className="success" value="goLive" label="Go live" icon={<LiveTvIcon />} />
        <BottomNavigationAction className="warning" value="top" label="Top posts" icon={<GradeIcon />} />
        <BottomNavigationAction className="danger" value="rewards" label="Rewards" icon={<GrainIcon />} />
      </BottomNavigation>
    </Box>
  );
}

UserCard.propTypes = {
  user: PropTypes.string,
  username: PropTypes.string,
  avatarUrl: PropTypes.string,
  open: PropTypes.bool,
  postsCount: PropTypes.number,
  followersCount: PropTypes.number,
  followingCount: PropTypes.number,
};

UserCard.defaultProps = {
  user: "",
  username: "",
  avatarUrl: "",
  open: true,
  postsCount: 0,
  followersCount: 0,
  followingCount: 0,
};

export default UserCard;
