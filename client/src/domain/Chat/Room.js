import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

import { Divider, Card, CardActions, CardContent, CardHeader, IconButton } from "@material-ui/core";

import SendOutlinedIcon from "@material-ui/icons/SendOutlined";
import MoreVertIcon from "@material-ui/icons/MoreVertOutlined";

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

  const handleRoomCloseKeyPress = (e) => {
    if (e.keyCode === ESC_KEY_CODE) {
      onClose && onClose();
    }
  };

  const handleMessageClear = (e) => {
    e.preventDefault();
    onMessageClear && onMessageClear(data.id);
  };

  const handleRoomDelete = (e) => {
    e.preventDefault();
    onRoomDelete && onRoomDelete(data.id);
  };

  useEffect(() => {
    document.addEventListener("keydown", handleRoomCloseKeyPress, false);
    return () => {
      document.removeEventListener("keydown", handleRoomCloseKeyPress, false);
    };
  }, []);

  return (
    <>
      {data ? (
        <Card className={classes.card} onKeyDown={handleRoomCloseKeyPress}>
          <CardHeader
            avatar={<Avatar src={data.avatarUrl} />}
            title={data.name}
            subheader={data.offlineDate && formatDate(data.offlineDate)}
            action={
              <IconButton
                aria-label="settings"
                ref={anchorEl}
                aria-controls={data.id}
                aria-haspopup="true"
                onClick={handleMenuOpen}
              >
                <MoreVertIcon />
              </IconButton>
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
          ></RoomMenu>

          <Divider />

          <CardContent className={classes.cardContent}>
            <MessagesList userId={userId} items={data.messages} />
          </CardContent>
          <CardActions className={classes.cardFooter}>
            <MessageSenderInput onSendMessageClick={onMessageCreate} />
          </CardActions>
        </Card>
      ) : (
        <Empty
          title={t("ChatChatRoomEmptyTitle")}
          subTitle={t("ChatChatRoomEmptySubtitle")}
          iconComponent={<SendOutlinedIcon fontSize="large" />}
        />
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
};

Room.defaultProps = {
  userId: "",

  onClose: undefined,
  onMessageCreate: undefined,
  onMessageClear: undefined,
  onRoomDelete: undefined,
};

export default Room;
