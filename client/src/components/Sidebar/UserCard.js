import React from "react";
import { Link } from "react-router-dom";

import { Box, Typography, BottomNavigation, BottomNavigationAction } from "@material-ui/core";

import LiveTvIcon from "@material-ui/icons/LiveTvOutlined";
import AddPhotoCameraIcon from "@material-ui/icons/AddAPhotoOutlined";
import ControlPointIcon from "@material-ui/icons/ControlPointDuplicateOutlined";
import VerifiedUserIcon  from "@material-ui/icons/CheckCircleOutline";

import { PROFILE_USERNAME_ROUTE } from "../../constants/routes";

import Avatar from "../Avatar";
import useStyles from "./styles";

function UserCard(props) {
  const { open } = props;
  const { name, userName, avatarUrl, coverUrl, identityVerified } = props;
  const { onCreateMeet, onCreatePost, onCreateStory } = props;

  const classes = useStyles({ open });

  return (
    <Box>
      <Box display="flex" justifyContent="center" position="relative">
        <Avatar
          src={avatarUrl}
          size="big"
          borderColor="silver"
          avatarBaseProps={{ component: Link, to: PROFILE_USERNAME_ROUTE(userName) }}
        />
      </Box>
      <Typography variant="h6" component="h6" align="center">
        {name} {identityVerified && <VerifiedUserIcon fontSize="small" />}
      </Typography>
      <Typography variant="subtitle2" color="textSecondary" align="center">
        @{userName}
      </Typography>
      <BottomNavigation showLabels className={classes.navigation}>
        <BottomNavigationAction
          className="success"
          value="goLive"
          label="Go live"
          icon={<LiveTvIcon />}
          onClick={onCreateMeet}
        />
        <BottomNavigationAction
          className="secondary"
          value="post"
          label="Post"
          icon={<AddPhotoCameraIcon />}
          onClick={onCreatePost}
        />
        <BottomNavigationAction
          className="primary"
          value="stories"
          label="Story"
          icon={<ControlPointIcon />}
          onClick={onCreateStory}
        />{" "}
      </BottomNavigation>
    </Box>
  );
}

export default UserCard;
