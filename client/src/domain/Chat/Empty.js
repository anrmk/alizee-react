import React from "react";
import SendOutlinedIcon from '@material-ui/icons/SendOutlined';

function Empty() {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center w-100 h-100">
      <SendOutlinedIcon fontSize="large" />
      <h1>Your Messages</h1>
      <p className="lead">Please select a chat to start messaging</p>
    </div>
  );
}

export default Empty;
