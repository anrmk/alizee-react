import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";

import axios from "axios";
import ApiContext from '../context/ApiContext';

import Sidebar from "../domain/Chat/Sidebar";
import Room from "../domain/Chat/Room";

import { USER_TOKEN } from '../constants/user';


import { red } from "@material-ui/core/colors";

import * as actionFollower from '../store/actions/follower';
import * as actionChat from '../store/actions/chat';

const Chat = (props) => {
  const apiClient = useContext(ApiContext);

  const { follower, getFollowers, filterFollowers } = props;
  const { chat, getRoom, getRooms, filterRooms, createRoom } = props;

  const [modalShow, setModalShow] = useState(false);
  
  const [rooms, setRooms] = useState([]); //all available rooms
  const [room, setRoom] = useState(null); //selected room
  const [messages, setMessages] = useState([]); //selected room messages

  useEffect(() => {
    if (modalShow) {
      getFollowers(apiClient); //work
    } else {
      getRooms(apiClient); // ?
      console.log(follower)
      console.log('get rooms')
    }
  }, [modalShow]);

  const handleFilterFollowers = (e) => {
    filterFollowers(e.target.value.toLowerCase());
  };

  const handleModalToggle = (e) => {
    setModalShow(!modalShow);
  };

  const handleGetRoom = (roomId, name) => {
    getRoom(apiClient, roomId);
    // axios.get(`${process.env.REACT_APP_SERVER_API_URL}/chat/GetRoom`, {params: { id: roomId }})
    //   .then((res) => {
    //     setRoom(res.data);
    //     setMessages(res.data.messages)
    //   });
  };

  const handleCreateRoom = (followerId) => {
    createRoom(apiClient, followerId);
    setModalShow(false);
    //  axios.post(`${process.env.REACT_APP_SERVER_API_URL}/chat/createRoom?followerId=${followerId}`)
    //    .then((res) => {
    //      if (rooms.filter((item) => item.id === res.data.id).length == 0) {
    //        setRooms([...rooms, res.data]);
    //      }

    //      setModalShow(false);
    //    });
  };

  const handleCreateMessage = async (message) => {
    // axios
    //   .post(`${process.env.REACT_APP_SERVER_API_URL}/chat/createMessage`, {
    //     message,
    //     userId,
    //     roomId: room.id,
    //   })
    //   .then((res) => {
    //     setMessages([...messages, { ...res.data }])
    //     console.log(res)
    //   });

    // if (hubConnection.connectionStarted) {
    //   try {
    //     await hubConnection.send('SendMessage', {
    //       message, 'userId': '', roomId: room.id
    //     });
    //   }
    // catch(e) {
    //     console.log(e);
    //   }
    // }
  };

  return (
    <div className="container-fluid container-xl full-container">
      <div className="row row-cols-2 no-gutters h-100">
        <div className="col-4 border-right">

          <Sidebar
            modalShow={modalShow}
            rooms={chat.data}
            onGetRoom={handleGetRoom}
            onCreateRoom={handleCreateRoom}
            onModalToggle={handleModalToggle}
            followers={follower.data}
            onFilterFollowers={handleFilterFollowers}
          />
        </div>
        <div className="col-8">
          {room && <Room room={room} messages={messages} onCreateMessage={handleCreateMessage} />}
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
    },
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getFollowers: api => dispatch(actionFollower.getFollowers(api)),
    filterFollowers: query => dispatch(actionFollower.filter(query)),

    getRoom: (api, id) => dispatch(actionChat.getRoom(api, id)),
    getRooms: api => dispatch(actionChat.getRooms(api)),
    createRoom: (api, id) => dispatch(actionChat.createRoom(api, id)),
    filterRooms: query => dispatch(actionChat.filter(query))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat)
