import { useState, useEffect, useContext, useCallback, useRef } from "react";
import io from "socket.io-client";

import { getToken, wrapHttps } from "../helpers/functions";
import API from "../constants/endpoints";
import Peer from "simple-peer";

export default function useVideoStream({ userName, peerName, onHangup, onCallback }) {
  const url = wrapHttps(`${process.env.REACT_APP_DOMAIN}${API.endpoints["videoCall"]}`);

  const userVideo = useRef(); //reference for DOM element
  const partnerVideo = useRef(); //reference for DOM element

  const [users, setUsers] = useState({}); //list of connected users
  const [caller, setCaller] = useState(null); // caller with the socket id
  const [status, setStatus] = useState(null); //status of action
  const [calling, setCalling] = useState(false); //indicate calling or not
  const [callAccepted, setCallAccepted] = useState(false); //indicate to accept the call or not

  const [stream, setStream] = useState(); //current stream from device
  const [socket, setSocket] = useState(null); //current socket connection

  const [videoOn, setVideo] = useState(true);
  const [micOn, setMic] = useState(true);
  const [cameraGranted, setCameraGranted] = useState(false);
  const [microphonGranted, setMicrophoneGranted] = useState(false);

  // useEffect(() => {
  //   navigator.permissions.query({ name: "camera" }).then((res) => {
  //     setCameraGranted(res.state == "granted");
  //     res.onchange = (e) => {
  //       setCameraGranted(e.currentTarget.state === "granted");
  //       console.log("Change camera permission", e.currentTarget.state);
  //     };
  //   });

  //   navigator.permissions.query({ name: "microphone" }).then((res) => {
  //     setMicrophoneGranted(res.state == "granted");
  //     res.onchange = (e) => {
  //       setMicrophoneGranted(e.currentTarget.state === "granted");
  //     };
  //   });
  // }, []);

  useEffect(() => {
    connect();
    return () => {
      if (socket) {
        socket.disconnect();
        setSocket(null);
      }
    };
  }, []);

  useEffect(() => {
    if (socket) {
      connectToStream();
    }
  }, [socket]);

  useEffect(() => {
    if (stream && socket) {
      onCallback && onCallback();
    }
  }, [stream, socket]);

  const connect = () => {
    console.log("Connect socket");
    const s = io.connect(wrapHttps(process.env.REACT_APP_SS_DOMAIN, true), { query: `userName=${userName}` });

    setSocket(s);
  };

  const videoToggle = () => {
    stream.getVideoTracks().map((track) => {
      track.enabled = !videoOn;
    });
    setVideo(!videoOn);
  };

  const micToggle = () => {
    stream.getAudioTracks().map((track) => {
      track.enabled = !micOn;
    });
    setMic(!micOn);
  };

  const handleFlip = () => {
    console.log("Flip clicking");
  };

  const handleHangup = () => {
    onHangup && onHangup();
  };

  const connectToStream = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((s) => {
        if (userVideo.current) {
          setStream(s);
          if ("srcObject" in userVideo.current) {
            userVideo.current.srcObject = s;
          } else {
            userVideo.current.src = window.URL.createObjectURL(s);
          }
          userVideo.current.play();
        }
      })
      .catch((e) => {
        setStream(null);
        setStatus(`Error on getting devices: ${e}`);
      });

    socket.on("connect", (data) => {
      setStatus("Server connection established");
    });

    socket.on("reconnect", (data) => {
      setStatus("Trying to recconect");
    });

    socket.on("allUsers", (users) => {
      setUsers(users);
    });

    socket.on("ring", (data) => {
      setStatus(`Incomming video call from ${data.from}`);
      setCalling(true);
      setCaller(data);
    });

    socket.on("cancel", () => {
      setStatus("Call ended");
      setCalling(false);
      setCaller(null);
      handleHangup();
    });
  };

  const callPeer = () => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
      config: {
        iceServers: [
          { urls: "stun:stun.l.google.com:19302" },
          { urls: "stun:stun.services.mozilla.com" },
          { urls: "stun:stun.stunprotocol.org:3478" },
          { url: "stun:stun.l.google.com:19302" },
          { url: "stun:stun.services.mozilla.com" },
          { url: "stun:stun.stunprotocol.org:3478" },
          {
            urls: "stun:numb.viagenie.ca",
            username: "nutella.storch0720@outlook.com",
            credential: "123qweAS1!",
          },
          {
            urls: "turn:numb.viagenie.ca",
            username: "nutella.storch0720@outlook.com",
            credential: "123qweAS1!",
          },
        ],
      },
    });

    peer.on("connect", () => {
      setStatus("");
      setCalling(false);
      setCallAccepted(true);
    });

    peer.on("close", () => {
      if (partnerVideo.current) {
        partnerVideo.current.srcObject = null;
      }
    });

    peer.on("signal", (data) => {
      setStatus(`Ring to ${peerName}`);
      setCalling(true);
      setCallAccepted(false);
      socket.emit("callUser", { to: peerName, signal: data, from: userName });
    });

    peer.on("stream", (s) => {
      if (partnerVideo.current) {
        if ("srcObject" in partnerVideo.current) {
          partnerVideo.current.srcObject = s;
        } else {
          partnerVideo.current.src = window.URL.createObjectURL(s);
        }
        partnerVideo.current.onloadedmetadata = () => {
          partnerVideo.current.play();
        };
      }
    });

    socket.on("accept", (signal) => {
      setStatus("Connecting");
      peer.signal(signal);
    });

    //Decline the initiator
    socket.on("decline", (signal) => {
      setStatus("Call ended");
      setCallAccepted(false);
      setCalling(false);
      setCaller(null);

      peer.end();
      peer.destroy();

      handleHangup();
    });
  };

  const acceptCall = () => {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });

    peer.on("connect", () => {
      setStatus("");
      setCalling(false);
      setCallAccepted(true);
    });

    peer.on("close", () => {
      if (partnerVideo.current) {
        partnerVideo.current.srcObject = null;
      }
    });

    peer.on("signal", (data) => {
      setStatus("Connecting");
      socket.emit("acceptCall", { signal: data, to: caller.from });
    });

    peer.on("stream", (s) => {
      if (partnerVideo.current) {
        if ("srcObject" in partnerVideo.current) {
          partnerVideo.current.srcObject = s;
        } else {
          partnerVideo.current.src = window.URL.createObjectURL(s);
        }
        partnerVideo.current.onloadedmetadata = (e) => {
          partnerVideo.current.play();
        };
      }
    });

    peer.signal(caller.signal);

    //Decline caller
    socket.on("decline", (signal) => {
      setStatus("Call ended");
      setCallAccepted(false);
      setCalling(false);
      setCaller(null);

      peer.end();
      peer.destroy();

      handleHangup();
    });
  };

  const declineCall = () => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });

    peer.on("signal", (data) => {
      if (callAccepted || !!caller) {
        socket.emit("declineCall", { signal: data, to: caller?.from || peerName });
        peer.end();
        peer.destroy();
      } else {
        socket.emit("cancelCall", { signal: data, to: peerName });
      }

      setStatus(`Call ended`);
      setCaller(null);
      setCalling(false);
      setCallAccepted(false);

      handleHangup();
    });
  };

  return {
    player: userVideo,
    partner: partnerVideo,

    status,
    caller,
    calling,
    callAccepted,

    videoOn,
    videoToggle,

    micOn,
    micToggle,

    flipToggle: handleFlip,

    users: users,
    call: callPeer,
    accept: acceptCall,
    hangup: declineCall,
  };
}
