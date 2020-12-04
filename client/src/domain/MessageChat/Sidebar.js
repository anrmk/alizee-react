import React from "react";
import { Box, Paper } from "@material-ui/core/";
import { useTranslation } from "react-i18next";

import Search from "../../components/Search";
import SidebarToolbar from "./SidebarToolbar";
import ChatsList from "./ChatsList"
import useStyles from './styles';

function Sidebar({
  chatsLoading = false,
  user,
  currentRoom,
  chats,

  onSearchChange,
  onChatClick
}) {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Box className={classes.sidebar}>
      <SidebarToolbar name={user.name} username={user.username} avatarUrl={user.avatarUrl} />
      <Paper className={classes.searchWrapper}>
        <Search placeholder={t("ChatSidebarSearchInputLabel")} onChange={onSearchChange} />
      </Paper>
      <ChatsList loading={chatsLoading} items={chats} currentChat={currentRoom?.id} onItemClick={onChatClick} />
    </Box>
  )
}

export default Sidebar
