import React, { useState, useRef } from "react";
import { InputAdornment, IconButton, TextField } from "@material-ui/core";

import SendIcon from "@material-ui/icons/SendOutlined";
import ImageIcon from "@material-ui/icons/ImageOutlined";

import { EmojiPicker } from "../EmojiPicker"

import useStyles from "./styles";

function MessageSenderInput({
  placeholder = "Type a message...",

  onSendMessageClick
}) {
  const classes = useStyles();
  const inputRef = useRef(null);
  const textFieldRef = useRef(null);
  const [closePickerModal, setClosePickerModal] = useState(false);
  const [value, setValue] = useState("");

  const messageSend = () => {
    onSendMessageClick && onSendMessageClick(value.trim());
    setValue("");
    setClosePickerModal(true);
  }

  const handleMessageSendClick = () => {
    messageSend()
  }

  const handleEnterKeyDown = (e) => {
    if (e.key === "Enter") {
      messageSend();
    }
  }

  const handleChangeInputValue = (text) => {
    setValue(text);
  }

  return (
    <TextField
      ref={textFieldRef}
      inputRef={inputRef}
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
            <EmojiPicker
              inputRef={inputRef}
              textFieldRef={textFieldRef}
              value={value}
              closePickerModal={closePickerModal}
              onChangeInputValue={handleChangeInputValue}
            />
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
