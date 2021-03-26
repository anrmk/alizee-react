import { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";

import { PEAR_TO_PEAR_ID_ROUTE } from "../constants/routes";

import * as signalR from "@microsoft/signalr";

import { getToken, wrapHttps } from "../helpers/functions";
import API from "../constants/endpoints";
import { useSnackbar } from "notistack";

export default function useNotification({ isAuth, onChange }) {
  const url = API.endpoints["notification"];
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
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

    newConnection.on("Calling", (data) => {
      history.push(PEAR_TO_PEAR_ID_ROUTE(""));
    });

    newConnection.on("NewMessage", () => {
      handleNotificationToggle({ newMessage: true });
    });

    newConnection.on("NewNotification", (data) => {
      handleNotificationToggle({ newNotification: true });
      enqueueSnackbar(data, { variant: "info" });
    });

    newConnection.onclose(() => {
      console.log("Notification hub disconnected");
    });

    setConnection(newConnection);
  };

  useEffect(() => {
    if (isAuth) {
      if (connection) {
        connection
          .start({ withCredentials: false })
          .then(() => {
            console.log("Notification hub connected");
          })
          .catch((err) => {
            console.log("Error connection notification hub: " + JSON.stringify(err));
          });
      }
    }
  }, [connection]);

  const handleNotificationToggle = async (data) => {
    await onChange(data);
  };

  return {
    toggle: handleNotificationToggle,
  };
}
