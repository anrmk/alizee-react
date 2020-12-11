import React, { useState } from "react";
import { InputAdornment, IconButton } from "@material-ui/core";

import SendIcon from "@material-ui/icons/SendOutlined";
import ImageIcon from "@material-ui/icons/ImageOutlined";

import CustomInput from "../CustomInput";
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
    <CustomInput
      placeholder={placeholder}
      disableUnderline
      wrapperClassName={classes.messageSenderInputWrapper}
      inputClassName={classes.messageSenderInput}
      value={value}
      startAdornment={
        <InputAdornment position="end">
          <IconButton>
            <ImageIcon className={classes.searchIcon} />
          </IconButton>
        </InputAdornment>
      }
      endAdornment={
        <InputAdornment position="end">
          <IconButton onClick={handleMessageSendClick}>
            <SendIcon className={classes.searchIcon} />
          </IconButton>
        </InputAdornment>
      }
      onChange={(e) => setValue(e.target.value)}
      onKeyDown={handleEnterKeyDown} />
  )
}

export default MessageSenderInput;
