import { useState, useEffect, useContext, useCallback } from "react";
import * as signalR from "@microsoft/signalr";

import { getToken, wrapHttps } from "../helpers/functions";
import API from "../constants/endpoints";

export default function useNotification({ isAuth, onReceiveMessage }) {
  const url = API.endpoints["chat"];
  const [connection, setConnection] = useState(null);

  useEffect(() => {
    if (!isAuth) {
      connection && connection.stop();
      setConnection(null);
    } else {
      connectToHub();
    }
  }, [isAuth]);

  const connectToHub = () => {
    const token = getToken()?.access;
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl(wrapHttps(`${process.env.REACT_APP_DOMAIN}${url}`, true), {
        accessTokenFactory: () => token,
      })
      .withAutomaticReconnect()
      .configureLogging(signalR.LogLevel.Information)
      .build();

    newConnection.onclose(() => {
      if (newConnection.state === signalR.HubConnectionState.Disconnected) {
        setTimeout(() => {
          connectToHub();
        }, 5000);
      }
    });

    setConnection(newConnection);
  };

  useEffect(() => {
    if (isAuth) {
      if (connection) {
        connection
          .start({ withCredentials: false })
          .then(() => {
            connection.on("ReceiveMessage", handleReceiveMessage);
          })
          .catch((err) => {
            setTimeout(() => {
              connectToHub();
            }, 5000);
            console.log("Error connection notification hub: " + JSON.stringify(err));
          });
      }
    }
  }, [connection]);

   const handleReceiveMessage = useCallback(
     async (data) => {
       await onReceiveMessage(data);
     }, [onReceiveMessage]
   )
}
