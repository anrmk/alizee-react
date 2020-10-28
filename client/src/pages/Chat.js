import React, { useState, useEffect, useContext } from "react";
import { connect } from "react-redux";

import ApiContext from '../context/ApiContext';

import Sidebar from "../domain/Chat/Sidebar";
import { Room, Empty } from "../domain/Chat";

import * as actionRelationship from '../store/actions/relationship';
import * as actionChat from '../store/actions/chat';

function Chat(props) {
  const apiClient = useContext(ApiContext);

  const { user } = props;
  const { followings, getFollowings, filterFollowings } = props;
  const { chat, getRoom, createRoom, getRooms, filterRooms } = props;
  const { createMessage } = props;

  const [modalShow, setModalShow] = useState(false);
  
  useEffect(() => {
    if (modalShow) {
      getFollowings(apiClient, user.id);
    } else {
      getRooms(apiClient);
    }
  }, [modalShow]);

  const handleFilterFollowings = (e) => {
    filterFollowings(e.target.value.toLowerCase());
  };

  const handleModalToggle = (e) => {
    setModalShow(!modalShow);
  };

  const handleFilterRooms = (e) => {
    filterRooms(e.target.value.toLowerCase());
  }

  const handleGetRoom = (roomId, name) => {
    getRoom(apiClient, roomId);
  };

  const handleCreateRoom = (followerId) => {
    createRoom(apiClient, followerId);
    setModalShow(false);
  };

  const handleCreateMessage = async (message) => {
    if(message && message.length > 0) {
      createMessage(apiClient, chat.currentRoom.id, message);
    }
  };

  return (
    <div className="container full-container p-4">
      <div className="row row-cols-2 no-gutters h-100 border">
        <div className="col-4 border-right">
          <Sidebar
            modalShow={modalShow}
            rooms={chat.data}
            room={chat.currentRoom}
            onFilterRooms={handleFilterRooms}
            onGetRoom={handleGetRoom}
            onCreateRoom={handleCreateRoom}
            onModalToggle={handleModalToggle}
            followings={followings.data}
            onFilterFollowers={handleFilterFollowings}
          />
        </div>
        <div className="col-8">
          {chat.currentRoom ? <Room room={chat.currentRoom} userId={user.id} onCreateMessage={handleCreateMessage} /> : <Empty />}
        </div>
      </div>
    </div>
  );
};


function mapStateToProps(state) {
  return {
    user: {
      id: state.signIn?.userInfo?.id,
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
    deleteRoom: (api, id) => {},
    
    createMessage: (api, id, message) => dispatch(actionChat.createMessage(api, id, message)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat)
