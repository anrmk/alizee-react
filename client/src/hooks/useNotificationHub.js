import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";

import { Box } from "@material-ui/core";

import ApiContext from "../context/ApiContext";
import * as notificationAction from "../store/actions/notification";
import Snackbar from "../domain/Snackbar/Snackbar";

import * as signalR from "@microsoft/signalr";

import { getToken, wrapHttps } from "../helpers/functions";
import API from "../constants/endpoints";
import { CALLING_NOTIFICATION_TYPE, NEW_MESSAGE_NOTIFICATION_TYPE } from "../constants/notifications";
import { ACTIVITY_LOG_TYPE } from "../constants/activity";

export default function useNotification() {
  const apiClient = useContext(ApiContext);
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

    newConnection.on("Notification", (data) => {
      switch (data?.type) {
        case CALLING_NOTIFICATION_TYPE:
          enqueueSnackbar(null, {
            variant: "success",
            content: (key) => (
              <Box>
                <Snackbar
                  isCallable
                  id={key}
                  avatarUrl={data.avatarUrl}
                  name={data.name}
                  userName={data.userName}
                  description={`${ACTIVITY_LOG_TYPE[data.type]} ${data.description}`} />
              </Box>
            ),
          });
          break;
        case NEW_MESSAGE_NOTIFICATION_TYPE:
          handleNotificationToggle(null, { newMessage: true });
          break;
      
        default:
          handleNotificationToggle(apiClient, { newNotification: true, ...data });
          enqueueSnackbar(null, {
            variant: "info",
            content: (key) => (
              <Box>
                <Snackbar
                  isOpenable={!!data.relatedPostId}
                  id={key}
                  avatarUrl={data.avatarUrl}
                  name={data.name}
                  userName={data.userName}
                  relatedPostId={data.relatedPostId}
                  description={`${ACTIVITY_LOG_TYPE[data.type]} ${data.description}`} />
              </Box>
            )
          });
          break;
      }
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
