import React, {useState, useEffect} from 'react'

import { Avatar, IconButton } from "@material-ui/core";
import SentimentSatisfiedOutlinedIcon from '@material-ui/icons/SentimentSatisfiedOutlined';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import SearchIcon from '@material-ui/icons/Search';

import MessageSend from "./MessageSend";
import "./Room.scss";

function Room(props) {
  const[messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages(props.messages ?? []);
  }, [])

  return (
    <div className="chat">
      <div className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="avatar">
          <Avatar className="avatar__icon" src=""/> {props.room?.name}
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
        <div className="d-block text-secondary p-2 rounded text-break ">
          {props.messages.map(msg => (
            <div className={props.userId === msg.userId ? "d-flex align-items-top justify-content-end" : "d-flex align-items-top justify-content-between"} key={msg.id}>
              <p>{msg.message}</p>
              <small className="ml-3">3.30 PM</small>  
            </div>
          ))}
        </div>
      </div>
      <div className="chat__footer">
        <MessageSend onCreateMessage={props.onCreateMessage} roomId={props.room.Id} />
      </div>
    </div>
  );
}

export default Room;
