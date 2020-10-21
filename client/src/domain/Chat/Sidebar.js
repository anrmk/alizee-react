import React from 'react';
import Modal from 'react-bootstrap/Modal';

import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";

import Search from "../../components/Search"
import { AvatarItem} from "../../components/Avatar";
 
import { generateFileUrl } from "../../helpers/functions";

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
        <ul className="navbar-nav ml-auto">
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
                      {props.followings.map((item) => (
                        <li className="list-group-item list-group-item-action" onClick={(e) => handleCreateRoom(item.userId)}  key={item.id}>
                          <AvatarItem url={generateFileUrl(process.env.REACT_APP_TESTING_DOMAIN, item.userUrl)} title={item.userName} subtitle="" />
                        </li>
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
            {props.rooms.map((room) => {
              const isActive = props.room?.id == room.id ? "active" : "";
              return (
              <li className={`list-group-item list-group-item-action d-flex justify-content-between align-items-center ${isActive}`} onClick={(e) => handleGetRoom(room.id)} key={room.id}>
                <AvatarItem url={generateFileUrl(process.env.REACT_APP_TESTING_DOMAIN, room.avatarUrl)} title={room.name} subtitle={room.messages[room.messages.length - 1]?.message} />
                {room.newMessagesCount > 0 ? <span className="badge badge-light badge-pill">{room.newMessagesCount}</span> : ""}
              </li>
            )})}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
