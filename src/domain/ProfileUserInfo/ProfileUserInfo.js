import React, { useRef } from "react";

import {
  Typography,
  Card,
  CardHeader,
  CardMedia,
  CardActionArea,
  Button,
  Box,
} from "@material-ui/core/";

import DisplayName from "../../components/DisplayName";

import useStyles from "./style";

function ProfileUserInfo({
  user,
  isOwner,
  children,

  onMoodUpdateClick,
  onNewAvatarImageClick,
  onAvatarUrlChange,
}) {
  const fileInputEl = useRef(null);
  const classes = useStyles({ isOwner });

  const handleMoodUpdateClick = () => {
    onMoodUpdateClick &&
      onMoodUpdateClick({ ...user, defaultValue: user.mood });
  };

  const handleNewImageClick = () => {
    fileInputEl.current.click();

    onNewAvatarImageClick && onNewAvatarImageClick();
  };

  const handleAvatarUrlChange = () => {
    const { files } = fileInputEl.current;

    if (files.length === 1) {
      onAvatarUrlChange && onAvatarUrlChange(files[0]);
    }
  };

  const renderFileInput = () => (
    <input
      hidden
      type="file"
      name="avatarUrl"
      ref={fileInputEl}
      onChange={handleAvatarUrlChange}
    />
  );

  const renderChangeImg = () => {
    if (isOwner) {
      return user.avatarUrl ? (
        <CardActionArea onClick={handleNewImageClick}>
          <CardMedia
            component="img"
            alt={user.name}
            image={user.avatarUrl}
            title={user.name}
          />
          {renderFileInput()}
        </CardActionArea>
      ) : (
        <Box display="flex" justifyContent="center" marginTop={2}>
          <Button
            disableElevation
            size="large"
            color="secondary"
            variant="contained"
            onClick={handleNewImageClick}>
            Load avatar
            {renderFileInput()}
          </Button>
        </Box>
      );
    }
    return user.avatarUrl ? (
      <CardMedia
        component="img"
        alt={user.name}
        image={user.avatarUrl}
        title={user.name}
      />
    ) : null;
  };
  return (
    <>
      <Card>
        {renderChangeImg()}
        <CardHeader
          className={classes.cardHeader}
          title={
            <DisplayName
              name={user.name}
              userName={user.userName}
              identityVerified={user.identityVerified}
              noWrap={false}
            />
          }
          subheader={
            isOwner ? (
              <Typography
                variant="subtitle1"
                color="textSecondary"
                className={classes.mood}
                onClick={handleMoodUpdateClick}
                align="justify">
                {user.mood ? user.mood : isOwner && "What's on your mind?"}
              </Typography>
            ) : (
              user.mood && (
                <Typography
                  variant="subtitle1"
                  color="textSecondary"
                  align="justify"
                  className={classes.breakText}
                  component="p">
                  {user.mood}
                </Typography>
              )
            )
          }
        />
      </Card>
      {children}
    </>
  );
}

export default ProfileUserInfo;
