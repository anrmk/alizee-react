import React, { useEffect, useContext } from "react";
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import { Box } from "@material-ui/core";

import ApiContext from "../context/ApiContext";
import Snackbar from "../domain/Snackbar/Snackbar";

import * as notificationAction from "../store/actions/notification";
import API from "../constants/endpoints";
import { CALLING_NOTIFICATION_TYPE, NEW_MESSAGE_NOTIFICATION_TYPE } from "../constants/notifications";
import { ACTIVITY_LOG_TYPE } from "../constants/activity";
import useSingleR from "./useSingleR";
import useFullScreen from "./useFullScreen";
import { useLocation } from "react-router-dom";
import { PEAR_TO_PEAR_ROUTE } from "../constants/routes";

export default function useNotificationHub() {
  const apiClient = useContext(ApiContext);
  const location = useLocation();
  const { enqueueSnackbar } = useSnackbar();
  const { connection } = useSingleR(API.endpoints["notification"]);
  const fullScreen = useFullScreen("root");

  const dispatch = useDispatch();

  useEffect(() => {
    if (connection) {
      connection.on("Notification", (data) => {
        switch (data?.type) {
          case CALLING_NOTIFICATION_TYPE:
            !location.pathname.includes(PEAR_TO_PEAR_ROUTE) && enqueueSnackbar(null, {
              variant: "success",
              content: (key) => (
                <Box>
                  <Snackbar
                    isCallable
                    id={key}
                    avatarUrl={data.avatarUrl}
                    name={data.name}
                    userName={data.userName}
                    description={`${ACTIVITY_LOG_TYPE[data.type]} ${data.description}`}
                    onCall={() => fullScreen.toggle(true)} />
                </Box>
              ),
            });
            break;
          case NEW_MESSAGE_NOTIFICATION_TYPE:
            dispatch(notificationAction.setNotification((null, { newMessage: true })));
            break;
        
          default:
            dispatch(notificationAction.setNotification(apiClient, { newNotification: true, ...data }));
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
    }
  }, [connection]);
}
