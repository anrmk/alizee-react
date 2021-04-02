import React, { useEffect, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { Container } from "@material-ui/core/";

import ApiContext from "../context/ApiContext";

import { Room, Sidebar } from "../domain/Chat";
import SlidingViews from "../components/SlidingViews";

import * as actionRelationship from "../store/actions/relationship";
import * as actionChat from "../store/actions/chat";
import * as settings from "../store/actions/settings";
import * as paymentActions from "../store/actions/payment";

import { ESC_KEY_CODE } from "../constants/key_codes";
import { PEAR_TO_PEAR_ID_ROUTE } from "../constants/routes";

import useSlidingViews, { RIGHT_OPEN_TYPE } from "../hooks/useSlidingViews";
import useDialog from "../hooks/useDialog";
import useChatHub from "../hooks/useChatHub";
import useFullScreen from "../hooks/useFullScreen";

import { useSendTipDialog } from "../hooks/payment";
import { useMediaPreviewDialog } from "../hooks/media";

import dialogs, { CHAT_FOLLOWERS_TYPE } from "../constants/dialogs";

function Chat(props) {
  const apiClient = useContext(ApiContext);
  const history = useHistory();

  const { username } = useParams();

  const { user, isAuthenticated } = props;
  const { followings, getFollowings, filterFollowings } = props;
  const {
    chat,
    current,
    getRoom,
    createRoom,
    setRoom,
    getRooms,
    removeRoom,
    deleteRoom,
    deleteRoomHistory,
    filterRooms,
    block,
    resetCurrentRoom,
  } = props;
  const { createMessage } = props;
  const { addMessage } = props;

  const sendTipDialog = useSendTipDialog({ onSendTip: props.sendTip });
  const mediaViewDialog = useMediaPreviewDialog();
  const { currentSlidingViewsState, toggleSlidingViewsState } = useSlidingViews(RIGHT_OPEN_TYPE);
  const dialog = useDialog();
  const fullScreen = useFullScreen("root");

  useChatHub({
    isAuth: isAuthenticated,
    onReceiveMessage: addMessage,
  });

  const handleModalCloseKeyPress = (e) => {
    if (e.keyCode === ESC_KEY_CODE) {
      dialog.toggle({ open: false });
    }
  };

  useEffect(() => {
    (async () => {
      await getRooms(apiClient);
    })();

    document.addEventListener("keydown", handleModalCloseKeyPress, false);
    return () => {
      document.removeEventListener("keydown", handleModalCloseKeyPress, false);
      resetCurrentRoom();
    };
  }, []);

  useEffect(() => {
    if (username) {
      (async () => {
        await setRoom(apiClient, username);
      })();
    }
  }, [username]);

  useEffect(() => {
    if (followings.data.length) {
      dialog.setParams(
        dialogs[CHAT_FOLLOWERS_TYPE](
          {
            loading: false,
          },
          {
            items: followings.data,
            onItemClick: handleRoomCreate,
            onSearchChange: handleFollowingsFilter,
          }
        )
      );
    }
  }, [followings.data]);

  const handleFollowingsFilter = (e) => {
    filterFollowings(e.target.value.toLowerCase());
  };

  const handleRoomsFilter = (e) => {
    filterRooms(e.target.value.toLowerCase());
  };

  const handleRoomGet = async (userName) => {
    if (current?.userName !== userName) {
      await getRoom(apiClient, userName);
      toggleSlidingViewsState();
    }
  };

  const handleRoomCreate = async (userName) => {
    await createRoom(apiClient, userName);
    dialog.toggle({ open: false });
  };

  const handleRoomDelete = async (id) => {
    if (!window.confirm("Are you sure?")) {
      return;
    }

    await deleteRoom(apiClient, id);
    toggleSlidingViewsState();
  };

  const handleMessageCreate = async (data) => {
    debugger
    if (data && (data.message.length || data.media.length)) {
      await createMessage(apiClient, {
        id: current.id,
        message: data.message,
        mediaFiles: data.media,
      });
    }
  };

  const handleMessageClear = async (id) => {
    if (!window.confirm("Are you sure? This can not be undone!")) {
      return;
    }
    await deleteRoomHistory(apiClient, id);
  };

  const handleAccountBlock = async (id, userName) => {
    if (!window.confirm("Block this User? They won't be able to see your profile")) {
      return;
    }

    await block(apiClient, userName);
    await removeRoom(id);
    resetCurrentRoom();
  };

  const handleRoomClose = (data) => {
    if (data) {
      toggleSlidingViewsState();
      resetCurrentRoom();
    }
  };

  const handleCallToPeer = (userName) => {
    fullScreen.toggle(true);
    history.push(PEAR_TO_PEAR_ID_ROUTE(userName));
  };

  const handleUserListBtnClick = async () => {
    dialog.toggle(dialogs[CHAT_FOLLOWERS_TYPE]({ loading: true }));
    await getFollowings(apiClient, user.username);
  };

  return (
    <Container>
      <SlidingViews mobileOnly currentState={currentSlidingViewsState} firstSize={4} secondSize={8}>
        <Sidebar
          isLoading={chat.isFetching}
          user={user}
          items={chat.data}
          selectedItemId={current?.id}
          onItemClick={handleRoomGet}
          onSearchChange={handleRoomsFilter}
          onUserListBtnClick={handleUserListBtnClick}
        />

        <Room
          data={current}
          userId={user.id}
          onClose={handleRoomClose}
          onMessageCreate={handleMessageCreate}
          onMessageClear={handleMessageClear}
          onRoomDelete={handleRoomDelete}
          onAccountBlock={handleAccountBlock}
          onMediaView={mediaViewDialog.toggle}
          onVideoStreem={handleCallToPeer}
          onSendTip={sendTipDialog.toggle}
        />
      </SlidingViews>
    </Container>
  );
}

function mapStateToProps(state) {
  return {
    user: {
      id: state.signIn?.userInfo?.id,
      username: state.signIn?.userInfo?.userName,
      name: state.signIn?.userInfo?.name,
      avatarUrl: state.signIn?.userInfo?.avatarUrl,
    },
    isAuthenticated: state.signIn.isAuthenticated,
    followings: {
      isFetching: state.users.isFetching,
      data: actionRelationship.getFilteredFollowings(state),
      errorMessage: state.users.errorMessage,
      keywords: state.keywords,
    },
    chat: {
      isFetching: state.chat.isFetching,
      data: actionChat.getFilteredRooms(state),
      errorMessage: state.chat.errorMessage,
      keywords: state.keywords,
    },
    current: state.chat?.current,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getFollowings: (api, userId) => dispatch(actionRelationship.getFollowings(api, userId)),
    filterFollowings: (query) => dispatch(actionRelationship.filterFollowings(query)),

    getRooms: (api) => dispatch(actionChat.getRooms(api)),
    filterRooms: (query) => dispatch(actionChat.filter(query)),
    sendTip: (api, userName, amount, message) => dispatch(paymentActions.sendTip(api, userName, amount, message)),

    getRoom: (api, userName) => dispatch(actionChat.getRoom(api, userName)),
    setRoom: (api, userName) => dispatch(actionChat.setRoom(api, userName)),
    removeRoom: (id) => dispatch(actionChat.removeRoom(id)),
    createRoom: (api, userName) => dispatch(actionChat.createRoom(api, userName)),
    deleteRoom: (api, id) => dispatch(actionChat.deleteRoom(api, id)),
    deleteRoomHistory: (api, id) => dispatch(actionChat.deleteRoomHistory(api, id)),
    resetCurrentRoom: () => dispatch(actionChat.resetCurrentRoom()),

    block: (api, id) => dispatch(settings.createBlackList(api, id)),

    createMessage: (api, id, message) => dispatch(actionChat.createMessage(api, id, message)),

    addMessage: (message) => dispatch(actionChat.addMessage(message)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
