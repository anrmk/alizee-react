import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import {
  Box,
  Typography,
  BottomNavigation,
  BottomNavigationAction,
} from "@material-ui/core";

import LiveTvIcon from "@material-ui/icons/LiveTvOutlined";
import AddPhotoCameraIcon from "@material-ui/icons/AddAPhotoOutlined";
import ControlPointIcon from "@material-ui/icons/ControlPointDuplicateOutlined";
import VerifiedIcon from "../Icons/VerifiedIcon";

import { PROFILE_USERNAME_ROUTE } from "../../constants/routes";

import Avatar from "../Avatar";
import useStyles from "./styles";

function UserCard(props) {
  const { name, userName, avatarUrl, identityVerified } = props;
  const { onCreateMeet, onCreatePost, onCreateStory } = props;
  const { t } = useTranslation();

  const classes = useStyles();

  return (
    <Box>
      <Box display="flex" justifyContent="center" position="relative">
        <Avatar
          src={avatarUrl}
          size="big"
          borderColor="silver"
          avatarBaseProps={{
            component: Link,
            to: PROFILE_USERNAME_ROUTE(userName),
          }}
        />
      </Box>

      <Box display="flex" alignItems="center" justifyContent="center">
        <Typography variant="h6" className={classes.cardName}>
          {name}
        </Typography>
        {identityVerified && <VerifiedIcon fontSize="small" color="primary" />}
      </Box>
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
