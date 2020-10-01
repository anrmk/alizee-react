import React from 'react';
import Modal from 'react-bootstrap/Modal';

import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";

import SidebarSearch from "./SidebarSearch";
import RoomItem from "./RoomItem";

function Sidebar(props) {
  const handleModalToggle = () => {
    props.onModalToggle && props.onModalToggle();
  }

  const handleGetRoom = (roomId) => {
    props.onGetRoom && props.onGetRoom(roomId);
  }

  const handleCreateRoom = (followerId) => {
    props.onCreateRoom && props.onCreateRoom(followerId)
  }

  return (
    <div>
      <div className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="navbar-brand brand">{props.modalShow ? "New chat" : "Direct"}</div>
        <div className="navbar-nav ml-auto">
          <li className="nav-item">
            <a className="nav-link" onClick={handleModalToggle}>
              <ChatIcon />
            </a>
            <Modal show={props.modalShow} backdrop="static" centered keyboard={false} onHide={handleModalToggle} aria-labelledby="contained-modal-title-vcenter">
              <Modal.Header closeButton>
                <Modal.Title className="h6">New Message</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <form>
                  <div className="form-group row">
                    <div className="col">
                      <input type="text" className="form-control border-0" placeholder="Search ..." onChange={props.onFilterFollowers} />
                    </div>
                  </div>

                  <h6>Suggested</h6>
                  <div className="form-group">
                    <ul className="list-group list-group-flush">
                      {props.followers.map((user) => (
                        <RoomItem key={user.id} name={user.followerName} profileUrl={`https://avatars.dicebear.com/api/human/${Math.floor(Math.random() * 5000)}.svg`} onClick={(e) => handleCreateRoom(user.followerId)} />
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
          <RoomItem key={room.id} name={room.name} profileUrl={`https://avatars.dicebear.com/api/human/${Math.floor(Math.random() * 5000)}.svg`} onClick={(e) => handleGetRoom(room.id)} />
        ))}
      </ul>
    </div>
  )
}

export default Sidebar
