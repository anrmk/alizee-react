import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as signalR from "@microsoft/signalr";
import { getToken, wrapHttps } from "../../helpers/functions";

import * as actionAddMessage from "../../store/actions/chat";

function NotificationHub(props) {
  const { chat } = props;
  const { addMessage, addMessageCount } = props;
  const [hubConnection, setHubConnection] = useState(null);
  const [msg, setMsg] = useState();

  useEffect(() => {
    const newHubConnection = new signalR.HubConnectionBuilder()
      .withUrl(wrapHttps(`${process.env.REACT_APP_TESTING_DOMAIN}/hubs/chat`), {
        accessTokenFactory: () => getToken(),
      })
      .withAutomaticReconnect()
      .configureLogging(signalR.LogLevel.Information)
      .build();

    setHubConnection(newHubConnection);
  }, []);

  const handleReciveMessage = (data) => {
    if (chat.currentRoom) {
      if (data.roomId == chat.currentRoom.id) {
        addMessage(data);
      } 
    } else {
      addMessageCount(data.roomId, 1);
    }
  };

  // TODO: refactor
  useEffect(() => {
    if (msg) {
      handleReciveMessage(msg);
      setMsg(null);
    }
  }, [msg]);

  useEffect(() => {
    if (hubConnection) {
      hubConnection
        .start({ withCredentials: false })
        .then(() => {
          console.log("hub connected!");
          hubConnection.on("ReceiveMessage", (data) => setMsg(data));
        })
        .catch((err) =>
          console.log("Error connection SignalR " + JSON.stringify(err))
        );
    }
  }, [hubConnection]);

  return <>{props.children}</>;
}

function mapStateToProps(state) {
  return {
    chat: {
      data: state.chat.data,
      currentRoom: state.chat.currentRoom,
    },
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addMessage: (message) => dispatch(actionAddMessage.addMessage(message)),
    addMessageCount: (roomId, count) => dispatch(actionAddMessage.addNewMessageCount(roomId, count))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationHub);
