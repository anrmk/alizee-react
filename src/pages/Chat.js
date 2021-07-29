import React, { useEffect, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import { connect } from "react-redux";

import ApiContext from "../context/ApiContext";

import { Room, Sidebar, NoRoom } from "../domain/Chat";
import SlidingViews from "../components/SlidingViews";

import * as actionChat from "../store/actions/chat";

import { ESC_KEY_CODE } from "../constants/key_codes";
import {
  CHAT_USERNAME_ROUTE,
  PEAR_TO_PEAR_ID_ROUTE,
} from "../constants/routes";

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

  const { user } = props;
  const { chat, current, getRoom, getRooms, filterRooms, resetCurrentRoom } =
    props;
  const { createMessage } = props;

  const sendTipDialog = useSendTipDialog();
  const newChatDialog = useNewChatDialog();
  const roomMenuDialog = useRoomMenuDialog();
  const lightboxModal = useLightboxModal();
  const { currentSlidingViewsState, toggleSlidingViewsState } =
    useSlidingViews(RIGHT_OPEN_TYPE);
  const dialog = useDialog();
  const fullScreen = useFullScreen("root");

  useChatHub();

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
        await getRoom(apiClient, username);
        toggleSlidingViewsState();
      })();
    }
  }, [username]);

  const handleRoomsFilter = (e) => {
    filterRooms(e.target.value.toLowerCase());
  };

  const handleRoomGet = async (userName) => {
    if (current?.userName !== userName) {
      history.push(CHAT_USERNAME_ROUTE(userName));
    }
  };

  const handleRoomClose = (e) => {
    toggleSlidingViewsState();
    resetCurrentRoom();
  };

  const handleMessageCreate = async (data) => {
    if (data && (data.text.length || data.media.length)) {
      await createMessage(apiClient, {
        id: current.id,
        text: data.text,
        mediaFiles: data.media,
      });
    }
  };

  const handleCallToPeer = (userName) => {
    fullScreen.toggle(true);
    history.push(PEAR_TO_PEAR_ID_ROUTE(userName));
  };

  return (
    <SlidingViews
      mobileOnly
      currentState={currentSlidingViewsState}
      firstSize={4}
      secondSize={8}>
      <Sidebar
        isLoading={chat.isFetching}
        user={user}
        items={chat.data}
        selectedItemId={current?.id}
        onItemClick={handleRoomGet}
        onSearchChange={handleRoomsFilter}
        onNewChatClick={newChatDialog.toggle}
      />

      {current ? (
        <Room
          current={current}
          user={user}
          isVerified={user.identityVerified}
          isLoading={chat.isFetching}
          onClose={handleRoomClose}
          onMenuClick={() => {
            roomMenuDialog.toggle({
              postId: current?.id,
              userName: current?.userName,
              isBlocked: current.isBlocked,
            });
          }}
          onMessageCreate={handleMessageCreate}
          onMediaView={lightboxModal.toggle}
          onVideoStreem={handleCallToPeer}
          onSendTip={sendTipDialog.toggle}
        />
      ) : (
        <NoRoom />
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
      identityVerified: state.signIn?.userInfo?.identityVerified,
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
    getRoom: (api, userName) => dispatch(actionChat.getRoom(api, userName)),
    filterRooms: (query) => dispatch(actionChat.filter(query)),
    resetCurrentRoom: () => dispatch(actionChat.resetCurrentRoom()),

    createMessage: (api, data) => dispatch(actionChat.createMessage(api, data)),
    addMessage: (api, text) => dispatch(actionChat.addMessage(api, text)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);