import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { Divider, Card, CardActions, CardContent, CardHeader, IconButton, Hidden } from "@material-ui/core";

import SendOutlinedIcon from "@material-ui/icons/SendRounded";
import MoreVertIcon from "@material-ui/icons/MoreVertRounded";
import BackIcon from "@material-ui/icons/ArrowBackRounded";
import VoiceChatIcon from "@material-ui/icons/VoiceChat";

import Avatar from "../../components/Avatar";
import { MessageSenderInput, MessagesList } from "../../components/Chat";
import Empty from "../../components/Chat/Empty";

import { PROFILE_USERNAME_ROUTE } from "../../constants/routes";
import { formatDate } from "../../helpers/functions";

import RoomMenu from "./RoomMenu";

import useStyles from "./styles";

function Room({
  userId,
  data,

  onClose,
  onMessageCreate,
  onMessageClear,
  onRoomDelete,
  onAccountBlock,
  onMediaView,
  onVideoStreem,
  onSendTip
}) {
  const classes = useStyles();
  const { t } = useTranslation();

  const [anchorEl, setAnchorEl] = useState(null);
  const [isSendMessage, setIsSendMessage] = useState(false);
  const isMenuOpen = Boolean(anchorEl);
  const {id, userName, name, avatarUrl, showActivity, offlineDate, messages} = data || {};

  useEffect(() => {
    if (messages) {
      setIsSendMessage(false);
    }
  }, [messages]);

  const handleMenuOpen = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMessageCreate = (d) => {
    setIsSendMessage(true);
    onMessageCreate && onMessageCreate(d);
  };

  const handleMessageClear = useCallback((e) => {
    e.preventDefault();
    handleMenuClose();
    onMessageClear && onMessageClear(id);
  }, [id]);

  const handleRoomDelete = useCallback((e) => {
    e.preventDefault();
    handleMenuClose();
    onRoomDelete && onRoomDelete(id);
  }, [id]);

  const handleAccountBlock = (e) => {
    e.preventDefault();
    handleMenuClose();
    onAccountBlock && onAccountBlock(id, userName)
  }

  const handleVideoClick = (e) => {
    e.preventDefault();
    onVideoStreem && onVideoStreem(userName);
  }

  const handleSendTipClick = useCallback(() => {
    onSendTip && onSendTip({ name, userName, avatarUrl});
  }, [data]);

  return (
    <>
      {data ? (
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
                <IconButton onClick={handleVideoClick} >
                  <VoiceChatIcon/>
                </IconButton>
                <IconButton
                  aria-label="settings"
                  ref={anchorEl}
                  aria-controls={id}
                  aria-haspopup="true"
                  onClick={handleMenuOpen}>
                  <MoreVertIcon />
                </IconButton>
              </>
            }
          />

          <RoomMenu
            id={id}
            userName={userName}
            anchorEl={anchorEl}
            open={isMenuOpen}
            onClose={handleMenuClose}
            onMessageClear={handleMessageClear}
            onRoomDelete={handleRoomDelete}
            onAccountBlock={handleAccountBlock} />

          <Divider />

          <CardContent className={classes.cardContent}>
            <MessagesList isSendMessage={isSendMessage} userId={userId} items={messages} onMediaView={onMediaView}/>
          </CardContent>
          <CardActions className={classes.cardFooter}>
            <MessageSenderInput onSendMessageClick={handleMessageCreate} onSendTip={handleSendTipClick} />
          </CardActions>
        </Card>
      ) : (
        <Hidden smDown>
          <Empty
            title={t("ChatChatRoomEmptyTitle")}
            subTitle={t("ChatChatRoomEmptySubtitle")}
            iconComponent={<SendOutlinedIcon className={classes.icon} />}
          />
        </Hidden>
      )}
    </>
  );
}

export default Room;
