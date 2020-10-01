import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import Sidebar from "../domain/Chat/Sidebar";
import Room from "../domain/Chat/Room";

import * as signalR from "@microsoft/signalr";
import { red } from "@material-ui/core/colors";

const Chat = () => {
  const [userId, setUserId] = useState("13289f92-6ca2-4416-9236-f6bc50dcb854");
  const [modalShow, setModalShow] = useState(false);
  const [followers, setFollowers] = useState([]);
  const [filteredFollowers, setFilteredFollowers] = useState([]);
  
  const [rooms, setRooms] = useState([]); //all available rooms
  const [room, setRoom] = useState(null); //selected room
  const [messages, setMessages] = useState([]); //selected room messages

  const [hubConnection, setHubConnection] = useState(null);

   useEffect(() => {
    const newHubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:44341/chat')
      .withAutomaticReconnect()
      .configureLogging(signalR.LogLevel.Information)  
      .build();

      setHubConnection(newHubConnection);
  }, []);

  useEffect(() => {
    if(hubConnection) {
      hubConnection
        .start({ withCredentials: false })
        .then((result) => {
          console.log("hub connected!");

          hubConnection.on("ReceiveMessage", (data) => {
            console.log(messages)
            setMessages([...messages, { ...data }])
          });
        })
        .catch((err) => console.log("Error connection SignalR " + JSON.stringify(err)));
    }
  }, [hubConnection])

  useEffect(() => {
    if(modalShow) {
      axios.get(`${process.env.REACT_APP_SERVER_API_URL}/follower/getfollowers`, { params: { userId }})
        .then((res) => {
          setFollowers(res.data);
          setFilteredFollowers(res.data);
        });
      } else {
      axios.get(`${process.env.REACT_APP_SERVER_API_URL}/chat/getrooms`, { params: { userId } })
        .then((res) => {
          setRooms(res.data);
        });
    }
  }, [modalShow]);

  const handleFilterFollowers = (e) => {
    setFilteredFollowers(followers.filter((item) => item.followerName.toLowerCase().includes(e.target.value.toLowerCase())));
  };

  const handleModalToggle = (e) => {
    setModalShow(!modalShow);
  };

  const handleGetRoom = (roomId, name) => {
    axios.get(`${process.env.REACT_APP_SERVER_API_URL}/chat/GetRoom`, {params: { id: roomId }})
      .then((res) => {
        setRoom(res.data);
        console.log(res.data.messages)
        setMessages(res.data.messages)
      });
  };

  const handleCreateRoom = (followerId) => {
     axios.post(`${process.env.REACT_APP_SERVER_API_URL}/chat/createRoom?followerId=${followerId}`)
       .then((res) => {
         if (rooms.filter((item) => item.id === res.data.id).length == 0) {
           setRooms([...rooms, res.data]);
         }

         setModalShow(false);
       });
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

    if (hubConnection.connectionStarted) {
      try {
        await hubConnection.send('SendMessage', {
          message, userId, roomId: room.id
        });
      }
    catch(e) {
        console.log(e);
      }
    }
  };

  return (
    <div className="container">
      <div className="row row-cols-2 no-gutters">
        <div className="col-4 border-right">
          <Sidebar
            rooms={rooms}
            onGetRoom={handleGetRoom}
            onCreateRoom={handleCreateRoom}
            modalShow={modalShow}
            onModalToggle={handleModalToggle}
            followers={filteredFollowers}
            onFilterFollowers={handleFilterFollowers}
          />
        </div>
        <div className="col-8">
          {room && <Room room={room} messages={messages} userId={userId} onCreateMessage={handleCreateMessage} />}
        </div>
      </div>
    </div>
  );
};

export default Chat;
