import React from "react";
import { AvatarItem } from "../Avatar";

function SuggestionList(props) {
  return (
    <ul className="list-group list-group-flush">
      {props.list && props.list.map((item) => {
        return (
        <li className={`list-group-item d-flex justify-content-between align-items-center p-1`} key={item.id} >
          <AvatarItem url={item.avatarUrl} title={item.userName} subtitle="recommended" />
          <button className={`btn btn-sm ${item.isFollowing ? "btn-outline-primary" : "btn-primary"} ml-2`} type="button" onClick={() => { props.followOnClick(item.id) }}>{item.isFollowing ? "Following" : "Follow"} </button>
        </li>
        )
      })}
    </ul>
  )
}

export default SuggestionList;