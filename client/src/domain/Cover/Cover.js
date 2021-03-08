import React, { useState } from "react";
import { Box, Typography, IconButton, Hidden, Tooltip } from "@material-ui/core";

import ArrowBackIcon from "@material-ui/icons/ArrowBackRounded";
import MoreVertIcon from "@material-ui/icons/MoreVertRounded";

import EditIcon from "@material-ui/icons/Edit";
import FileInput from "../../components/FileInput";
import Avatar from "../../components/Avatar";
import { USER_RANKING } from "../../constants/user";

import { ProfileStatistics, ProfileStatisticsMobile } from "../../domain/ProfileStatistics";

import Menu from "./Menu";

import useStyles from "./styles";
import { useHistory } from "react-router-dom";

function Cover(props) {
  const { user } = props;

  const history = useHistory();
  const classes = useStyles({ imageUrl: user.coverUrl });
  const [menuAnchor, setMenuAnchor] = useState(false);

  const { isOwner } = props;
  const {
    onFavoriteClick,
    onSendGiftClick,
    onEditCover,
    onShareClick,
    onSubscribeClick
  } = props;

  const handleCoverChange = (e) => {
    const files = e.target.files;

    if (files && files.length) {
      const coverUrl = URL.createObjectURL(files[0]);
      onEditCover && onEditCover({ coverUrl, file: files[0] });
    }
  };

  return (
    <Box className={classes.root}>
      <Hidden smDown>
        <Box className={classes.cover}>
          {isOwner && (
            <FileInput onChange={handleCoverChange}>
              <Tooltip title="Change cover image">
                <IconButton className={classes.coverEditButton}>
                  <EditIcon />
                </IconButton>
              </Tooltip>
            </FileInput>
          )}
        </Box>
      </Hidden>
      <Box className={classes.topControls}>
        <Box display="flex" alignItems="center">
          <IconButton className={classes.control} onClick={() => history.goBack()}>
            <ArrowBackIcon />
          </IconButton>
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
          onClick={(e) => setMenuAnchor(e.currentTarget)}>
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
      <Menu 
        isOwner={isOwner}
        isFollow={user.isFollow}
        isFavorite={user.isFavorite}
        anchorEl={menuAnchor} 
        onFavoriteClick={onFavoriteClick}
        onShareClick={onShareClick}
        onClose={() => setMenuAnchor(null)} />
    </Box>
  );
}

export default Cover;
