import React from "react";
import PropTypes from "prop-types";
import { Box, Typography, IconButton } from "@material-ui/core";

import EditIcon from "@material-ui/icons/Edit";
import Avatar from "../../components/Avatar";

import Controls from "./Controls";

import useStyles from "./styles";

function Cover(props) {
  const {
    isOwner,
    isOnline,
    isLive,
    isFollowing,
    imageUrl,
    fullName,
    username,
    avatarUrl,
    membership,
    feeling,
  } = props;

  const { onMessageClick, onFollowClick, onSendGiftClick, onEditCover } = props;

  const classes = useStyles({ imageUrl });

  return (
    <Box  marginBottom={9} position="relative">
      <Box className={classes.cover}>
        <Typography variant="body2" >{feeling}</Typography>

        {isOwner && (
          <IconButton onClick={onEditCover} style={{ zIndex: 1000 }}>
            <EditIcon />
          </IconButton>
        )}
      </Box>

      <Box className={classes.coverBox}>
        <Box display="flex" flexWrap="wrap" alignItems="flex-end" flexGrow={1}>
          <Avatar
            src={avatarUrl}
            size="extraLarge"
            bordermembership={membership}
            online={isOnline}
            live={isLive}
            borderColor="gold"
            className={classes.avatar}
          />
          <Box>
            <Typography variant="h6">{fullName}</Typography>
            <Typography variant="caption">{username}</Typography>
          </Box>
        </Box>

        <Box display="flex" flexWrap="noWrap" alignItems="flex-end">
          <Controls
            isOwner={isOwner}
            isFollowing={isFollowing}

            onMessageClick={onMessageClick}
            onFollowClick={onFollowClick}
            onSendGiftClick={onSendGiftClick}
          />
        </Box>
      </Box>
    </Box>
  );
}

Cover.propTypes = {
  isOwner: PropTypes.bool,
  isOnline: PropTypes.bool,
  isLive: PropTypes.bool,
  isFollowing: PropTypes.bool,

  imageUrl: PropTypes.string,
  fullName: PropTypes.string,
  username: PropTypes.string,
  avatarUrl: PropTypes.string,
  membership: PropTypes.number,

  onEditCover: PropTypes.func,
  onMessageClick: PropTypes.func,
  onFollowClick: PropTypes.func,
  onSendGiftClick: PropTypes.func,
};

Cover.defaultProps = {
  isOwner: false,
  isOnline: false,
  isLive: false,
  isFollowing: false,

  imageUrl: "",
  fullName: "",
  username: "",
  avatarUrl: "",
  membership: 0,

  onEditCover: undefined,
  onMessageClick: undefined,
  onFollowClick: undefined,
  onSendGiftClick: undefined,
};

export default Cover;
