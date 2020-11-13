import { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as signalR from "@microsoft/signalr";

import { getToken, wrapHttps } from "../../helpers/functions";
import * as actionAddMessage from "../../store/actions/chat";
import API from "../../constants/endpoints";

function NotificationHub(props) {
  const { chat, user } = props;
  const { addMessage, addMessageCount } = props;
  const [hubConnection, setHubConnection] = useState(null);
  const [msg, setMsg] = useState();

  useEffect(() => {
    if (!user.isAuthenticated) {
      hubConnection && hubConnection.stop();
      setHubConnection(null);
    } else {
      const newHubConnection = new signalR.HubConnectionBuilder()
        .withUrl(wrapHttps(`${process.env.REACT_APP_DOMAIN}${API.endpoints.chat}`, false), {
          accessTokenFactory: () => getToken(),
        })
        .withAutomaticReconnect()
        .configureLogging(signalR.LogLevel.Information)
        .build();

      setHubConnection(newHubConnection);
    }
  }, [user.isAuthenticated])

  const handleReciveMessage = (data) => {
    if (chat.currentRoom && data.roomId === chat.currentRoom.id) {
      addMessage(data);
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
    if (user.isAuthenticated) {
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
    }
  }, [hubConnection]);

  return props.children;
}

function mapStateToProps(state) {
  return {
    chat: {
      data: state.chat.data,
      currentRoom: state.chat.currentRoom,
    },
    user: {
      isAuthenticated: state.signIn.isAuthenticated
    }
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addMessage: (message) => dispatch(actionAddMessage.addMessage(message)),
    addMessageCount: (roomId, count) => dispatch(actionAddMessage.addNewMessageCount(roomId, count))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationHub);
