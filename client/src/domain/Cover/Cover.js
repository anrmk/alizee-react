import React from "react";
import { Grid, Box, Typography, IconButton, Hidden, withWidth } from "@material-ui/core";

import EditIcon from "@material-ui/icons/Edit";
import Avatar from "../../components/Avatar";
import FileInput from "../../components/FileInput";

import Controls from "./Controls";

import useStyles from "./styles";

function Cover(props) {
  const { user, width } = props;
  const { isOwner, isLive, disabled } = props;
  const { onFavoriteClick, onMessageClick, onFollowClick, onSendGiftClick, onEditCover, onSendTipClick } = props;

  const classes = useStyles({ imageUrl: user.coverUrl });

  const handleCoverChange = (e) => {
    const files = e.target.files;

    if (files && files.length) {
      const coverUrl = URL.createObjectURL(files[0]);
      onEditCover && onEditCover({ coverUrl, file: files[0] });
    }
  };

  const handleSendTipClick = () => {
    onSendTipClick && onSendTipClick(user);
  };

  return (
    <Box marginBottom={2} position="relative">
      <Grid className={classes.cover}>
        <Box className={classes.caption}>{user.mood && <Typography>{user.mood}</Typography>}</Box>
        {isOwner && (
          <FileInput onChange={handleCoverChange}>
            <IconButton className={classes.coverEditButton} disabled={disabled}>
              <EditIcon />
            </IconButton>
          </FileInput>
        )}
      </Grid>

      <Grid container className={classes.coverBox} justify="space-between" alignItems="flex-end" wrap="nowrap">
        <Grid item>
          <Box display="flex" alignItems="flex-end">
            <Avatar
              src={user.avatarUrl}
              size={["lg", "md"].includes(width) ? "huge" : "big"}
              membership={user.membership}
              online={!user.offlineDate}
              live={isLive}
              borderColor="gold"
              className={classes.avatar}
            />
            <Hidden xsDown>
              {
                <Box>
                  <Typography variant="h6">{user.name}</Typography>
                  <Typography variant="subtitle2">{user.userName}</Typography>
                </Box>
              }
            </Hidden>
          </Box>
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
            onSendTipClick={handleSendTipClick}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default withWidth()(Cover);
