import React, {useState, useEffect} from 'react'

import { Avatar, IconButton } from "@material-ui/core";

function RoomItem(props) {
  return (
    <li className="list-group-item list-group-item-action" onClick={(e) => props.onClick(e)}>
      <div className="d-flex align-items-top justify-content-between">
        <div className="mb-1 avatar">
          <Avatar className="avatar__icon" src={props.avatarURL} /> 
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