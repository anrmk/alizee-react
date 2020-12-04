import React from "react";
import { useTranslation } from "react-i18next";
import { List, CircularProgress } from "@material-ui/core";

import ChatIcon from '@material-ui/icons/ChatOutlined';

import ChatListItem from "./ChatListItem";
import useStyles from "./styles";
import Empty from './Empty';

function ChatsList({
  loading,
  currentChat,
  items,
  
  onItemClick
}) {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <List className={classes.chatList}>
      {items && items.length ? items.map(item => (
        <ChatListItem
          id={item.id}
          key={item.id}
          fullName={item.fullName}
          avatarUrl={item.avatarUrl}
          description={item.description}
          date={item.date}
          newMessages={item.newMessagesCount}
          active={currentChat === item.id}
          onClick={onItemClick} />
      )) : loading ? (
        <CircularProgress className={classes.progress} />
      ) : (
        <Empty
          title={t("ChatChatListEmptyTitle")}
          subTitle={t("ChatChatListEmptySubtitle")}
          iconComponent={<ChatIcon fontSize="large" />} />
      )}
    </List>
  )
}

export default ChatsList;
