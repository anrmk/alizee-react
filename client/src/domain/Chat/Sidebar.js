import React, {useState, useEffect} from 'react';
import axios from "axios";

import Modal from 'react-bootstrap/Modal';

import { IconButton } from "@material-ui/core";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";

import SidebarSearch from "./SidebarSearch";

import RoomItem from "./RoomItem";

function Sidebar(props) {
  const userId = "13289f92-6ca2-4416-9236-f6bc50dcb854"; //depricated
  const [followers, setFollowers] = useState([]);
  const [filteredFollowers, setFilteredFollowers] = useState([]);
  const [newRoom, setNewRoom] = useState(false);

  const createNewRoom = (followerId) => {
    console.log(followerId)
     axios.post(`${process.env.REACT_APP_SERVER_API_URL}/chat/createRoom`, {id: followerId}).then((res) => {
       console.log(res.data);
     }).catch((e) => {
       console.log(e)
     });
  }

  const filterRoom = (e) => {
    setFilteredFollowers(followers.filter(item => item.followerName.toLowerCase().includes(e.target.value.toLowerCase())))
  }

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_SERVER_API_URL}/follower/getfollowers`, { params: { userId } }).then((res) => {
        setFollowers(res.data);
        setFilteredFollowers(res.data)
      });
  }, []);

  return (
    <div>
      <div className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="navbar-brand brand">{props.newChat ? "New chat" : "Direct"}</div>
        <div className="navbar-nav ml-auto">
          <li className="nav-item">
            <a className="nav-link" onClick={() => setNewRoom(true)}>
              <ChatIcon />
            </a>
            <Modal show={newRoom} backdrop="static" centered keyboard={false} onHide={() => setNewRoom(false)} aria-labelledby="contained-modal-title-vcenter">
              <Modal.Header closeButton>
                <Modal.Title className="h6">New Message</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <form>
                  <div className="form-group row">
                    <div className="col">
                      <input type="text" className="form-control border-0" placeholder="Search ..." onChange={filterRoom} />
                    </div>
                  </div>

                  <h6>Suggested</h6>
                  <div className="form-group">
                    <ul className="list-group list-group-flush">
                      {filteredFollowers.map((follower) => (
                        <RoomItem key={follower.id} name={follower.followerName} profileUrl={`https://avatars.dicebear.com/api/human/${Math.floor(Math.random() * 5000)}.svg`} onClick={(e) => createNewRoom(follower.id)} />
                      ))}
                    </ul>
                  </div>
                </form>        
              </Modal.Body>
            </Modal>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              <MoreVertIcon />
            </a>
          </li>
        </div>
      </div>
      <SidebarSearch />
      <ul className="list-group list-group-flush">
        {props.rooms.map((room) => (
          <RoomItem key={room.id} name={room.followerName} onClick={(e) => props.onClick(e, "GET_MESSAGES", room.id)} />
        ))}
      </ul>
    </div>
  )
}

export default Sidebar
