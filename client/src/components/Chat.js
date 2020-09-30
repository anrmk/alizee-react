import React, { useState, useEffect } from "react";
import {
  HubConnection,
  HubConnectionBuilder,
  HttpClient,
  LogLevel,
  HttpTransportType,
} from "@aspnet/signalr";

const Chat = () => {
  const [hubConnection, setHubConnection] = useState(
    new HubConnectionBuilder()
      .configureLogging(LogLevel.Debug)
      .withUrl("http://194.67.93.7:8000/")
      .build()
  );
  useEffect(() => {
    hubConnection.on("SendMessage", (data) => {
      console.log("send data: " + data);
    });
    /*
    hubConnection
      .start()
      .then(() => console.log("SignalR started"))
      .catch((err) => console.log("Error connection SignalR " + err));
      */
  }, []);

  return (
  <div className="container">
    <div className="row">
      <div className="col-4">
        <div className="card" >
          <div className="card-header">
            Direct
          </div>
          <div className="card-body">
            list of chats
          </div>
        </div>
      </div>
      <div className="col-8">
        <div className="card">
          <div className="card-body">
            content of chat
          </div>
        </div>
      </div>
    </div>
  </div>);
};

export default Chat;
