import React from "react";
import { useTranslation } from "react-i18next";
import ShowMoreText from "react-show-more-text";
import { Link } from "react-router-dom";

import { Typography, Box, Card, CardHeader, CardContent, Button } from "@material-ui/core/";

import MessageIcon from "@material-ui/icons/MessageOutlined";
import DollarIcon from "@material-ui/icons/MonetizationOnOutlined";

import { CHAT_ROUTE } from "../../constants/routes";
import { USER_RANKING } from "../../constants/user";
import Avatar from "../../components/Avatar";
import { getSubscriptionBtnText, isAwaitingConfirmation } from "./utils";

import useStyles from "./style";

function ProfileUserInfo({
  className,

  user,
  isOwner,
  isFollow,
  subscriptionPrice,
  followStatus,

  onSubscribeClick,
  onSendTipClick,
  onMoodUpdateClick,
  onNewAvatarImageClick,
  onDeleteAvatarImageClick,
  onAvatarUrlChange
}) {
  const classes = useStyles({ isOwner });
  const { t } = useTranslation();

  const handleSendTipClick = () => {
    onSendTipClick && onSendTipClick(user);
  }

  const handleSubscribeClick = () => {
    onSubscribeClick && onSubscribeClick(user);
  }

  const handleMoodUpdateClick = () => {
    onMoodUpdateClick && onMoodUpdateClick({ ...user, defaultValue: user.mood });
  }

  return (
    <Card>
      <CardHeader
        className={classes.header}
        avatar={
          <Avatar
            className={classes.avatarHeader}
            src={user.avatarUrl}
            online={isOwner || !user.offlineDate} 
            showControls={isOwner}
            live={user.live} // TODO: add a condition to check is not me
            size="huge"
            borderColor="silver"
            borderWidth="4px"
            dotWidth="12px"
            onFileInputChange={onAvatarUrlChange}
            onNewImageClick={onNewAvatarImageClick}
            onDeleteImageClick={onDeleteAvatarImageClick} />
        }
        title={<Typography variant="h6">{user.name}</Typography>}
        subheader={
          <>
            <Typography variant="subtitle1">@{user.userName}</Typography>
            <Typography variant="subtitle1" color="textSecondary" className={classes.mood} onClick={handleMoodUpdateClick}>
              {user.mood ? 
                user.mood : 
                isOwner && "What's on your mind?"}
            </Typography>
          </>
        } />
      <CardContent className={classes.content}>
        {isOwner ? (
          <Button
            disableElevation
            size="large"
            color="primary"
            variant="contained"
            to="statistics"
            component={Link}>
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
              onClick={handleSubscribeClick}>
              {getSubscriptionBtnText(followStatus, subscriptionPrice, t)}
            </Button>
            <Box className={classes.btnsGroup}>
              <Button
                disableElevation
                disabled={!isFollow || isAwaitingConfirmation(followStatus)}
                size="large"
                color="secondary"
                variant="contained"
                endIcon={<MessageIcon />}
                to={CHAT_ROUTE(user.userName)}
                component={Link}>
                Message
              </Button>
              <Button
                disableElevation
                size="large"
                color="secondary"
                variant="contained"
                endIcon={<DollarIcon />}
                onClick={handleSendTipClick}>
                Send Tip
              </Button>
            </Box>
          </>
        )}
        <Typography className={classes.bioHeader} variant="h6">
          Bio
        </Typography>
        <ShowMoreText
          className={classes.bio}
          lines={2}
          more="Show more"
          less="Show less"
          expanded={false}>
          {user.bio}
        </ShowMoreText>
      </CardContent>
    </Card>
  );
}

export default ProfileUserInfo;
