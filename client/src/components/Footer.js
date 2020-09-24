import React from 'react'
import { Link, useRouteMatch } from "react-router-dom";

import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import VoiceChatIcon from '@material-ui/icons/VoiceChat';

function Footer() {
  return (
    <div className="fixed-bottom navbar-expand-sm navbar-dark bg-dark">
      <div className="container">
        <ul className="nav nav-justified">
          <li className="nav-item">
            <Link className="nav-link text-center" to={"/meet"}>
              <VoiceChatIcon fontSize="large" />
            </Link>
          </li>
            
            <Link className="nav-link text-center" to={"/"}>
              <AddBoxOutlinedIcon fontSize="large" />
            </Link>
            <Link className="nav-link text-center" to={"/"}>
              <FavoriteBorderOutlinedIcon fontSize="large" />
            </Link>
        </ul>
      </div>
    </div>
  );
}

export default Footer
