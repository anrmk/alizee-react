import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { v1 as uuid } from "uuid";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function CreateRoom() {
  const history = useHistory();
  const userVideo = useRef(null);
  const [alert, setAlert] = useState("");
  const [roomId, setRoomId] = useState(uuid());

  useEffect(() => {
    // console.log("Room Id: " + roomId);
    //setRoomId();

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        userVideo.current.srcObject = stream;
      })
      .catch((res) => {
        setAlert(res.message);
        console.log(res);
      });
  }, []);

  const joiningLiveStream = () => {
    console.log({ roomId });
    history.push(`/room/${roomId}`);
  };

  return (
    <div className="flex-container">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-8">
            <div className="bg-gradient-dark embed-responsive embed-responsive-16by9">
              <video
                ref={userVideo}
                className="embed-responsive-item"
                muted
                autoPlay
                playsInline
                allowFullScreen
                controls
              />
            </div>
            <div className="details">
              <div>Title </div>
              <div>Description</div>
            </div>
            {alert ? <p className="text-danger">{alert}</p> : ""}
          </div>
          <div className="col-lg-4 text-center">
            <h2 className="h2">Streaming ready...</h2>
            <p className="lead">https://meet.com/{roomId}</p>
            <button
              className="btn btn-success"
              onClick={() => joiningLiveStream()}
            >
              Join now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateRoom;
