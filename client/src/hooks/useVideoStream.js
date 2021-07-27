import { useState, useEffect, useRef } from "react";
import Peer from "simple-peer";

import useSocketIO from "./useSocketIO";
import useCameraMicPermissions from "./useCameraMicPermissions";

const DATA_TYPE_OFFER = "offer";
const DATA_TYPE_ANSWER = "answer";
const ICE_SERVERS = [
  { urls: process.env.REACT_APP_STUN_SERVERS.split(",") },
  {
    urls: process.env.REACT_APP_TURN_SERVER_URL.split(","),
    username: process.env.REACT_APP_TURN_SERVER_USERNAME,
    credential: process.env.REACT_APP_TURN_SERVER_CREDENTIAL
  }
];

export default function useVideoStream({ callerName, calleeName, isVerified, onHangup, onInitiated }) {
  const { socket } = useSocketIO(callerName);
  const { cameraGranted, micGranted, requestBothPermissions } = useCameraMicPermissions();

  const callerVideoEl = useRef();
  const calleeVideoEl = useRef();
  let currentPeer = useRef(null).current;
  let currentStream = useRef(null).current;
  let initiator = useRef(false).current;

  const [videoOn, setVideoOn] = useState(true);
  const [micOn, setMicOn] = useState(true);
  const [status, setStatus] = useState(null);
  const [calling, setCalling] = useState(false);
  const [callAccepted, setCallAccepted] = useState(false);
  const [initiatorClone, setInitiatorClone] = useState(false);
  const [currentStreamClone, setCurrentStreamClone] = useState();
  const [currentPeerClone, setCurrentPeerClone] = useState();

  useEffect(() => {
    if (socket) {
      (async () => {
        await init();
      })();
    }
  }, [socket]);

  const handleVideoToggle = () => {
    if (!currentStreamClone) return;

    const isVideoEnabled = currentStreamClone.getVideoTracks()[0].enabled;
    currentStreamClone.getVideoTracks()[0].enabled = !isVideoEnabled;

    setVideoOn(!isVideoEnabled);
  };

  const handleMicToggle = () => {
    if (!currentStreamClone) return;

    const isMicEnabled = currentStreamClone.getAudioTracks()[0].enabled;
    currentStreamClone.getAudioTracks()[0].enabled = !isMicEnabled;

    setMicOn(!isMicEnabled);
  };

  const handleFlipToggle = () => {
    console.log("Flip clicking");
  };

  const handleHangUp = () => {
    resetStatesByDefault()

    onHangup && onHangup();
  };

  const handleRemoveRoom = () => {
    socket.emit("removeRoom");
  }

  const resetStatesByDefault = () => {
    setStatus("");
    setCalling(false);
    setCallAccepted(false);
    setInitiatorClone(false);
    initiator = false;
    currentPeer = null;
    calleeVideoEl.current.srcObject = null;
    calleeVideoEl.current.src = null;
    callerVideoEl.current.srcObject = null;
    callerVideoEl.current.src = null;
  }

  const init = async () => {
    try {
      await requestBothPermissions()
      await getUserMedia();
      setUpSignalServerConnection();
      socket.emit("join", { callerName, calleeName, isVerified });
    } catch (error) {
      setStatus(`You need to give Mic or Camera permision`);
      socket.disconnect();
    }
  }

  const getUserMedia = async () => {
    if (!calleeVideoEl.current) return;

    const strm = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });

    setupStream(calleeVideoEl, strm);

    currentStream = strm;
    setCurrentStreamClone(strm);
    calleeVideoEl.current.play();
  }

  const setUpSignalServerConnection = () => {
    socket.on("connect", () => {
      setStatus("Connection is established");
      console.log("Socket", socket)
    });

    socket.on("init", () => {
      initiator = true;
      setInitiatorClone(true)
      
      initiator && onInitiated && onInitiated(calleeName);
    });

    socket.on("ready", () => {
      setStatus("Connecting");
      initPeer();
    });

    socket.on("desc", data => {
      if (data.desc?.type === DATA_TYPE_OFFER && initiator) return;
      if (data.desc?.type === DATA_TYPE_ANSWER && !initiator) return;
      call(data.desc);
    });

    socket.on("reconnect", () => {
      setStatus("Trying to recconect");
    });

    socket.on("disconnect", () => {
      resetStatesByDefault();
    });

    socket.on("updateInitator", () => {
      initiator = true;
      setInitiatorClone(true);
    });

    socket.on("roomRemoved", () => {
      handleHangUp();
    });

    socket.on("disconnected", () => {
      setStatus("Waiting participants");
      setCalling(false);
      setCallAccepted(false);
      setupStream(calleeVideoEl, currentStream);
    });
  }

  const setupStream = (target, stream, play = true) => {
    if ("srcObject" in calleeVideoEl.current) {
      target.current.srcObject = stream;
    } else {
      target.current.src = window.URL.createObjectURL(stream);
    }
    play && target.current.play()
  }

  const initPeer = () => {
    const newPeer = new Peer({
      initiator: initiator && isVerified,
      trickle: false,
      reconnectTimer: 1000,
      iceTransportPolicy: "relay",
      stream: currentStream,
      config: {
        iceServers: ICE_SERVERS
      }
    });

    currentPeer = newPeer;
    setCurrentPeerClone(newPeer);

    newPeer.on("connect", () => {
      setStatus("");
      setCalling(true);
    });

    newPeer.on("signal", data => {
      const signal = {
        desc: data,
        from: callerName
      };

      socket.emit("signal", signal);
    });

    newPeer.on("stream", strm => {
      if (!calleeVideoEl.current || !callerVideoEl.current) return;

      setCalling(false);
      setCallAccepted(true);

      setupStream(callerVideoEl, currentStream);
      setupStream(calleeVideoEl, strm, false);
      calleeVideoEl.current.onloadedmetadata = (e) => {
        calleeVideoEl.current.play();
      };
    });

    newPeer.on("close", () => { console.log("Peer connection was closed"); })

    newPeer.on("error", (err) => {
      console.log(err);
    });
  }

  const call = async (desc) => {
    currentPeer.signal(desc);
  }

  const declineCall = () => {
    currentPeerClone.destroy();
    handleHangUp();
  };

  return {
    callerVideoEl,
    calleeVideoEl,

    cameraGranted,
    micGranted,

    initiator: initiatorClone,
    status,
    calling,
    callAccepted,
    videoOn,
    micOn,

    handleVideoToggle,
    handleMicToggle,
    handleFlipToggle,
    handleHangUp: declineCall,
    handleRemoveRoom
  };
}
