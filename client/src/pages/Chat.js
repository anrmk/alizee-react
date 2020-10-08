import React, { useState, useEffect, useContext } from "react";
import { connect } from "react-redux";

import ApiContext from '../context/ApiContext';

import Sidebar from "../domain/Chat/Sidebar";
import Room from "../domain/Chat/Room";

import * as actionFollower from '../store/actions/follower';
import * as actionChat from '../store/actions/chat';

const Chat = (props) => {
  const apiClient = useContext(ApiContext);

  const { follower, getFollowers, filterFollowers } = props;
  const { chat, getRoom, createRoom, getRooms, filterRooms } = props;
  const { createMessage } = props;

  const [modalShow, setModalShow] = useState(false);
  
  useEffect(() => {
    if (modalShow) {
      getFollowers(apiClient);
    } else {
      getRooms(apiClient);
    }
  }, [modalShow]);

  const handleFilterFollowers = (e) => {
    filterFollowers(e.target.value.toLowerCase());
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
    createMessage(apiClient, chat.currentRoom.id, message);
  };

  return (
    <div className="container full-container p-4">
      <div className="row row-cols-2 no-gutters h-100 border">
        <div className="col-4 border-right">
          <Sidebar
            modalShow={modalShow}
            rooms={chat.data}
            onFilterRooms={handleFilterRooms}
            onGetRoom={handleGetRoom}
            onCreateRoom={handleCreateRoom}
            onModalToggle={handleModalToggle}
            followers={follower.data}
            onFilterFollowers={handleFilterFollowers}
          />
        </div>
        <div className="col-8">
          {chat.currentRoom && <Room room={chat.currentRoom} onCreateMessage={handleCreateMessage} />}
        </div>
      </div>
    </div>
  );
};


function mapStateToProps(state) {
  return {
    follower: {
      isFetching: state.follower.isFetching,
      data: actionFollower.getFilteredFollowers(state),
      errorMessage: state.follower.errorMessage,
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
    getFollowers: api => dispatch(actionFollower.getFollowers(api)),
    filterFollowers: query => dispatch(actionFollower.filter(query)),
    getRooms: api => dispatch(actionChat.getRooms(api)),
    filterRooms: query => dispatch(actionChat.filter(query)),

    getRoom: (api, id) => dispatch(actionChat.getRoom(api, id)),
    createRoom: (api, id) => dispatch(actionChat.createRoom(api, id)),
    deleteRoom: (api, id) => {},
    
    createMessage: (api, id, message) => dispatch(actionChat.createMessage(api, id, message)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat)
