
import React, {useState, useEffect} from "react";
import axios from "axios";

import Modal from "../../components/Modal";

function NewRoom(props) {
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_SERVER_API_URL}/follower/getfollowers`, {
        params: { userId: "13289f92-6ca2-4416-9236-f6bc50dcb854" },
      }).then((res) => {
        setFollowers(res.data);
      });
  }, []);

  return (
    <Modal show={props.show} title="Hello World">
      <div>
        {followers.map((follower) => (
          <div key={follower.id}>{follower.followerName}</div>
        ))}
      </div>
    </Modal>
  );
}

export default NewRoom
