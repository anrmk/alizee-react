import React, { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

import { Divider, Card, CardActions, CardContent, CardHeader, IconButton, Hidden } from "@material-ui/core";

import SendOutlinedIcon from "@material-ui/icons/SendRounded";
import MoreVertIcon from "@material-ui/icons/MoreVertRounded";
import BackIcon from "@material-ui/icons/ArrowBackRounded";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOnOutlined";

import Avatar from "../../components/Avatar";
import { MessageSenderInput, MessagesList } from "../../components/Chat";
import Empty from "../../components/Chat/Empty";

import { ESC_KEY_CODE } from "../../constants/key_codes";

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
  onSendTip
}) {
  const classes = useStyles();
  const { t } = useTranslation();

  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
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

  const handleSendTipClick = useCallback(() => {
    onSendTip && onSendTip({name: data.name, userName: data.username, avatarUrl: data.avatarUrl});
  }, [data]);

  return (
    <>
      {data ? (
        <Card className={classes.card}>
          <CardHeader
            avatar={<Avatar src={data.avatarUrl} />}
            title={data.name}
            subheader={data.showActivity && (data.offlineDate ? formatDate(data.offlineDate) : "online")}
            action={
              <>
                <IconButton onClick={onClose}>
                  <BackIcon />
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
            onAccountBlock={handleAccountBlock}
          ></RoomMenu>

          <Divider />

          <CardContent className={classes.cardContent}>
            <MessagesList userId={userId} items={data.messages} />
          </CardContent>
          <CardActions className={classes.cardFooter}>
            <MessageSenderInput onSendMessageClick={onMessageCreate} onSendTip={handleSendTipClick} />
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
