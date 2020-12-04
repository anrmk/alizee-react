import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Box } from "@material-ui/core";

import SendOutlinedIcon from '@material-ui/icons/SendOutlined';

import { ESC_KEY_CODE } from "../../constants/key_codes";
import ChatRoomToolbar from "./ChatRoomToolbar";
import MessagesList from "./MessagesList";
import MessageSender from "./MessageSender";
import Empty from "./Empty";
import useStyles from "./styles";

function ChatRoom({
  data,
  user,

  onClose,
  onMessageCreate
}) {
  const classes = useStyles();
  const { t } = useTranslation();

  const handleRoomCloseKeyPress = (e) => {
    if (e.keyCode === ESC_KEY_CODE) {
      onClose && onClose();
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", handleRoomCloseKeyPress, false);
    return () => {
      document.removeEventListener("keydown", handleRoomCloseKeyPress, false);
    }
  }, [])

  return (
    <Box className={classes.room} onKeyDown={handleRoomCloseKeyPress}>
      {data ? (
        <>
          <ChatRoomToolbar
            name={data.name}
            username={data.username}
            avatarUrl={data.avatarUrl}
            online={data.showActivity}
            lastOnlineDate={data.offlineDate}
            onCloseClick={onClose} />
          <MessagesList userId={user.id} items={data.messages} />
          <MessageSender onSendMessageClick={onMessageCreate} />
        </>
      ) : (
        <Empty
          title={t("ChatChatRoomEmptyTitle")}
          subTitle={t("ChatChatRoomEmptySubtitle")}
          iconComponent={<SendOutlinedIcon fontSize="large" />} />
      )}
    </Box>
  );
}

export default ChatRoom;
