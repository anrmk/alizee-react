import React, { useContext, useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router";

import { Box, IconButton, Typography } from "@material-ui/core";
import CallEndIcon from "@material-ui/icons/CallEndOutlined";
import LeaveRoomIcon from '@material-ui/icons/ExitToApp';
import VideocamIcon from "@material-ui/icons/VideocamOutlined";
import VideocamOffIcon from "@material-ui/icons/VideocamOffOutlined";
import MicNoneIcon from "@material-ui/icons/MicNoneOutlined";
import MicOffIcon from "@material-ui/icons/MicOffOutlined";
import FlipCameraIcon from "@material-ui/icons/FlipCameraIosOutlined";

import useVideoStream from "../../hooks/useVideoStream";
import useFullScreen from "../../hooks/useFullScreen";

import ApiContext from "../../context/ApiContext";
import { HOME_ROUTE } from "../../constants/routes";
import * as notificationAction from "../../store/actions/notification";
// import OnlyModalCard from "./OnlyModalCard";

import useStyles from "./styles";

function PeerToPeer({ user, incomingCallNotify }) {
  const apiClient = useContext(ApiContext);
  const classes = useStyles();
  const history = useHistory();
  const { userName } = useParams();

  const fullScreen = useFullScreen("root");
  const videoStream = useVideoStream({
    callerName: user.userName,
    calleeName: userName,
    isVerified: user.identityVerified,
    onHangup: handleHangup,
    onInitiated: handleCalled
  });

  useEffect(() => {
    return () => {
      fullScreen.toggle(false);
    };
  }, []);

  function handleCalled(calleeName) {
    calleeName && incomingCallNotify(apiClient, calleeName);
  };

  function handleHangup () {
    fullScreen.toggle(false);
    history.push(HOME_ROUTE);
  };

  const CustomIconButton = useMemo(() =>
    React.forwardRef((props, ref) => {
      return (
        <Box textAlign="center" ref={ref}>
          <IconButton {...props}>{props.children}</IconButton>
          {props.text && <Typography color="textPrimary">{props.text}</Typography>}
        </Box>
      );
    }),
  []);

  // if (!user.identityVerified || !userName) return (
  //   <Box height="100vh" display="flex" alignItems="center" justifyContent="center">
  //     <OnlyModalCard textContent={userName ? "Only verified user can call" : "Unknown username"} />
  //   </Box>
  // );

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      alignItems="center"
      position="relative"
      height="100vh">
      {videoStream.status && (
        <Box className={classes.status}>
          <Typography variant="h6" align="center">{videoStream.status}</Typography>
        </Box>
      )}

      <Box className={classes.partner}>
        <video ref={videoStream.calleeVideoEl} playsInline allowFullScreen muted={!videoStream.callAccepted} controls={false}></video>
      </Box>

      <Box className={classes.player}>
        <video 
          ref={videoStream.callerVideoEl} 
          style={{ display: videoStream.callAccepted ? "block" : "none" }}
          playsInline 
          allowFullScreen 
          muted 
          controls={false}>
        </video>
      </Box>

      <Box className={classes.tools} m={1}>
        <CustomIconButton text="Camera" className="primary transparent" onClick={videoStream.handleVideoToggle}>
          {videoStream.videoOn ? <VideocamIcon fontSize="large" /> : <VideocamOffIcon fontSize="large" />}
        </CustomIconButton>

        <CustomIconButton text="Mute" className="primary transparent" onClick={videoStream.handleMicToggle}>
          {videoStream.micOn ? <MicNoneIcon fontSize="large" /> : <MicOffIcon fontSize="large" />}
        </CustomIconButton>

        <CustomIconButton text="Flip" className="primary transparent" onClick={videoStream.handleFlipToggle}>
          <FlipCameraIcon fontSize="large" />
        </CustomIconButton>

        {(videoStream.calling || videoStream.callAccepted) && (
          <CustomIconButton text="Decline" onClick={videoStream.handleHangUp} className="danger transparent">
            <CallEndIcon fontSize="large" />
          </CustomIconButton>
        )}

        {(user.identityVerified && videoStream.initiator && videoStream.callAccepted) && (
          <CustomIconButton text="Delete Room" onClick={videoStream.handleRemoveRoom} className="success transparent">
            <LeaveRoomIcon fontSize="large" />
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
    incomingCallNotify: (api, userName) => dispatch(notificationAction.notifyCall(api, userName)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PeerToPeer);
