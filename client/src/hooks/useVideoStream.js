import { useState, useEffect, useRef } from "react";
import io from "socket.io-client";

import { wrapHttps } from "../helpers/functions";
import Peer from "simple-peer";

export default function useVideoStream({ userName, peerName, onHangup, onCallback }) {
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
  }, []);

  useEffect(() => {
    if (socket) {
      connectToStream();
    }

    return () => {
      if(socket) {
        socket.disconnect();
        setSocket(null);
      }
    };
  }, [socket]);

  useEffect(() => {
    if (stream && socket) {
      onCallback && onCallback();
    }
  }, [stream, socket]);

  const connect = () => {
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
    setStatus("Call ended");
    setCaller(null);
    setCalling(false);
    setCallAccepted(false);

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

    socket.on("allUsers", (data) => {
      setUsers(data);
      socket.data = data;
    });

    socket.on("disconnect", (data) => {
      setStatus("Disconnect");
    });

    socket.on("ring", (data) => {
      setStatus(`Incomming video call from ${data.from}`);
      setCalling(true);
      setCaller(data);
    });

    socket.on("cancel", () => {
      handleHangup();
    });
  };

  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const callPeer = () => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
      config: {
        iceServers: [
          { url: "stun:144.126.211.184:3478" },
          { url: "stun:stun.l.google.com:19302" },
          { url: "stun:global.stun.twilio.com:3478" },
          {
            url: "turn:144.126.211.184:3478?transport=tcp",
            username: "root",
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

    peer.on("signal", async (data) => {
      setStatus(`Ring to ${peerName}`);
      setCalling(true);
      setCallAccepted(false);

      if (!socket.data || !socket.data[peerName.toLowerCase()]) {
        await sleep(3000);
        !socket.decline && callPeer();
        return;
      }

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
      setStatus("Connecting", signal);
      peer.signal(signal);
    });

    socket.on("decline", (signal) => {
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

    socket.on("decline", (signal) => {
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
      } else {
        socket.emit("cancelCall", { signal: data, to: peerName });
      }

      peer.destroy();
      socket.decline = true;
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

    //users: users,
    call: callPeer,
    accept: acceptCall,
    hangup: declineCall,
  };
}
