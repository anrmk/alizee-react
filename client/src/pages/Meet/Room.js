import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";

import { StreamRoom } from "../../domain/Meet";

function Room(props) {
  const streamTabsData = undefined;
  const { roomId } = useParams();
  const { user } = props;
  const [stream, setStream] = useState();

  useEffect(() => {
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
        // audio: true
      })
      .then((stream) => {
        setStream(stream);
      });
  }, []);

  return (
    <StreamRoom streamTabsData={streamTabsData} user={user} isPeerToPeer={true} stream={stream} roomId={roomId} />
  );
}

function mapStateToProps(state) {
  return {
    user: {
      id: state.signIn?.userInfo?.id,
      username: state.signIn?.userInfo?.userName,
      name: state.signIn?.userInfo?.name,
      avatarUrl: state.signIn?.userInfo?.avatarUrl,
    },
  };
}

export default connect(mapStateToProps)(Room);
