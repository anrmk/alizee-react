import { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import ApiContext from "../context/ApiContext";
import { PEAR_TO_PEAR_ID_ROUTE } from "../constants/routes";
import * as notificationAction from "../store/actions/notification";

import * as signalR from "@microsoft/signalr";

import { getToken, wrapHttps } from "../helpers/functions";
import API from "../constants/endpoints";
import { useSnackbar } from "notistack";

export default function useNotification() {
  const apiClient = useContext(ApiContext);
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const [connection, setConnection] = useState(null);

  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => ({
    isAuthenticated: state.signIn.isAuthenticated,
  }));

  useEffect(() => {
    isAuthenticated && !connection && connectToHub();

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
      .withUrl(wrapHttps(`${process.env.REACT_APP_DOMAIN}${API.endpoints["notification"]}`, true), {
        accessTokenFactory: () => token,
      })
      .withAutomaticReconnect([5000])
      .configureLogging(signalR.LogLevel.Information)
      .build();

    newConnection.on("Calling", (data) => {
      history.push(PEAR_TO_PEAR_ID_ROUTE(""));
    });

    newConnection.on("NewMessage", () => {
      handleNotificationToggle(null, { newMessage: true });
    });

    newConnection.on("NewNotification", (data) => {
      handleNotificationToggle(apiClient, { newNotification: true, ...data });
      enqueueSnackbar(data.description, { variant: "info" });
    });

    newConnection.onclose(() => {
      console.log("Notification hub disconnected");
    });

    setConnection(newConnection);
  };

  useEffect(() => {
    if (isAuthenticated) {
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

  const handleNotificationToggle = async (...data) => {
    await dispatch(notificationAction.setNotification(...data));
  };

  return {
    toggle: handleNotificationToggle,
  };
}
