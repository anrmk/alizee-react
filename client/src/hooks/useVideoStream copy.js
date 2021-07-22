import { useState, useEffect, useRef } from "react";
import Peer from "simple-peer";

import { sleep } from "../helpers/functions";
import useSocketIO from "./useSocketIO";
import useCameraMicPermissions from "./useCameraMicPermissions";

const RECALL_DELAY = 3000;
const ICE_SERVERS = [
  { urls: process.env.REACT_APP_STUN_SERVERS.split(',') },
  {
    urls: process.env.REACT_APP_TURN_SERVER_URL.split(','),
    username: process.env.REACT_APP_TURN_SERVER_USERNAME,
    credential: process.env.REACT_APP_TURN_SERVER_CREDENTIAL
  },
];

export default function useVideoStream({ userName, peerName, isVerified, onHangup, onCallback }) {
  const { socket } = useSocketIO(userName);
  const { cameraGranted, micGranted, requestBothPermissions } = useCameraMicPermissions();

  const callerVideoEl = useRef(); //reference for DOM element
  const calleeVideoEl = useRef(); //reference for DOM element

  //const [users, setUsers] = useState({}); //list of connected users
  const [caller, setCaller] = useState(null); // caller with the socket id
  const [status, setStatus] = useState(null); //status of action
  const [calling, setCalling] = useState(false); //indicate calling or not
  const [callAccepted, setCallAccepted] = useState(false); //indicate to accept the call or not
  const [callDecline, setCallDecline] = useState(false);

  const callerPeer = useRef(new Peer({
    initiator: true,
    trickle: false,
    config: {
      iceServers: ICE_SERVERS,
    },
  })).current;
  const calleePeer = useRef(new Peer({
    trickle: false,
  })).current;
  const [stream, setStream] = useState(); //current stream from device

  const [videoOn, setVideoOn] = useState(true);
  const [micOn, setMicOn] = useState(true);

  useEffect(() => {
    // TODO: add to condition mic and camera permissions
    if (socket) {
      // (async () => {
      setUpStream();
      socket.emit('join', { callerName: userName, calleeName: peerName });
      // })();
    }
  }, [socket]);

  useEffect(() => {
    if (stream && socket) {
      onCallback && onCallback();
    }
  }, [stream, socket]);

  // const toogleMedia = (mediaType) => {
  //   if (!stream) return;

  //   if (mediaType === "mic") {
  //     micToggle();
  //   } else if (mediaType === "video") {
  //     videoToggle();
  //   }
  // }

  const videoToggle = () => {
    if (!stream) return;

    const isVideoEnabled = stream.getVideoTracks().track.enabled;
    stream.getVideoTracks()[0].track.enabled = !isVideoEnabled;

    setVideoOn(!isVideoEnabled);
  };

  const micToggle = () => {
    if (!stream) return;

    const isMicEnabled = stream.getAudioTracks().track.enabled;
    stream.getAudioTracks()[0].track.enabled = !isMicEnabled;

    setMicOn(!isMicEnabled);
  };

  const handleFlip = () => {
    console.log("Flip clicking");
  };

  const handleHangUp = () => {
    resetStatesByDefault()

    onHangup && onHangup();
  };

  const resetStatesByDefault = () => {
    setStatus("Call ended");
    setCaller(null);
    setCalling(false);
    setCallAccepted(false);
  }

  const setUpStream = async () => {
    try {
      await getUserMedia();
      setUpSignalServerConnection();
      
    } catch (error) {
      setStream(null);
      setStatus(`Error on getting devices: ${error}`);
    }
  };

  const getUserMedia = async () => {
    if (!callerVideoEl.current) return;

    const strm = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });

    if ("srcObject" in callerVideoEl.current) {
      callerVideoEl.current.srcObject = strm;
    } else {
      callerVideoEl.current.src = window.URL.createObjectURL(strm);
    }

    setStream(strm); // TODO: maybe return back to top
    callerVideoEl.current.play();
  }

  const setUpSignalServerConnection = () => {
    socket.on("connect", () => {
      setStatus("Server connection established");
    });

    socket.on("reconnect", () => {
      setStatus("Trying to recconect");
    });

    // socket.on("allUsers", (data) => {
    //   //setUsers(data);
    //   console.log("All users", data)
    //   socket.data = data;
    // });

    socket.on("disconnect", () => {
      setStatus("Disconnect");
    });

    socket.on("ring", (data) => {
      setStatus(`Incomming video call from ${data.from}`);
      setCalling(true);
      setCaller(data);
    });

    socket.on("cancel", () => {
      handleHangUp();
    });
  }

  const setUpUserPeer = () => {
    callerPeer = new Peer({
      initiator: true,
      trickle: false,
      config: {
        iceServers: ICE_SERVERS
      }
    });
    // callerPeer.addStream(stream);

    callerPeer.on("connect", () => {
      setStatus("");
      setCalling(false); 
      setCallAccepted(true);
    });

    callerPeer.on("close", () => {
      if (calleeVideoEl.current) {
        calleeVideoEl.current.srcObject = null;
      }
    });

    callerPeer.on("signal", async (data) => {
      setStatus(`Ring to ${peerName}`);
      setCalling(true);
      setCallAccepted(false);

      console.log("Data", callerPeer)
      if (!socket.data || !socket.data[peerName.toLowerCase()]) {
        await sleep(RECALL_DELAY);
        !callDecline && setUpUserPeer();
        return;
      }

      socket.emit("callUser", { to: peerName, signal: data, from: userName });
    });

    callerPeer.on("stream", (s) => {
      if (calleeVideoEl.current) {
        if ("srcObject" in calleeVideoEl.current) {
          calleeVideoEl.current.srcObject = s;
        } else {
          calleeVideoEl.current.src = window.URL.createObjectURL(s);
        }
        calleeVideoEl.current.onloadedmetadata = () => {
          calleeVideoEl.current.play();
        };
      }
    });

    socket.on("accept", (signal) => {
      setStatus("Connecting", signal);
      callerPeer.signal(signal);
    });

    socket.on("decline", () => {
      console.log("Decline User");
      callerPeer.destroy();
      handleHangUp();
    });
  };

  const setUpPartnerPeer = () => {
    calleePeer = new Peer({
      trickle: false,
    });
    // const peer = new Peer({
    //   initiator: false,
    //   trickle: false,
    //   stream: stream,
    // });

    // calleePeer.addStream(stream);

    calleePeer.on("connect", () => {
      setStatus("");
      setCalling(false);
      setCallAccepted(true);
    });

    calleePeer.on("close", () => {
      if (calleeVideoEl.current) {
        calleeVideoEl.current.srcObject = null;
      }
    });

    calleePeer.on("signal", (data) => {
      setStatus("Connecting");
      socket.emit("acceptCall", { signal: data, to: caller.from });
    });

    calleePeer.on("stream", (s) => {
      if (calleeVideoEl.current) {
        if ("srcObject" in calleeVideoEl.current) {
          calleeVideoEl.current.srcObject = s;
        } else {
          calleeVideoEl.current.src = window.URL.createObjectURL(s);
        }
        calleeVideoEl.current.onloadedmetadata = (e) => {
          calleeVideoEl.current.play();
        };
      }
    });

    calleePeer.signal(caller.signal);

    socket.on("decline", () => {
      console.log("Decline Partner");
      calleePeer.destroy();
      handleHangUp();
    });
  };

  const declineCall = () => {
    if (callAccepted || !!caller) {
      socket.emit("declineCall", { to: caller?.from || peerName });
    } else {
      socket.emit("cancelCall", { to: peerName });
    }
    callerPeer.destroy();
    setCallDecline(true);
    setCallDecline(true);
    handleHangUp();

    // TODO: for what need to create a new Peer (maybe set up initiator)
    // const peer = new Peer({
    //   initiator: true,
    //   trickle: false,
    //   stream: stream,
    // });

    // peer.on("signal", (data) => {
    //   if (callAccepted || !!caller) {
    //     socket.emit("declineCall", { signal: data, to: caller?.from || peerName });
    //   } else {
    //     socket.emit("cancelCall", { signal: data, to: peerName });
    //   }

    //   peer.destroy();
    //   // socket.decline = true;
    //   setCallDecline(true);
    //   handleHangUp();
    // });
  };

  return {
    userVideoEl: callerVideoEl,
    partnerVideoEl: calleeVideoEl,

    status,
    caller,
    calling,
    callAccepted,

    videoOn,
    videoToggle,

    micOn,
    micToggle,

    flipToggle: handleFlip,

    //users: users,
    call: setUpUserPeer,
    accept: setUpPartnerPeer,
    hangUp: declineCall,
  };
}
