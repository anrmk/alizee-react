import React, {useRef, useEffect, useState } from "react";

import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined';

import Avatar from "../../components/Avatar";
import MessageSender from "./MessageSender";

import "./Room.scss";

function Room(props) {
  const messageContainer = useRef(null);

  useEffect(() => {
    messageContainer.current.scrollTop = messageContainer.current.scrollHeight
  }, [props.room.messages])

  return (
    <div className="chat">
      <div className="chat__header navbar navbar-expand-lg navbar-light bg-light">
        <ArrowBackOutlinedIcon />

        <Avatar size="medium" url={props.room.avatarUrl} /> <strong>{props.room.name}</strong> 

        <ul className="navbar-nav ml-auto">
          {/* <li className="nav-item">
            <a className="nav-link" href="#">
              <SearchIcon />
            </a>
          </li> */}
          <li className="nav-item">
            <a className="nav-link" href="#">
              <InfoOutlinedIcon />
            </a>
          </li>
        </ul>
      </div>
      <div className="chat__body">
        <div ref={messageContainer}>
          {props.room.messages.map((msg) => (
            <div className={ msg.isOwner ? "d-flex align-items-center justify-content-end " : "d-flex align-items-center justify-content-between"} key={msg.id} >
              <p className={msg.isOwner ? "mb-2 p-2 rounded shadow bg-info text-white" : "mb-2 p-2 rounded shadow bg-light"}>
                <span>{msg.message}</span>
                <small className="ml-3"><em>{msg.createdDate}</em></small>
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="chat__footer">
        <MessageSender onCreateMessage={props.onCreateMessage} roomId={props.room.Id} />
      </div>
    </div>
  );
}

export default Room;
