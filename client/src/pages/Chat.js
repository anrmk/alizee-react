import React, { useState, useEffect } from "react";

import Sidebar from "../domain/Chat/Sidebar";
import Message from "../domain/Chat/Message";

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
      <div className="row row-cols-2 no-gutters">
        <div className="col-4 border-right">
          <Sidebar />
        </div>
        <div className="col-8">
          <Message />
        </div>
      </div>
    </div>
  );
};

export default Chat;
