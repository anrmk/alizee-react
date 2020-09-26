import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import Sidebar from "../domain/Chat/Sidebar";
import Room from "../domain/Chat/Room";

import {
  HubConnection,
  HubConnectionBuilder,
  HttpClient,
  LogLevel,
  HttpTransportType,
} from "@aspnet/signalr";

const Chat = () => {
  const [userId, setUserId] = useState("9a5a334d-424f-46d6-8e78-0e913fda95d4");
  const SERVER_API_URL = 'https://localhost:44341/api';

  const [newChat, setNewChat] = useState(false);
  const [rooms, setRooms] = useState([]);


  const {roomId} = useParams();
  const [roomName, setRoomName] = useState("");

  const [hubConnection, setHubConnection] = useState(null);

  useEffect(() => {
    console.log(process.env)
    // if(roomId) {
    //   setRoomName("")
    // }
  }, [])

 /* useEffect(() => {
    if(hubConnection) {
      hubConnection
        .start()
        .then(result => {
          console.log("hub connected!");

          hubConnection.on("SendMessage", (data) => {
            console.log("send data: " + data);
          });
        });
        

      
      hubConnection
        .start()
        .then(() => console.log("SignalR started"))
        .catch((err) => console.log("Error connection SignalR " + err));
        
    }
  }, []);*/

  useEffect(() => {
    if (newChat) {
     
    } else {
      axios.get(`${SERVER_API_URL}/chat/getrooms`, {params: {userId: '13289f92-6ca2-4416-9236-f6bc50dcb854'}})
      .then((res) => {
        setRooms(res.data);
      });
    }
 }, [newChat]);

  const getListOfFollowers = (e) => {
    axios.get(`${SERVER_API_URL}/follower/getfollowers`, {params : {userId: '13289f92-6ca2-4416-9236-f6bc50dcb854'}}).then((res) => {
      setRooms(res.data);
    });
  }

  const sideBarOnClick = (e, action, roomId) => {
    e.preventDefault();
    switch(action) {
      case "NEW_ROOM":
        setNewChat(!newChat); break;
      case "GET_MESSAGES":
        alert(roomId)
        //get messages
        break;
      default: return;
    }
  }

  return (
    <div className="container">
      <div className="row row-cols-2 no-gutters">
        <div className="col-4 border-right">
          <Sidebar rooms={rooms} newChat={newChat} onClick={sideBarOnClick} />
        </div>
        <div className="col-8">
          <Room />
        </div>
      </div>
    </div>
  );
};

export default Chat;
