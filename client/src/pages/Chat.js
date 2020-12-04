import React, { useState, useEffect, useContext } from "react";
import { connect } from "react-redux";
import { Container, Grid } from "@material-ui/core/";

import EditIcon from "@material-ui/icons/EditOutlined";

import ApiContext from "../context/ApiContext";

import FabContainer from "../components/FabContainer";
import { ChatRoom, Sidebar, FollowingDialog } from "../domain/MessageChat";

import * as actionRelationship from "../store/actions/relationship";
import * as actionChat from "../store/actions/chat";
import { ESC_KEY_CODE } from "../constants/key_codes";

function Chat(props) {
  const apiClient = useContext(ApiContext);

  const { user } = props;
  const { followings, getFollowings, filterFollowings } = props;
  const { chat, getRoom, createRoom, getRooms, filterRooms, resetCurrentRoom } = props;
  const { createMessage } = props;

  const [followersModalOpen, setFollowersModalOpen] = useState(false);

  const handleModalCloseKeyPress = (e) => {
    if (e.keyCode === ESC_KEY_CODE) {
      setFollowersModalOpen(false);
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", handleModalCloseKeyPress, false);
    return () => {
      document.removeEventListener("keydown", handleModalCloseKeyPress, false);
    }
  }, [])
  
  useEffect(() => {
    (async () => {
      if (followersModalOpen) {
        await getFollowings(apiClient, user.id);
      } else {
        await getRooms(apiClient);
      }
    })()
  }, [followersModalOpen]);

  const handleFilterFollowings = (e) => {
    filterFollowings(e.target.value.toLowerCase());
  };

  const handleFilterChats = (e) => {
    filterRooms(e.target.value.toLowerCase());
  }

  const handleGetRoom = async (roomId) => {
    if (chat.currentRoom?.id !== roomId){
      await getRoom(apiClient, roomId);
    }
  };

  const handleCreateChat = async (followerId) => {
    await createRoom(apiClient, followerId);
    setFollowersModalOpen(false);
  };

  const handleMessageCreate = async (message) => {
    if(message && message.length > 0) {
      await createMessage(apiClient, chat.currentRoom.id, message);
    }
  };

  return (
    <FabContainer
      component={Container}
      fabHide={!!chat.currentRoom}
      iconComponent={<EditIcon />}
      onFabClick={() => setFollowersModalOpen(true)}>
      <Grid container height="100vh" justify="center">
        <Grid item xs={4}>
          <Sidebar
            chatsLoading={chat.isFetching}
            user={user}
            currentRoom={chat.currentRoom}
            chats={chat.data}
            onSearchChange={handleFilterChats}
            onChatClick={handleGetRoom} />
        </Grid>
        <Grid item xs={8}>
          <ChatRoom
            data={chat.currentRoom}
            user={user}
            onClose={resetCurrentRoom}
            onMessageCreate={handleMessageCreate} />
        </Grid>
      </Grid>
      <FollowingDialog
        data={followings.data}
        open={followersModalOpen}
        onItemClick={handleCreateChat}
        onSearchChange={handleFilterFollowings}
        onClose={() => setFollowersModalOpen(false)} />
    </FabContainer>
  );
};

function mapStateToProps(state) {
  return {
    user: {
      id: state.signIn?.userInfo?.id,
      username: state.signIn?.userInfo?.userName,
      name: state.signIn?.userInfo?.name,
      avatarUrl: state.signIn?.userInfo?.avatarUrl
    },
    followings: {
      isFetching: state.relationship.isFetching,
      data: actionRelationship.getFilteredFollowings(state),
      errorMessage: state.relationship.errorMessage,
      keywords: state.keywords,
    },
    chat: {
      isFetching: state.chat.isFetching,
      data: actionChat.getFilteredRooms(state),
      errorMessage: state.chat.errorMessage,
      keywords: state.keywords,
      currentRoom: state.chat?.currentRoom
    }
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getFollowings: (api, userId) => dispatch(actionRelationship.getFollowings(api, userId)),
    filterFollowings: query => dispatch(actionRelationship.filterFollowings(query)),

    getRooms: api => dispatch(actionChat.getRooms(api)),
    filterRooms: query => dispatch(actionChat.filter(query)),

    getRoom: (api, id) => dispatch(actionChat.getRoom(api, id)),
    createRoom: (api, id) => dispatch(actionChat.createRoom(api, id)),
    resetCurrentRoom: () => dispatch(actionChat.resetCurrentRoom()),
    
    createMessage: (api, id, message) => dispatch(actionChat.createMessage(api, id, message)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat)
