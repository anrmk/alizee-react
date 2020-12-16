import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import clsx from 'clsx';
import { Typography } from "@material-ui/core";

import RoomChatTab from "./RoomChatTab"
import { MessageSenderInput, MessagesList } from "../../components/Chat";
import useStyles, { StyledTab, StyledTabs } from "./styles";

const CHAT_TABS = {
  "peoples": 0,
  "chat": 1,
  "menu": 2
}

function StreamTabs({
  user,
  data,
  drawerTabChatMessageList = false,

  onMessageCreate
}) {
  const classes = useStyles();
  const { t } = useTranslation();

  const [currentTab, setCurrentTab] = useState(CHAT_TABS.chat);

  return (
    <>
      <StyledTabs
        value={currentTab}
        onChange={(_, value) => setCurrentTab(value)}
        variant="fullWidth"
        aria-label="full width tabs">
        <StyledTab value={CHAT_TABS.peoples} label={t("MeetRoomTabPeoplesLabel")} />
        <StyledTab className={classes.roomMiddleTab} value={CHAT_TABS.chat} label={t("MeetRoomTabChatLabel")} />
        <StyledTab value={CHAT_TABS.menu} label={t("MeetRoomTabMenuLabel")} />
      </StyledTabs>

      <RoomChatTab className={classes.roomBoxTabChat}
        value={currentTab} index={CHAT_TABS.peoples}>
        <Typography variant="h6">Peoples</Typography>
      </RoomChatTab>
      <RoomChatTab
        className={classes.roomBoxTabChat}
        value={currentTab}
        index={CHAT_TABS.chat}>
        <MessagesList
          className={clsx(classes.roomBoxTabChatMessageList, drawerTabChatMessageList && classes.roomBoxDrawerTabChatMessageList)}
          userId={user.id}
          items={data?.messages}
          liveChat={true} />
        <MessageSenderInput onSendMessageClick={onMessageCreate} />
      </RoomChatTab>
      <RoomChatTab className={classes.roomBoxTabChat}
        value={currentTab} index={CHAT_TABS.menu}>
        <Typography variant="h6">Menu</Typography>
      </RoomChatTab>
    </>
  );
};

export default StreamTabs;
