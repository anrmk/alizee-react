import { Container } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { v1 as uuid } from "uuid";

import AlertContainer from "../../components/AlertContainer";
import useStyles from "./styles";
import { CreateRoomForm } from "../../domain/Meet";

const DEFAULT_ALERT_SUCCESS_TEXT = "Operation was successfully completed";
const DEFAULT_ALERT_ERROR_TEXT = "Something wrong...";

function CreateRoom() {
  const history = useHistory();
  const classes = useStyles();
  const [stream, setStream] = useState();

  const [isAlertError, setIsAlertError] = useState(true);
  const [alertSuccessText, setAlertSuccessText] = useState(DEFAULT_ALERT_SUCCESS_TEXT);
  const [alertErrorText, setAlertErrorText] = useState(DEFAULT_ALERT_ERROR_TEXT);
  const [alertOpen, setAlertOpen] = useState(false);

  const [roomId, setRoomId] = useState();

  useEffect(() => {
    setRoomId(uuid());

    navigator.mediaDevices
      .getUserMedia({
        video: {
          mandatory: {
            minWidth: 208,
            minHeight: 117,
            maxWidth: 208,
            maxHeight: 117
          }
        },
        audio: true 
      })
      .then((stream) => {
        setStream(stream);
      })
      .catch((res) => {
        setAlertErrorText(res.message);
        setAlertOpen(true);
      });
  }, []);

  const joiningLiveStream = (data) => {

    console.log("joiningLiveStream", data);
    history.push(`/room/${roomId}`);
  };

  const handleCopyClickRoom = (message) => {
    setAlertSuccessText(message);
    setIsAlertError(false);
    setAlertOpen(true);
  };

  return (
    <AlertContainer
      className={classes.createRoomContainer}
      component={Container}
      successAlert={alertSuccessText || DEFAULT_ALERT_SUCCESS_TEXT}
      errorAlert={alertErrorText || DEFAULT_ALERT_ERROR_TEXT}
      alertOpen={alertOpen}
      error={isAlertError}
      onAlertClose={() => setAlertOpen(false)}>
      <CreateRoomForm
        stream={stream}
        roomId={roomId}
        onCopyLinkRoom={handleCopyClickRoom}
        onSubmit={joiningLiveStream} />
    </AlertContainer>
  )
}

export default CreateRoom;
