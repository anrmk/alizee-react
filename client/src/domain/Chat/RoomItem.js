import React, {useState, useEffect} from 'react'

import { Avatar, IconButton } from "@material-ui/core";

function RoomItem(props) {
  return (
    <li className="list-group-item list-group-item-action" onClick={props.onClick}>
      <div className="d-flex align-items-top justify-content-between">
        <div className="avatar">
          <Avatar className="avatar__icon" src={props.profileUrl} /> 
          <div className="avatar__header">
            <strong>{props.name}</strong> <br/>
            <small className="text-muted">{props.message}</small>
          </div>
        </div>
        <small className="text-muted">{props.lastSeen}</small>
      </div>
    </li>
  )
}

export default RoomItem;