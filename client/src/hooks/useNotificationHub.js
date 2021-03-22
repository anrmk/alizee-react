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
            connection.on("Calling", (data) => {
              history.push(PEAR_TO_PEAR_ID_ROUTE(""));
            });

            connection.on("NewMessage", () => {
              handleNotificationToggle({ newMessage: true });
            });

            connection.on("NewNotification", (data) => {
              handleNotificationToggle({ newNotification: true });
              enqueueSnackbar(data, { variant: "info" });
            });
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

  const handleNotificationToggle = useCallback(
    async (data) => {
      await onChange(data);
    },
    [onChange]
  );

  return {
    toggle: handleNotificationToggle,
  };
}
