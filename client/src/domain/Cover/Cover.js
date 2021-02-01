import React, { useRef } from "react";
import PropTypes from "prop-types";
import { Grid, Box, Typography, IconButton } from "@material-ui/core";

import EditIcon from "@material-ui/icons/Edit";
import Avatar from "../../components/Avatar";

import Controls from "./Controls";

import useStyles from "./styles";

function Cover(props) {
  const { user } = props;
  const { isOwner, isFavorite, isLive, disabled } = props;
  const { onFavoriteClick, onMessageClick, onFollowClick, onSendGiftClick, onEditCover } = props;

  const classes = useStyles({ imageUrl: user.coverUrl });

  const mediaRef = useRef();

  const handleCoverChange = (e) => {
    const files = e.target.files;

    if (files && files.length) {
      const coverUrl = URL.createObjectURL(files[0]);
      onEditCover && onEditCover({ coverUrl, file: files[0] });
    }
  };

  return (
    <Box marginBottom={10} position="relative">
      <Box className={classes.cover}>
        <Box p={3}>
          <Typography variant="caption">{user.mood}</Typography>
        </Box>
        {isOwner && (
          <>
            <IconButton onClick={(e) => mediaRef.current.click()} className={classes.coverEditButton} disabled={disabled}>
              <EditIcon />
            </IconButton>

            <input
              className={classes.coverInputField}
              type="file"
              name="cover"
              ref={mediaRef}
              accept="image/jpeg, image/jpg, image/gif, image/png"
              onChange={handleCoverChange}
            />
          </>
        )}

        <Grid container className={classes.coverBox}>
          <Grid item>
            <Grid container direction="row" justify="flex-start" alignItems="flex-end">
              <Grid item>
                <Avatar
                  src={user.avatarUrl}
                  size="extraLarge"
                  membership={user.membership}
                  online={!user.offlineDate}
                  live={isLive}
                  borderColor="gold"
                  className={classes.avatar}
                />
              </Grid>
              <Grid item>
                <Typography variant="h6">{user.name}</Typography>
                <Typography variant="subtitle2">{user.userName}</Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item>
            <Controls
              isOwner={isOwner}
              isFollow={user.isFollow}
              isFavorite={user.isFavorite}

              onFavoriteClick={onFavoriteClick}
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
  user: PropTypes.object,

  isOwner: PropTypes.bool,
  isLive: PropTypes.bool,
  disabled: PropTypes.bool,

  onEditCover: PropTypes.func,
  onMessageClick: PropTypes.func,
  onFollowClick: PropTypes.func,
  onSendGiftClick: PropTypes.func,
};

Cover.defaultProps = {
  user: {},

  isOwner: false,
  isLive: false,
  disabled: false,

  onEditCover: undefined,
  onMessageClick: undefined,
  onFollowClick: undefined,
  onSendGiftClick: undefined,
};

export default Cover;
