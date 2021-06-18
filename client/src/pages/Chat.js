import React, { useEffect, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import { connect } from "react-redux";

import ApiContext from "../context/ApiContext";

import { Room, Sidebar } from "../domain/Chat";
import SlidingViews from "../components/SlidingViews";

import * as actionChat from "../store/actions/chat";

import { ESC_KEY_CODE } from "../constants/key_codes";
import { PEAR_TO_PEAR_ID_ROUTE } from "../constants/routes";

import { useNewChatDialog, useRoomMenuDialog, useChatHub } from "../hooks/chat";
import useSlidingViews, { RIGHT_OPEN_TYPE } from "../hooks/useSlidingViews";
import useDialog from "../hooks/useDialog";
import useFullScreen from "../hooks/useFullScreen";
import { useSendTipDialog } from "../hooks/payment";
import useLightboxModal from "../hooks/useLightboxModal";

function Chat(props) {
  const apiClient = useContext(ApiContext);
  const history = useHistory();

  const { username } = useParams();

  const { user, isAuthenticated } = props;
  const { chat, current, getRoom, setRoom, getRooms, filterRooms, resetCurrentRoom } = props;
  const { createMessage } = props;
  const { addMessage } = props;

  const sendTipDialog = useSendTipDialog();
  const newChatDialog = useNewChatDialog();
  const roomMenuDialog = useRoomMenuDialog((id) => {
    toggleSlidingViewsState();
  });
  const lightboxModal = useLightboxModal();
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

  const handleRoomsFilter = (e) => {
    filterRooms(e.target.value.toLowerCase());
  };

  const handleRoomGet = async (userName) => {
    if (current?.userName !== userName) {
      await getRoom(apiClient, userName);
      toggleSlidingViewsState();
    }
  };

  const handleRoomClose = (e) => {
    toggleSlidingViewsState();
    resetCurrentRoom();
  };

  const handleMessageCreate = async (data) => {
    if (data && (data.message.length || data.media.length)) {
      await createMessage(apiClient, {
        id: current.id,
        message: data.message,
        mediaFiles: data.media,
      });
    }
  };

  const handleCallToPeer = (userName) => {
    fullScreen.toggle(true);
    history.push(PEAR_TO_PEAR_ID_ROUTE(userName));
  };

  return (
    <SlidingViews mobileOnly currentState={currentSlidingViewsState} firstSize={4} secondSize={8}>
      <Sidebar
        isLoading={chat.isFetching}
        user={user}
        items={chat.data}
        selectedItemId={current?.id}
        onItemClick={handleRoomGet}
        onSearchChange={handleRoomsFilter}
        onNewChatClick={newChatDialog.toggle}
      />

      {current && (
        <Room
          current={current}
          user={user}
          isLoading={chat.isFetching}
          onClose={handleRoomClose}
          onMenuClick={() => {
            roomMenuDialog.toggle({ postId: current?.id, userName: current?.userName });
          }}
          onMessageCreate={handleMessageCreate}
          onMediaView={lightboxModal.toggle}
          onVideoStreem={handleCallToPeer}
          onSendTip={sendTipDialog.toggle}
        />
      )}
    </SlidingViews>
  );
}

function mapStateToProps(state) {
  return {
    user: {
      id: state.signIn?.userInfo?.id,
      userName: state.signIn?.userInfo?.userName,
      name: state.signIn?.userInfo?.name,
      avatarUrl: state.signIn?.userInfo?.avatarUrl,
    },
    isAuthenticated: state.signIn.isAuthenticated,
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
    getRooms: (api) => dispatch(actionChat.getRooms(api)),
    getRoom: (api, userName) => dispatch(actionChat.getRooms(api, userName)),
    filterRooms: (query) => dispatch(actionChat.filter(query)),

    setRoom: (api, userName) => dispatch(actionChat.setRoom(api, userName)),
    resetCurrentRoom: () => dispatch(actionChat.resetCurrentRoom()),

    createMessage: (api, id, message) => dispatch(actionChat.createMessage(api, id, message)),
    addMessage: (message,api) => dispatch(actionChat.addMessage(message,api)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
