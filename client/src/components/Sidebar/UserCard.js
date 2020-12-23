import React from "react";
import PropTypes from "prop-types";

import { Box, Typography, BottomNavigation, BottomNavigationAction } from "@material-ui/core";

import LiveTvIcon from "@material-ui/icons/LiveTvOutlined";
import GradeIcon from "@material-ui/icons/GradeOutlined";
import GrainIcon from "@material-ui/icons/GrainOutlined";

import Avatar from "../Avatar";
import ProfileGeneralStatistics from "../ProfileGeneralStatistics"
import useStyles from "./styles";

function UserCard(props) {
  const { open } = props;
  const { name, username, avatarUrl } = props;
  const { postCount, followerCount, followingCount } = props;

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
      <ProfileGeneralStatistics 
      username={username} 
      postCount={postCount} 
      followerCount={followerCount} 
      followingCount={followingCount}/>

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
  postCount: PropTypes.number,
  followerCount: PropTypes.number,
  followingCount: PropTypes.number,
};

UserCard.defaultProps = {
  user: "",
  username: "",
  avatarUrl: "",
  open: true,
  postCount: 0,
  followerCount: 0,
  followingCount: 0,
};

export default UserCard;
