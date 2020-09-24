import React from 'react';

import { IconButton } from "@material-ui/core";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";

import SidebarSearch from "./SidebarSearch";
import SidebarChat from "./SidebarChat";

function Sidebar() {
  return (
    <div>
      <div className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="navbar-brand brand">Direct</div>
        <div className="navbar-nav ml-auto">
          <li className="nav-item">
            <a className="nav-link" href="#">
              <ChatIcon />
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
        <SidebarChat/>
        <SidebarChat/>
        <SidebarChat/>
      </ul>
    </div>
  )
}

export default Sidebar
