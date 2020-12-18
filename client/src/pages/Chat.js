import React, { useState, useEffect, useContext } from "react";
import { connect } from "react-redux";
import { Container, Grid, Box } from "@material-ui/core/";

import ApiContext from "../context/ApiContext";

import { Room, Sidebar, FollowingDialog } from "../domain/Chat";

import * as actionRelationship from "../store/actions/relationship";
import * as actionChat from "../store/actions/chat";
import { ESC_KEY_CODE } from "../constants/key_codes";

function Chat(props) {
  const apiClient = useContext(ApiContext);

  const { user } = props;
  const { followings, getFollowings, filterFollowings } = props;
  const { chat, getRoom, createRoom, getRooms, deleteRoom, filterRooms, resetCurrentRoom } = props;
  const { createMessage } = props;

  const [followingsModalOpen, setFollowingsModalOpen] = useState(false);

  const handleModalCloseKeyPress = (e) => {
    if (e.keyCode === ESC_KEY_CODE) {
      setFollowingsModalOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleModalCloseKeyPress, false);
    return () => {
      document.removeEventListener("keydown", handleModalCloseKeyPress, false);
    };
  }, []);

  useEffect(() => {
    (async () => {
      if (followingsModalOpen) {
        await getFollowings(apiClient, user.id);
      } else {
        await getRooms(apiClient);
      }
    })();
  }, [followingsModalOpen]);

  const handleFollowingsFilter = (e) => {
    filterFollowings(e.target.value.toLowerCase());
  };

  const handleRoomsFilter = (e) => {
    filterRooms(e.target.value.toLowerCase());
  };

  const handleRoomGet = async (id) => {
    if (chat.currentRoom?.id !== id) {
      await getRoom(apiClient, id);
    }
  };

  const handleRoomCreate = async (followerId) => {
    await createRoom(apiClient, followerId);
    setFollowingsModalOpen(false);
  };

  const handleRoomDelete = async (id) => {
    await deleteRoom(apiClient, id);
  };

  const handleMessageCreate = async (message) => {
    if (message && message.length > 0) {
      await createMessage(apiClient, chat.currentRoom.id, message);
    }
  };

  const handleMessageClear = (id) => {
    console.log("handleMessageClear", id);
  };

  return (
    <Container>
      <Box my={4}>
        <Grid container spacing={2} direction="row">
          <Grid item md={4}>
            <Sidebar
              isLoading={chat.isFetching}
              user={user}
              items={chat.data}
              selectedItemId={chat.currentRoom?.id}
              onItemClick={handleRoomGet}
              onActionClick={handleRoomGet}
              onSearchChange={handleRoomsFilter}
              onNewChatClick={() => setFollowingsModalOpen(true)}
            />
          </Grid>
          <Grid item md={8}>
            <Room
              data={chat.currentRoom}
              userId={user.id}
              onClose={resetCurrentRoom}
              onMessageCreate={handleMessageCreate}
              onMessageClear={handleMessageClear}
              onRoomDelete={handleRoomDelete}
            />
          </Grid>
        </Grid>
      </Box>

      <FollowingDialog
        data={followings.data}
        open={followingsModalOpen}
        onItemClick={handleRoomCreate}
        onSearchChange={handleFollowingsFilter}
        onClose={() => setFollowingsModalOpen(false)}
      />
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
      currentRoom: state.chat?.currentRoom,
    },
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getFollowings: (api, userId) => dispatch(actionRelationship.getFollowings(api, userId)),
    filterFollowings: (query) => dispatch(actionRelationship.filterFollowings(query)),

    getRooms: (api) => dispatch(actionChat.getRooms(api)),
    filterRooms: (query) => dispatch(actionChat.filter(query)),

    getRoom: (api, id) => dispatch(actionChat.getRoom(api, id)),
    createRoom: (api, id) => dispatch(actionChat.createRoom(api, id)),
    deleteRoom: (api, id) => { console.log("handleRoomDelete", id); }, //dispatch(actionChat.deleteRoom(api, id)),
    resetCurrentRoom: () => dispatch(actionChat.resetCurrentRoom()),

    createMessage: (api, id, message) => dispatch(actionChat.createMessage(api, id, message)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
