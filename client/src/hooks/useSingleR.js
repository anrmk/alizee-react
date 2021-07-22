import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import * as signalR from "@microsoft/signalr";

import { getToken, wrapHttps } from "../helpers/functions";

export default function useSingleR(endpoint) {
  const [connection, setConnection] = useState(null);

  const { isAuthenticated } = useSelector((state) => ({
    isAuthenticated: state.signIn.isAuthenticated,
  }));

  useEffect(() => {
    isAuthenticated && !connection && connect();

    return () => {
      if (connection) {
        connection.stop();
        setConnection(null);
      }
    };
  }, [connection, isAuthenticated]);

  useEffect(() => {
    if (connection) {
      connection
        .start({ withCredentials: false })
        .then(() => {
          console.log("Hub connected");
        })
        .catch((err) => {
          console.log("Error connection hub: " + JSON.stringify(err));
        });
    }
  }, [connection]);

  var connect = () => {
    const token = getToken()?.access;
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl(wrapHttps(`${process.env.REACT_APP_DOMAIN}${endpoint}`, true), {
        accessTokenFactory: () => token,
      })
      .withAutomaticReconnect([5000])
      .configureLogging(signalR.LogLevel.Information)
      .build();

    newConnection.onclose(() => {
      console.log("Hub disconnected");
    });

    setConnection(newConnection);
  };

  return {
    connection
  };
}

