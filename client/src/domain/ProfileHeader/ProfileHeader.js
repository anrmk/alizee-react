import React, { useState } from "react";
import { Box, Typography, IconButton, Hidden } from "@material-ui/core";

import MoreVertIcon from "@material-ui/icons/MoreVertRounded";

import Cover from "../../components/Cover";
import Avatar from "../../components/Avatar";
import { USER_RANKING } from "../../constants/user";

import { ProfileStatistics, ProfileStatisticsMobile } from "../ProfileStatistics";

import Menu from "./Menu";

import useStyles from "./styles";

function ProfileHeader(props) {
  const { user } = props;

  const classes = useStyles();
  const [menuAnchor, setMenuAnchor] = useState(false);

  const { isOwner } = props;
  const {
    onFavoriteClick,
    onSendGiftClick,
    onShareClick,
    onSubscribeClick,
    onNewCoverImageClick,
    onDeleteCoverImageClick,
    onCoverUrlChange,
    onMenuClick
  } = props;

  return (
    <Box className={classes.root}>
      <Hidden smDown>
        <Cover
          showControls={isOwner}
          src={user.coverUrl}
          onFileInputChange={onCoverUrlChange}
          onNewImageClick={onNewCoverImageClick}
          onDeleteImageClick={onDeleteCoverImageClick} />
      </Hidden>
      <Box className={classes.topControls}>
        <Box display="flex" alignItems="center">
          <Hidden smDown>
            <ProfileStatistics
              className={classes.profileStatistics}
              isOwner={isOwner}
              userName={user.userName}
              followersCount={user?.followersCount}
              followingsCount={user?.followingsCount}
              favoritesCount={user?.favoritesCount} />
          </Hidden>
          <Hidden mdUp>
            <Typography variant="subtitle1">{user.name}</Typography>
          </Hidden>
        </Box>
        <IconButton
          className={classes.control}
          aria-label="Profile menu"
          aria-haspopup="true"
          onClick={onMenuClick}>
          <MoreVertIcon />
        </IconButton>
      </Box>
      <Hidden mdUp>
        <Box display="flex" paddingX={2} marginBottom={2}>
          <Avatar
            className={classes.avatarHeader}
            src={user.avatarUrl}
            online={isOwner || !user.offlineDate}
            live={user.live} // TODO: add a condition to check is not it me
            size="large"
            borderColor={USER_RANKING[user.ranking]}
            borderWidth="4px" />
          <ProfileStatisticsMobile
            className={classes.profileStatistics}
            isOwner={isOwner}
            userName={user.userName}
            followersCount={user?.followersCount}
            followingsCount={user?.followingsCount}
            favoritesCount={user?.favoritesCount}
            onSubscribeClick={onSubscribeClick} />
        </Box>
      </Hidden>
      {/* <Menu 
        isOwner={isOwner}
        isFollow={user.isFollow}
        isFavorite={user.isFavorite}
        anchorEl={menuAnchor} 
        onFavoriteClick={onFavoriteClick}
        onShareClick={onShareClick}
        onClose={() => setMenuAnchor(null)} /> */}
    </Box>
  );
}

export default ProfileHeader;
