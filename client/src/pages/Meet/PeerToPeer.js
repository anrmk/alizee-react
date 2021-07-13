import React, { useContext, useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router";

import useVideoStream from "../../hooks/useVideoStream";
import useFullScreen from "../../hooks/useFullScreen";

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
import OnlyModalCard from "./OnlyModalCard";

import useStyles from "./styles";

function PeerToPeer({ user, call }) {
  const apiClient = useContext(ApiContext);
  const classes = useStyles();
  const history = useHistory();
  const { userName } = useParams();

  const fullScreen = useFullScreen("root");
  const videoStream = useVideoStream({
    userName: user.userName,
    peerName: userName,
    isVerified: user.identityVerified,
    onHangup: handleHangup,
    onCallback: handleConnected,
  });

  useEffect(() => {
    return () => {
      fullScreen.toggle(false);
    };
  }, []);

  var handleConnected = () => {
    if (userName) {
      call(apiClient, userName); // Signal to user about calling
      videoStream.call(); // calling
    }
  };

  var handleHangup = () => {
    fullScreen.toggle(false);
    history.goBack();
  };

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

  if (!user.identityVerified || !userName) return (
    <Box height="100vh" display="flex" alignItems="center" justifyContent="center">
      <OnlyModalCard textContent={userName ? "Only verified user can call" : "Unknown username"} />
    </Box>
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

      <Box display="flex" justifyContent="center" flexDirection="column" zIndex={1} p={1}>
        <Typography variant="h6" align="center">{videoStream.status}</Typography>
      </Box>

      <Box p={2}></Box>

      <Box className={classes.player} m={1}>
        <video ref={videoStream.player} playsInline allowFullScreen muted controls={false}></video>
      </Box>

      <Box className={classes.tools} m={1}>
        <CustomIconButton text="Camera" className="primary transparent" onClick={videoStream.videoToggle}>
          {videoStream.videoOn ? <VideocamIcon fontSize="large" /> : <VideocamOffIcon fontSize="large" />}
        </CustomIconButton>

        <CustomIconButton text="Mute" className="primary transparent" onClick={videoStream.micToggle}>
          {videoStream.micOn ? <MicNoneIcon fontSize="large" /> : <MicOffIcon fontSize="large" />}
        </CustomIconButton>

        <CustomIconButton text="Flip" className="primary transparent" onClick={videoStream.flipToggle}>
          <FlipCameraIcon fontSize="large" />
        </CustomIconButton>

        {(videoStream.calling || videoStream.callAccepted) && (
          <CustomIconButton text="Decline" onClick={videoStream.hangup} className="danger transparent">
            <CallEndIcon fontSize="large" />
          </CustomIconButton>
        )}

        {videoStream.caller && !videoStream.callAccepted && (
          <CustomIconButton text="Accepted" onClick={videoStream.accept} className="success transparent">
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
      identityVerified: state.signIn?.userInfo?.identityVerified
    },
  };
}

function mapDispatchToProps(dispatch) {
  return {
    call: (api, userName) => dispatch(notificationAction.notifyCall(api, userName)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PeerToPeer);
