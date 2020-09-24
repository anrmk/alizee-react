import React, {useState, useEffect} from 'react'

import { Avatar, IconButton } from "@material-ui/core";

function SidebarChat({addNewChat}) {
  const [seed, setSeed] = useState("");
  useEffect(() => {
    setSeed(Math.floor(Math.random()*5000))
  }, [])

  return (
    <li className="list-group-item list-group-item-action">
      <div className="d-flex align-items-center justify-content-between">
        <div className="mb-1 avatar">
          <Avatar className="avatar__icon" src={`https://avatars.dicebear.com/api/human/${seed}.svg`} /> Heading
        </div>
        <small>Last seen at..</small>
      </div>
      <p className="mb-1">Donec id elit non mi porta blandit.</p>
    </li>
  )
}

export default SidebarChat;