import React from "react";
import PropTypes from "prop-types";
import { Grid, Box, Typography, IconButton, Divider } from "@material-ui/core";

import EditIcon from "@material-ui/icons/Edit";
import Avatar from "../../components/Avatar";

import Controls from "./Controls";

import useStyles from "./styles";

function Cover(props) {
  const { isOwner, isOnline, isLive, isFollow, imageUrl, fullName, userName, avatarUrl, membership, mood } = props;
  const { onMessageClick, onFollowClick, onSendGiftClick, onEditCover } = props;

  const classes = useStyles({ imageUrl });

  return (
    <Box marginBottom={10} position="relative">
      <Box className={classes.cover}>
        <Box p={3}>
          <Typography variant="caption" >{mood}</Typography>
        </Box>
        {isOwner && (
          <IconButton onClick={onEditCover} style={{ zIndex: 1000 }}>
            <EditIcon />
          </IconButton>
        )}

        <Grid container className={classes.coverBox}>
          <Grid item>
            <Grid container direction="row" justify="flex-start" alignItems="flex-end">
              <Grid item>
                <Avatar
                  src={avatarUrl}
                  size="extraLarge"
                  bordermembership={membership}
                  online={isOnline}
                  live={isLive}
                  borderColor="gold"
                  className={classes.avatar}
                />
              </Grid>
              <Grid item>
                <Typography variant="h6">{fullName}</Typography>
                <Typography variant="subtitle2">{userName}</Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item>
            <Controls
              isOwner={isOwner}
              isFollow={isFollow}
              onMessageClick={onMessageClick}
              onFollowClick={onFollowClick}
              onSendGiftClick={onSendGiftClick}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

Cover.propTypes = {
  isOwner: PropTypes.bool,
  isOnline: PropTypes.bool,
  isLive: PropTypes.bool,
  isFollow: PropTypes.bool,

  imageUrl: PropTypes.string,
  fullName: PropTypes.string,
  userName: PropTypes.string,
  avatarUrl: PropTypes.string,
  membership: PropTypes.number,
  mood: PropTypes.string,

  onEditCover: PropTypes.func,
  onMessageClick: PropTypes.func,
  onFollowClick: PropTypes.func,
  onSendGiftClick: PropTypes.func,
};

Cover.defaultProps = {
  isOwner: false,
  isOnline: false,
  isLive: false,
  isFollow: false,

  imageUrl: "",
  fullName: "",
  userName: "",
  avatarUrl: "",
  membership: 0,
  mood: "",

  onEditCover: undefined,
  onMessageClick: undefined,
  onFollowClick: undefined,
  onSendGiftClick: undefined,
};

export default Cover;
