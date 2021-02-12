import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import { InputAdornment, IconButton, TextField } from "@material-ui/core";

import SendIcon from "@material-ui/icons/SendOutlined";

import { EmojiPicker } from "../EmojiPicker"

import { MediaEditor } from "../MediaEditor"
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
    onSendMessageClick && onSendMessageClick({ media: [], message: value.trim() });
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

  const handleMediaMessageSendClick = (mediaFiles) => {
    if (mediaFiles.length) {
      onSendMessageClick && onSendMessageClick({ media: mediaFiles, message: "" });
    }
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
            <MediaEditor onSendMediaMessageClick={handleMediaMessageSendClick} />
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

MessageSenderInput.propTypes = {
  placeholder: PropTypes.string,

  onSendMessageClick: PropTypes.func,
};

MessageSenderInput.defaultProps = {
  placeholder: "",

  onSendMessageClick: undefined,
};
export default MessageSenderInput;
