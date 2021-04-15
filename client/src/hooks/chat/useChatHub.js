import { useState, useEffect } from "react";
import * as signalR from "@microsoft/signalr";

import { getToken, wrapHttps } from "../../helpers/functions";
import API from "../../constants/endpoints";

export default function useChatHub({ isAuth, onReceiveMessage }) {
  const url = API.endpoints["chat"];
  const [connection, setConnection] = useState(null);

  useEffect(() => {
    isAuth && !connection && connectToHub();

    return () => {
      if (connection) {
        connection.stop();
        setConnection(null);
      }
    };
  }, [connection]);

  const connectToHub = () => {
    const token = getToken()?.access;
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl(wrapHttps(`${process.env.REACT_APP_DOMAIN}${url}`, true), {
        accessTokenFactory: () => token,
      })
      .withAutomaticReconnect([5000])
      .configureLogging(signalR.LogLevel.Information)
      .build();

    newConnection.on("ReceiveMessage", handleReceiveMessage);
    newConnection.onclose(() => {
      console.log("Chat hub disconnected");
    });
    // newConnection.onclose(() => {
    //   if (newConnection.state === signalR.HubConnectionState.Disconnected) {
    //     setTimeout(() => {
    //       connectToHub();
    //     }, 5000);
    //   }
    // });

    setConnection(newConnection);
  };

  useEffect(() => {
    if (isAuth) {
      if (connection) {
        connection
          .start({ withCredentials: false })
          .then(() => {
            console.log("Chat hub connected");
          })
          .catch((err) => {
            //connection.off("ReceiveMessage");
            // setTimeout(() => {
            //   connectToHub();
            // }, 5000);
            console.log("Error connection notification hub: " + JSON.stringify(err));
          });
      }
    }
  }, [connection]);

  const handleReceiveMessage = async (data) => {
    await onReceiveMessage(data);
  };
}
