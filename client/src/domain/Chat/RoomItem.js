import React from 'react'
import Avatar from "../../components/Avatar";

function RoomItem(props) {
  return (
    <li className="list-group-item list-group-item-action" onClick={props.onClick}>
      <div className="d-flex align-items-top justify-content-between">
        <div className="avatar">
          <Avatar url={props.url} /> 
          <div className="avatar__header">
            <strong>{props.title}</strong> <br/>
            <small className="text-muted">{props.subTitle}</small>
          </div>
        </div>
        <small className="text-muted">{props.lastSeen}</small>
      </div>
    </li>
  )
}

RoomItem.defaultProps = {
  url: "",
  title: "",
  subTitle: ""
};

export default RoomItem;