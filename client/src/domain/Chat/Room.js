import React, { useCallback } from "react";
import { Link } from "react-router-dom";
// import { useTranslation } from "react-i18next";

import { Box, Divider, Card, CardActions, CardContent, CardHeader, IconButton, Typography } from "@material-ui/core";

import MoreVertIcon from "@material-ui/icons/MoreVertRounded";
import BackIcon from "@material-ui/icons/ArrowBackRounded";
import VoiceChatIcon from "@material-ui/icons/VoiceChat";

import Avatar from "../../components/Avatar";
import { MessageSenderInput, MessagesList } from "../../components/Chat";

import { PROFILE_USERNAME_ROUTE } from "../../constants/routes";
import { formatDate } from "../../helpers/functions";

import useStyles from "./styles";

function Room({
  user,
  current,
  isLoading,

  onClose,
  onMenuClick,
  onMessageCreate,
  onMediaView,
  onVideoStreem,
  onSendTip
}) {
  const classes = useStyles();
  // const { t } = useTranslation();

  const {userName, name, avatarUrl, showActivity, offlineDate, messages} = current || {};

  const handleMessageCreate = (data) => {
    onMessageCreate && onMessageCreate(data);
  };

  const handleVideoClick = (e) => {
    e.preventDefault();
    onVideoStreem && onVideoStreem(userName);
  }

  const handleSendTipClick = useCallback(() => {
    onSendTip && onSendTip({ name, userName, avatarUrl});
  }, [current]);

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Link to={PROFILE_USERNAME_ROUTE(userName)}>
            <Avatar src={avatarUrl} />
          </Link>
        }
        title={name}
        subheader={showActivity && (offlineDate ? formatDate(offlineDate) : "online")}
        action={
          <>
            <IconButton onClick={onClose}>
              <BackIcon />
            </IconButton>
            <IconButton onClick={handleVideoClick}>
              <VoiceChatIcon />
            </IconButton>
            <IconButton onClick={onMenuClick}>
              <MoreVertIcon />
            </IconButton>
          </>
        }
      />

      <Divider />

      <CardContent className={classes.cardContent}>
        <MessagesList
          userName={user.userName}
          items={messages}
          onMediaView={onMediaView}
          onFetchMore={(e) => { console.log("Fetch more")}}
        />
      </CardContent>
      <CardActions className={classes.cardFooter}>
        {!current.isRestricted ? (
            <MessageSenderInput disabled={isLoading} onSendMessageClick={handleMessageCreate} onSendTip={handleSendTipClick} />
          ) : (
            <Box width="100%" textAlign="center">
              <Typography>You was restricted.</Typography>
            </Box>
          )
        }
      </CardActions>
    </Card>
  );
}

export default Room;
