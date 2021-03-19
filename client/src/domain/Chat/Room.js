import React, { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
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

  useEffect(() => {
    if (data?.messages) {
      setIsSendMessage(false);
    }
  }, [data?.messages]);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMessageCreate = (data) => {
    setIsSendMessage(true);
    onMessageCreate && onMessageCreate(data);
  };

  const handleMessageClear = (e) => {
    e.preventDefault();
    handleMenuClose();
    onMessageClear && onMessageClear(data.id);
  };

  const handleRoomDelete = (e) => {
    e.preventDefault();
    handleMenuClose();
    onRoomDelete && onRoomDelete(data.id);
  };

  const handleAccountBlock = (e) => {
    e.preventDefault();
    handleMenuClose();
    onAccountBlock && onAccountBlock(data.id, data.followerId)
  }

  const handleVideoClick = (e) => {
    e.preventDefault();
    onVideoStreem && onVideoStreem(data.username);
  }

  const handleSendTipClick = useCallback(() => {
    onSendTip && onSendTip({name: data.name, userName: data.username, avatarUrl: data.avatarUrl});
  }, [data]);

  return (
    <>
      {data ? (
        <Card className={classes.card}>
          <CardHeader
            avatar={
              <Link to={PROFILE_USERNAME_ROUTE(data.username)}>
                <Avatar src={data.avatarUrl} />
              </Link>
            }
            title={data.name}
            subheader={data.showActivity && (data.offlineDate ? formatDate(data.offlineDate) : "online")}
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
                  aria-controls={data.id}
                  aria-haspopup="true"
                  onClick={handleMenuOpen}>
                  <MoreVertIcon />
                </IconButton>
              </>
            }
          />

          <RoomMenu
            id={data.id}
            userName={data.username}
            anchorEl={anchorEl}
            open={isMenuOpen}
            onClose={handleMenuClose}
            onMessageClear={handleMessageClear}
            onRoomDelete={handleRoomDelete}
            onAccountBlock={handleAccountBlock} />

          <Divider />

          <CardContent className={classes.cardContent}>
            <MessagesList isSendMessage={isSendMessage} userId={userId} items={data.messages} onMediaView={onMediaView}/>
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

Room.propTypes = {
  userId: PropTypes.string,
  data: PropTypes.any,

  onClose: PropTypes.func,
  onMessageCreate: PropTypes.func,
  onMessageClear: PropTypes.func,
  onRoomDelete: PropTypes.func,
  onAccountBlock: PropTypes.func
};

Room.defaultProps = {
  userId: "",

  onClose: undefined,
  onMessageCreate: undefined,
  onMessageClear: undefined,
  onRoomDelete: undefined,
  onAccountBlock: undefined
};

export default Room;
