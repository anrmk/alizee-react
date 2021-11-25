import React, { useContext, useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { Container } from "@material-ui/core";

import ApiContext from "../../context/ApiContext";

import * as actionStream from "../../store/actions/stream";

import AlertContainer from "../../components/AlertContainer";
import { CreateRoomForm } from "./MeetForms";

import useStyles from "./styles";

const DEFAULT_ALERT_SUCCESS_TEXT = "Operation was successfully completed";
const DEFAULT_ALERT_ERROR_TEXT = "Something wrong...";

function CreateRoom(props) {
  const apiClient = useContext(ApiContext);
  const history = useHistory();
  const classes = useStyles();

  const { room, errorMessage } = props;

  const { createStreamRoom, updateStreamRoom } = props;

  const [stream, setStream] = useState();

  const [isAlertError, setIsAlertError] = useState(true);
  const [alertSuccessText, setAlertSuccessText] = useState(
    DEFAULT_ALERT_SUCCESS_TEXT
  );
  const [alertErrorText, setAlertErrorText] = useState(
    DEFAULT_ALERT_ERROR_TEXT
  );
  const [alertOpen, setAlertOpen] = useState(false);

  const [roomId, setRoomId] = useState();

  useEffect(() => {
    (async () => {
      await createStreamRoom(apiClient);
    })();

    navigator.mediaDevices
      .getUserMedia({
        video: {
          mandatory: {
            minWidth: 208,
            minHeight: 117,
            maxWidth: 208,
            maxHeight: 117,
          },
        },
        audio: true,
      })
      .then((newStream) => {
        setStream(newStream);
      })
      .catch((res) => {
        setAlertErrorText(res.message);
        setAlertOpen(true);
      });
  }, []);

  const joiningLiveStream = async (data) => {
    await updateStreamRoom(apiClient, data);

    if (!errorMessage) {
      history.push(`/room/${roomId}`);
    } else {
      setAlertErrorText(errorMessage);
      setAlertOpen(true);
    }
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
        room={room}
        onCopyLinkRoom={handleCopyClickRoom}
        onSubmit={joiningLiveStream}
      />
    </AlertContainer>
  );
}

function mapStateToProps(state) {
  return {
    room: state.stream.data,
    errorMessage: state.stream.errorMessage,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    createStreamRoom: (api) => dispatch(actionStream.createStreamRoom(api)),
    updateStreamRoom: (api, roomData) =>
      dispatch(actionStream.updateStreamRoom(api, roomData)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateRoom);
