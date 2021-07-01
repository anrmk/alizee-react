import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import {
  Typography,
  Card,
  CardHeader,
  CardContent,
  CardMedia,
  CardActions,
  CardActionArea,
  Button,
  Divider,
  Box,
} from "@material-ui/core/";

import MessageIcon from "@material-ui/icons/MessageOutlined";
import DollarIcon from "@material-ui/icons/MonetizationOnOutlined";

import { CHAT_ROUTE } from "../../constants/routes";
import { USER_RANKING } from "../../constants/user";
import { SocialControl } from "../../components/Social";
import { getSubscriptionBtnText, isAwaitingConfirmation } from "./utils";
import DisplayName from "../../components/DisplayName";

import useStyles from "./style";

function ProfileUserInfo({
  user,
  isOwner,
  isFollow,
  subscriptionPrice,
  followStatus,
  sites,

  onSubscribeClick,
  onSendTipClick,
  onMoodUpdateClick,
  onNewAvatarImageClick,
  onDeleteAvatarImageClick,
  onAvatarUrlChange,
  onClick,
}) {
  const fileInputEl = useRef(null);
  const classes = useStyles({ isOwner });
  const { t } = useTranslation();

  const handleSendTipClick = () => {
    onSendTipClick && onSendTipClick(user);
  };

  const handleSubscribeClick = () => {
    onSubscribeClick && onSubscribeClick(user);
  };

  const handleNewImageClick = () => {
    fileInputEl.current.click();

    onNewAvatarImageClick && onNewAvatarImageClick();
  };

  const handleAvatarUrlChange = () => {
    const files = fileInputEl.current.files;

    if (files.length === 1) {
      onAvatarUrlChange && onAvatarUrlChange(files[0]);
    }
  };

  const renderFileInput = () => (
    <input hidden type="file" name="avatarUrl" ref={fileInputEl} onChange={handleAvatarUrlChange} />
  );

  const renderChangeImg = () => {
    if (isOwner) {
      return user.avatarUrl ? (
        <CardActionArea onClick={handleNewImageClick}>
          <CardMedia component="img" alt={user.name} image={user.avatarUrl} title={user.name} />
          {renderFileInput()}
        </CardActionArea>
      ) : (
        <Box display="flex" justifyContent="center" marginTop={2}>
          <Button disableElevation size="large" color="secondary" variant="contained" onClick={handleNewImageClick}>
            Load avatar
            {renderFileInput()}
          </Button>
        </Box>
      );
    } else {
      return user.avatarUrl ? (
        <CardMedia component="img" alt={user.name} image={user.avatarUrl} title={user.name} />
      ) : null;
    }
  };

  return (
    <Card>
      {renderChangeImg()}
      <CardHeader
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
              onClick={onMoodUpdateClick}
              align="justify"
            >
              {user.mood ? user.mood : isOwner && "What's on your mind?"}
            </Typography>
          ) : (
            user.mood && (
              <Typography
                variant="subtitle1"
                color="textSecondary"
                align="justify"
                className={classes.breakText}
                component="p"
              >
                {user.mood}
              </Typography>
            )
          )
        }
      />

      <Divider />
      <CardContent className={classes.content}>
        {isOwner ? (
          <Button
            disableElevation
            size="large"
            color="primary"
            variant="contained"
            to="statistics"
            component={Link}
            className={classes.btnMargin}
          >
            Statistics
          </Button>
        ) : (
          <>
            <Button
              className={classes.subscribeBtn}
              disableElevation
              size="large"
              color="primary"
              variant="contained"
              onClick={handleSubscribeClick}
            >
              {getSubscriptionBtnText(followStatus, subscriptionPrice, t)}
            </Button>
            <Box width="100%" display="flex" marginTop={2} marginBottom={2} flexDirection="column">
              <Button
                fullWidth
                disableElevation
                disabled={!isFollow || isAwaitingConfirmation(followStatus)}
                size="large"
                color="secondary"
                variant="contained"
                endIcon={<MessageIcon />}
                to={CHAT_ROUTE(user.userName)}
                component={Link}
                className={classes.btnMargin}
              >
                Message
              </Button>
              <Button
                fullWidth
                disableElevation
                size="large"
                color="secondary"
                variant="contained"
                endIcon={<DollarIcon />}
                onClick={handleSendTipClick}
              >
                Send Tip
              </Button>
            </Box>
          </>
        )}
        <Typography variant="body1" align="justify">
          {user.bio}
        </Typography>
      </CardContent>
      {sites?.length > 0 && (
        <>
          <Divider />
          <CardActions>
            <SocialControl urls={sites} onClick={onClick} />
          </CardActions>
        </>
      )}
    </Card>
  );
}

export default ProfileUserInfo;
