import React from "react";

import { Avatar, IconButton } from "@material-ui/core";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import SearchIcon from "@material-ui/icons/Search";

import MessageSend from "./MessageSend";
import "./Room.scss";

function Room(props) {
  return (
    <div className="chat">
      <div className="chat__header navbar navbar-expand-lg navbar-light bg-light">
        <div className="avatar">
          <Avatar className="avatar__icon" src="" /> {props.room.name}
        </div>

        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <a className="nav-link" href="#">
              <SearchIcon />
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              <InfoOutlinedIcon />
            </a>
          </li>
        </ul>
      </div>
      <div className="chat__body">
        <div>
          {props.room.messages.map((msg) => (
            <div className={
                props.userId === msg.userId
                  ? "d-flex align-items-center justify-content-between"
                  : "d-flex align-items-center justify-content-end"
              }
              key={msg.id}
            >
              <p className="mb-2 p-2 rounded-pill bg-light">
                <span>{msg.message}</span>
                <small className="ml-3">{msg.createdDate}</small>
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="chat__footer">
        <MessageSend
          onCreateMessage={props.onCreateMessage}
          roomId={props.room.Id}
        />
      </div>
    </div>
  );
}

export default Room;
