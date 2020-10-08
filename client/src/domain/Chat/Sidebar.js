import React from 'react';
import Modal from 'react-bootstrap/Modal';

import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";

import RoomItem from "./RoomItem";
import Search from "../../components/Search"

import "./Sidebar.scss";

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
    <div className="sidebar">
      <div className="sidebar__header navbar navbar-expand-lg navbar-light bg-light">
        <div className="navbar-brand brand">Direct</div>
        <ul className="navbar-nav ml-auto">``
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
                      <Search className="mb-1" onChange={props.onFilterFollowers}/>
                    </div>
                  </div>
                  <h6>Suggested</h6>
                  <div className="form-group">
                    <ul className="list-group list-group-flush">
                      {props.followers.map((user) => (
                        <RoomItem key={user.id} title={user.followerName} url={user.followerUrl} onClick={(e) => handleCreateRoom(user.followerId)} />
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
        </ul>
      </div>
      <Search className="p-1" onChange={props.onFilterRooms} />
      <div className="sidebar__body">
        <div>
          <ul className="list-group list-group-flush">
            {props.rooms.map((room) => (
              <RoomItem key={room.id} title={room.name} url={room.avatarUrl} subTitle={room.messages[room.messages.length - 1]?.message}  onClick={(e) => handleGetRoom(room.id)} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
