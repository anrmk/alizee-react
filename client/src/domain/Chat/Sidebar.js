import React, {useState, useEffect} from 'react';

import { IconButton } from "@material-ui/core";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";

import SidebarSearch from "./SidebarSearch";

import RoomItem from "./RoomItem";
import NewRoom from "./NewRoom";

function Sidebar(props) {
  const [showNewRoom, setShowNewRoom] = useState(false);

  return (
    <div>
      <div className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="navbar-brand brand">{props.newChat ? "New chat" : "Direct"}</div>
        <div className="navbar-nav ml-auto">
          <li className="nav-item">
            <a className="nav-link" onClick={() => setShowNewRoom(!showNewRoom)} >
              <ChatIcon />
              {showNewRoom ? <NewRoom show='true' /> : null}
            </a>
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
