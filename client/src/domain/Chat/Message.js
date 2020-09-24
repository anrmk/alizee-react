import React from 'react'

import { Avatar, IconButton } from "@material-ui/core";
import SentimentSatisfiedOutlinedIcon from '@material-ui/icons/SentimentSatisfiedOutlined';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import SearchIcon from '@material-ui/icons/Search';


import MessageSend from "./MessageSend";
import "./Message.scss";

function Message() {
  return (
    <div className="chat">
      <div className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="avatar">
          <Avatar className="avatar__icon"/> Avatar name
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
        <p className="d-block text-secondary p-2 rounded text-break bg-success ">
          content
          <small className="ml-3">3.30 PM</small>  
        </p>
      </div>
      <div className="chat__footer">
        <MessageSend />
      </div>
    </div>
  );
}

export default Message
