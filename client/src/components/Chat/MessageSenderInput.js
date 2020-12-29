import React, { useState } from "react";
import { InputAdornment, IconButton, TextField } from "@material-ui/core";

import SendIcon from "@material-ui/icons/SendOutlined";
import ImageIcon from "@material-ui/icons/ImageOutlined";

import useStyles from "./styles";

function MessageSenderInput({
  placeholder = "Type a message...",

  onSendMessageClick
}) {
  const classes = useStyles();
  const [value, setValue] = useState("");

  const messageSend = () => {
    onSendMessageClick && onSendMessageClick(value.trim());
    setValue("");
  }

  const handleMessageSendClick = () => {
    messageSend()
  }

  const handleEnterKeyDown = (e) => {
    if (e.key === "Enter") {
      messageSend()
    }
  }

  return (
    <TextField
      variant="outlined"
      fullWidth
      placeholder={placeholder}
      type="text"
      value={value}
      InputProps={{
        startAdornment:
          <InputAdornment position="start">
            <IconButton>
              <ImageIcon className={classes.icon} />
            </IconButton>
          </InputAdornment>,
        endAdornment:
          <InputAdornment position="end">
            <IconButton onClick={handleMessageSendClick}>
              <SendIcon className={classes.icon} />
            </IconButton>
          </InputAdornment>
      }}
      onChange={(e) => setValue(e.target.value)}
      onKeyDown={handleEnterKeyDown} />
  )
}

export default MessageSenderInput;
