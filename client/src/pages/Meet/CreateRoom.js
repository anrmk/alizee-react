import { Container } from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { v1 as uuid } from "uuid";

import AlertContainer from "../../components/AlertContainer";
import useStyles from "./styles";
import { CreateRoomForm } from '../../domain/Meet';

const DEFAULT_ALERT_ERROR_TEXT = "Something wrong...";

function CreateRoom() {
  const history = useHistory();
  const classes = useStyles();

  const userVideo = useRef(null);
  const [alertErrorText, setAlertErrorText] = useState(DEFAULT_ALERT_ERROR_TEXT);
  const [alertOpen, setAlertOpen] = useState(false);
  const [roomId, setRoomId] = useState();

  useEffect(() => {
    setRoomId(uuid());

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        userVideo.current.srcObject = stream;
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

  return (
    <AlertContainer
      className={classes.createRoomContainer}
      component={Container}
      errorAlert={alertErrorText || DEFAULT_ALERT_ERROR_TEXT}
      alertOpen={alertOpen}
      error
      onAlertClose={() => setAlertOpen(false)}>
      <CreateRoomForm
        videoRef={userVideo}
        roomId={roomId}
        onSubmit={joiningLiveStream} />
    </AlertContainer>
  )
}

export default CreateRoom;
