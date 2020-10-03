import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as signalR from "@microsoft/signalr";

import * as actionAddMessage from '../../store/actions/chat';

function NotificationHub(props) {
  const { addMessage } = props; 
  const [hubConnection, setHubConnection] = useState(null);

   useEffect(() => {
    const newHubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${process.env.REACT_APP_SERVER_API_URL}/chat`)
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
              //console.log(messages)
             // setMessages([...messages, { ...data }])
          });
        })
        .catch((err) => console.log("Error connection SignalR " + JSON.stringify(err)));
    }
  }, [hubConnection])
  
  return (
    <>
      {props.children} 
    </>
  )
}

function mapDispatchToProps(dispatch) {
  return {


    addMessage: (api, message) => dispatch(actionAddMessage.addMessage(api, message)),
  }
}

export default connect(null, mapDispatchToProps)(NotificationHub);
