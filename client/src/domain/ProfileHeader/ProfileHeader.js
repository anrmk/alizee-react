import React from "react";
import { Box, IconButton, Hidden } from "@material-ui/core";

import MoreVertIcon from "@material-ui/icons/MoreVertRounded";

import Cover from "../../components/Cover";
import Avatar from "../../components/Avatar";
import { USER_RANKING } from "../../constants/user";

import { ProfileStatistics } from "../ProfileStatistics";
import DisplayName from "../../components/DisplayName";

import useStyles from "./styles";

function ProfileHeader(props) {
  const { user } = props;

  const classes = useStyles();

  const { isOwner } = props;
  const { onNewCoverImageClick, onDeleteCoverImageClick, onCoverUrlChange, onMenuClick } = props;

  return (
    <Box className={classes.root}>
      <Hidden smDown>
        <Cover
          showControls={isOwner}
          src={user.coverUrl}
          onFileInputChange={onCoverUrlChange}
          onNewImageClick={onNewCoverImageClick}
          onDeleteImageClick={onDeleteCoverImageClick}
        />
      </Hidden>
      <Hidden smDown>
        <Box className={classes.topControls}>
          <Box display="flex" alignItems="center">
            <ProfileStatistics
              className={classes.profileStatistics}
              isOwner={isOwner}
              userName={user.userName}
              followersCount={user?.followersCount}
              followingsCount={user?.followingsCount}
              favoritesCount={user?.favoritesCount}
              blockedCount={user?.blockedCount}
            />
          </Box>
          <Box>
            <IconButton onClick={onMenuClick} aria-label="Profile menu" aria-haspopup="true">
              <MoreVertIcon htmlColor="white" />
            </IconButton>
          </Box>
        </Box>
      </Hidden>
      <Hidden mdUp>
        <Cover
          showControls={isOwner}
          src={user.coverUrl}
          onFileInputChange={onCoverUrlChange}
          onNewImageClick={onNewCoverImageClick}
          onDeleteImageClick={onDeleteCoverImageClick}
        >
          <Box position="absolute" top="0px" right="0px">
            <IconButton aria-label="Profile menu" aria-haspopup="true" onClick={onMenuClick}>
              <MoreVertIcon htmlColor="white" />
            </IconButton>
          </Box>
          <Box
            display="flex"
            width="100%"
            alignItems="flex-end"
            position="relative"
            top="24px"
            paddingLeft={1}
          >
            <Avatar
              className={classes.avatarHeader}
              src={user.avatarUrl}
              online={isOwner || !user.offlineDate}
              live={user.live} // TODO: add a condition to check is not it me
              size="big"
              borderColor="silver"
              borderWidth="4px"
            />
            <Box marginLeft={1} width="calc(100% - 124px)">
              {
                <DisplayName
                  name={user.name}
                  userName={user.userName}
                  identityVerified={user.identityVerified}
                  noWrap={false}
                  alignItems="flex-start"
                />
              }
            </Box>
          </Box>
        </Cover>
      </Hidden>
    </Box>
  );
}

export default ProfileHeader;
