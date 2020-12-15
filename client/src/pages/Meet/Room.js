import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { Box, Button, Grid, IconButton, Hidden, Popover, Typography } from "@material-ui/core";

import CallEndIcon from "@material-ui/icons/CallEnd";
import ChatIcon from "@material-ui/icons/Chat";
import CloseIcon from '@material-ui/icons/Close';
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MicNoneIcon from "@material-ui/icons/MicNone";
import VideocamIcon from "@material-ui/icons/Videocam";

import RoomChatTab from "../../domain/Meet/RoomChatTab"
import { MessageSenderInput, MessagesList } from "../../components/Chat";
import Video from "../../components/Video";
import useViewport from "../../hooks/useViewport";
import { BREAKPOINT_LG } from "../../constants/breakpoints"
import useStyles, { StyledButton, StyledDrawer, StyledTab, StyledTabs } from "./styles";

const CHAT_TABS = {
  "peoples": 0,
  "chat": 1,
  "menu": 2
}

function Room(props) {
  const data = undefined;

  const classes = useStyles();
  const { t } = useTranslation();

  const { roomId } = useParams();
  const { user } = props;

  const [currentTab, setCurrentTab] = useState(CHAT_TABS.chat);
  const [stream, setStream] = useState();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { width } = useViewport();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({
        video: {
          mandatory: {
            minWidth: 208,
            minHeight: 117,
            maxWidth: 208,
            maxHeight: 117
          }
        },
        // audio: true 
      })
      .then((stream) => {
        setStream(stream);
      });
  }, []);

  useEffect(() => {
    if (width > BREAKPOINT_LG && isDrawerOpen) {
      setIsDrawerOpen(false);
    }
  }, [width])

  const toggleDrawer = () => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    if (isDrawerOpen) {
      setIsDrawerOpen(false);
    } else {
      setIsDrawerOpen(true);
    }
  };

  const handleMessageCreate = async (message) => {
    console.log("handleMessageCreate", message);
  };

  return (
    <>
      <Grid className={classes.roomBox}>

        <Grid item className={classes.roomBoxVideo}>
          <Video classVideoName={classes.roomVideo}
            key={roomId}
            stream={stream}
          />
          <Box className={classes.roomBoxVideoButtons}>
            <StyledButton
              className={classes.roomBoxVideoButton}
              size="large"
              variant="contained"
              color="secondary"
              startIcon={<MicNoneIcon />}
              endIcon={<ExpandLessIcon />} />
            <StyledButton
              className={classes.roomBoxVideoButton}
              size="large"
              variant="contained"
              color="secondary"
              endIcon={<CallEndIcon />} />
            <StyledButton
              className={classes.roomBoxVideoButton}
              size="large"
              variant="contained"
              color="secondary"
              startIcon={<VideocamIcon />}
              endIcon={<ExpandLessIcon />} />
            <Hidden lgUp >
              <IconButton
                onClick={toggleDrawer()}>
                <ChatIcon />
              </IconButton>
            </Hidden>
          </Box>
        </Grid>

        <Hidden mdDown>
          <Grid item className={classes.roomBoxTabs}>
            <StyledTabs
              value={currentTab}
              onChange={(_, value) => setCurrentTab(value)}
              variant="fullWidth"
              aria-label="full width tabs">
              <StyledTab value={CHAT_TABS.peoples} label={t("RoomTabPeoplesTitle")} />
              <StyledTab className={classes.roomMiddleTab} value={CHAT_TABS.chat} label={t("RoomTabChatTitle")} />
              <StyledTab value={CHAT_TABS.menu} label={t("RoomTabMenuTitle")} />
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
                className={classes.roomBoxTabChatMessageList}
                userId={user.id}
                items={data?.messages}
                liveChat={true} />
              <MessageSenderInput onSendMessageClick={handleMessageCreate} />
            </RoomChatTab>
            <RoomChatTab className={classes.roomBoxTabChat}
              value={currentTab} index={CHAT_TABS.menu}>
              <Typography variant="h6">Menu</Typography>
            </RoomChatTab>
          </Grid>
        </Hidden>

      </Grid>

      <StyledDrawer
        anchor="right"
        variant="persistent"
        transitionDuration={0}
        open={isDrawerOpen}>

        <IconButton
          className={classes.roomBoxDrawerCloseButton}
          onClick={toggleDrawer()}>
          <CloseIcon />
        </IconButton>

        <StyledTabs
          value={currentTab}
          onChange={(_, value) => setCurrentTab(value)}
          variant="fullWidth"
          aria-label="full width tabs">
          <StyledTab value={CHAT_TABS.peoples} label={t("RoomTabPeoplesTitle")} />
          <StyledTab className={classes.roomMiddleTab} value={CHAT_TABS.chat} label={t("RoomTabChatTitle")} />
          <StyledTab value={CHAT_TABS.menu} label={t("RoomTabMenuTitle")} />
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
            className={classes.roomBoxDrawerTabChatMessageList}
            userId={user.id}
            items={data?.messages}
            liveChat={true} />
          <MessageSenderInput onSendMessageClick={handleMessageCreate} />
        </RoomChatTab>
        <RoomChatTab className={classes.roomBoxTabChat}
          value={currentTab} index={CHAT_TABS.menu}>
          <Typography variant="h6">Menu</Typography>
        </RoomChatTab>

      </StyledDrawer>
    </>
  );
};

function mapStateToProps(state) {
  return {
    user: {
      id: state.signIn?.userInfo?.id,
      username: state.signIn?.userInfo?.userName,
      name: state.signIn?.userInfo?.name,
      avatarUrl: state.signIn?.userInfo?.avatarUrl
    }
  };
}

export default connect(mapStateToProps)(Room);
