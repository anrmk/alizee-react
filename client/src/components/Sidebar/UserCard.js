import React from "react";

import { Box, Typography, BottomNavigation, BottomNavigationAction, CardHeader, CardContent, CardActions } from "@material-ui/core";

import LiveTvIcon from "@material-ui/icons/LiveTvOutlined";
import GradeIcon from "@material-ui/icons/GradeOutlined";
import GrainIcon from "@material-ui/icons/GrainOutlined";

import Avatar from "../Avatar";
import useStyles from "./styles";

function UserCard(props) {
  const { open } = props;
  const { name, username, avatarUrl, balance } = props;
  const { postCount, followerCount, followingCount } = props;

  const classes = useStyles({ open });

  const handleNavigationChange = (e, newValue) => {
    e.preventDefault();

    props.onNavigationChange && props.onNavigationChange(newValue);
  };

  return (
    <Box p={1} >
      <Box className={classes.card}>
        <Avatar src={avatarUrl} size="large" borderColor="blue" live />
        <br />
        <Typography variant="h6">{name}</Typography>
        <Typography variant="subtitle1">{username}</Typography>

        <BottomNavigation showLabels className={classes.navigation} onChange={handleNavigationChange}>
          <BottomNavigationAction color="success" value="goLive" label="Go live" icon={<LiveTvIcon />} />
          <BottomNavigationAction className="warning" value="top" label="Top posts" icon={<GradeIcon />} />
          <BottomNavigationAction className="danger" value="rewards" label="Rewards" icon={<GrainIcon />} />
        </BottomNavigation>
      </Box>
    </Box>
  );
}

export default UserCard;
