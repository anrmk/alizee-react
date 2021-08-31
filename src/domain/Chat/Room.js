import React, { useCallback } from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";
// import { useTranslation } from "react-i18next";

import {
  Divider,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
} from "@material-ui/core";

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
  isVerified,

  onClose,
  onMenuClick,
  onMessageCreate,
  onMediaView,
  onVideoStreem,
  onSendTip,
}) {
  const classes = useStyles();
  // const { t } = useTranslation();

  const { userName, name, avatarUrl, showActivity, offlineDate, messages } =
    current || {};

  const handleMessageCreate = (data) => {
    onMessageCreate && onMessageCreate(data);
  };

  const handleVideoClick = (e) => {
    e.preventDefault();
    onVideoStreem && onVideoStreem(userName);
  };

  const handleSendTipClick = useCallback(() => {
    onSendTip && onSendTip({ name, userName, avatarUrl });
  }, [current]);

  return (
    <Card className={clsx(classes.card, classes.roomRoot)}>
      <CardHeader
        avatar={
          <Link to={PROFILE_USERNAME_ROUTE(userName)}>
            <Avatar src={avatarUrl} />
          </Link>
        }
        title={name}
        subheader={
          showActivity && (offlineDate ? formatDate(offlineDate) : "online")
        }
        action={
          <>
            <IconButton onClick={onClose}>
              <BackIcon />
            </IconButton>
            {isVerified && (
              <IconButton onClick={handleVideoClick}>
                <VoiceChatIcon />
              </IconButton>
            )}
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
          onFetchMore={(e) => {
            console.log("Fetch more");
          }}
        />
      </CardContent>
      <CardActions className={classes.cardFooter}>
        <MessageSenderInput
          disabled={isLoading}
          currentFocus={false}
          onSendMessageClick={handleMessageCreate}
          onSendTip={handleSendTipClick}
        />
      </CardActions>
    </Card>
  );
}

export default Room;
