import React, { useContext } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router";

import useVideoStream from "../../hooks/useVideoStream";

import { Box, IconButton, Typography } from "@material-ui/core";
import CallEndIcon from "@material-ui/icons/CallEndOutlined";
import CallIcon from "@material-ui/icons/CallOutlined";
import VideocamIcon from "@material-ui/icons/VideocamOutlined";
import VideocamOffIcon from "@material-ui/icons/VideocamOffOutlined";
import MicNoneIcon from "@material-ui/icons/MicNoneOutlined";
import MicOffIcon from "@material-ui/icons/MicOffOutlined";
import FlipCameraIcon from "@material-ui/icons/FlipCameraIosOutlined";

import ApiContext from "../../context/ApiContext";
import * as notificationAction from "../../store/actions/notification";

import useStyles from "./styles";

function PeerToPeer({ user, call }) {
  const classes = useStyles();
  const history = useHistory();
  const { userName } = useParams();

  const apiClient = useContext(ApiContext);

  const handleStreamConnected = () => {
    if (userName) {
      call(apiClient, userName); // Signal to user about calling
      videoStream.call(); // calling
    }
  };

  const handleHangup = () => {
    history.goBack();
  };

  const videoStream = useVideoStream({
    userName: user.userName,
    peerName: userName,
    onHangup: handleHangup,
    onCallback: handleStreamConnected,
  });

  const CustomIconButton = React.useMemo(() =>
    React.forwardRef((props, ref) => {
      return (
        <Box textAlign="center" ref={ref}>
          <IconButton {...props}>{props.children}</IconButton>
          {props.text && <Typography color="textPrimary">{props.text}</Typography>}
        </Box>
      );
    })
  );

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      alignItems="center"
      position="relative"
      height="100vh"
    >
      <div className={classes.partner}>
        <video ref={videoStream.partner} playsInline allowFullScreen controls={false}></video>
      </div>

      <Box p={2}></Box>

      <Box display="flex" justifyContent="center" flexDirection="column" className={classes.status}>
        <Typography variant="h4">{videoStream.status}</Typography>
      </Box>

      <Box p={2}></Box>

      <Box className={classes.player}>
        <video ref={videoStream.player} playsInline allowFullScreen muted controls={false}></video>
      </Box>

      <Box className={classes.tools}>
        <CustomIconButton text="Camera" className="primary" onClick={videoStream.videoToggle}>
          {videoStream.videoOn ? <VideocamIcon fontSize="large" /> : <VideocamOffIcon fontSize="large" />}
        </CustomIconButton>

        <CustomIconButton text="Mute" className="primary" onClick={videoStream.micToggle}>
          {videoStream.micOn ? <MicNoneIcon fontSize="large" /> : <MicOffIcon fontSize="large" />}
        </CustomIconButton>

        <CustomIconButton text="Flip" className="primary" onClick={videoStream.flipToggle}>
          <FlipCameraIcon fontSize="large" />
        </CustomIconButton>

        {(videoStream.calling || videoStream.callAccepted) && (
          <CustomIconButton text="Decline" onClick={videoStream.hangup} className="danger">
            <CallEndIcon fontSize="large" />
          </CustomIconButton>
        )}

        {videoStream.caller && !videoStream.callAccepted && (
          <CustomIconButton text="Accepted" onClick={videoStream.accept} className="success">
            <CallIcon fontSize="large" />
          </CustomIconButton>
        )}
      </Box>
    </Box>
  );
}

function mapStateToProps(state) {
  return {
    user: {
      userName: state.signIn?.userInfo?.userName,
    },
  };
}

function mapDispatchToProps(dispatch) {
  return {
    call: (api, userName) => dispatch(notificationAction.notifyCall(api, userName)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PeerToPeer);
