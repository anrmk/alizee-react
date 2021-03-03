import React from "react";

import { Box, Typography, BottomNavigation, BottomNavigationAction } from "@material-ui/core";

import LiveTvIcon from "@material-ui/icons/LiveTvOutlined";
import AddPhotoCameraIcon from '@material-ui/icons/AddAPhotoOutlined';
import ControlPointIcon from '@material-ui/icons/ControlPointDuplicateOutlined';

import Avatar from "../Avatar";
import useStyles from "./styles";

function UserCard(props) {
  const { open } = props;
  const { name, username, avatarUrl } = props;
  const { onCreateMeet, onCreatePost, onCreateStory } = props;

  const classes = useStyles({ open });

  return (
    <Box p={1} >
      <Box className={classes.card}>
        <Avatar src={avatarUrl} size="large" borderColor="blue" live />
        <Typography variant="h6">{name}</Typography>
        <Typography variant="subtitle1">{username}</Typography>

        <BottomNavigation showLabels className={classes.navigation} >
          <BottomNavigationAction className="success" value="goLive" label="Go live" icon={<LiveTvIcon />} onClick={onCreateMeet} />
          <BottomNavigationAction className="secondary" value="post" label="Photo" icon={<AddPhotoCameraIcon />} onClick={onCreatePost} />
          <BottomNavigationAction className="primary" value="stories" label="Stories" icon={<ControlPointIcon />} onClick={onCreateStory} />
        </BottomNavigation>
      </Box>
    </Box>
  );
}

export default UserCard;
