import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

import { ENTER_KEY_CODE } from "../../constants/key_codes";
import { InputAdornment, IconButton, TextField } from "@material-ui/core";
import SendIcon from "@material-ui/icons/SendOutlined";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOnRounded";

import { EmojiPicker } from "../EmojiPicker";
import { MediaEditor } from "../MediaEditor";

import useStyles from "./styles";

function MessageSenderInput({
  placeholder = "Type a message...",
  hideMediaEditor,
  hideEmojiPicker,
  hidePayment,
  disabled,

  onSendTip,
  onSendMessageClick,
}) {
  const classes = useStyles();
  const inputRef = useRef(null);
  const textFieldRef = useRef(null);
  const [closePickerModal, setClosePickerModal] = useState(false);
  const [value, setValue] = useState("");

  useEffect(() => {
    !disabled && inputRef.current.focus();
  }, [disabled])

  const messageSend = () => {
    onSendMessageClick && onSendMessageClick({ media: [], message: value.trim() });
    setValue("");
    setClosePickerModal(true);
  };

  const handleMessageSendClick = () => {
    messageSend();
  };

  const handleEnterKeyDown = (e) => {
    if (e.keyCode === ENTER_KEY_CODE) {
      messageSend();
    }
  };

  const handleChangeInputValue = (text) => {
    setValue(text);
  };

  const handleMediaMessageSendClick = (mediaFiles) => {
    if (mediaFiles.length) {
      onSendMessageClick && onSendMessageClick({ media: mediaFiles, message: "" });
    }
  };

  return (
    <TextField
      ref={textFieldRef}
      inputRef={inputRef}
      disabled={disabled}
      variant="outlined"
      fullWidth
      placeholder={placeholder}
      type="text"
      value={value}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            {!hideMediaEditor && <MediaEditor onSendMediaMessageClick={handleMediaMessageSendClick} />}
            {!hideEmojiPicker && (
              <EmojiPicker
                inputRef={inputRef}
                textFieldRef={textFieldRef}
                value={value}
                closePickerModal={closePickerModal}
                onChangeInputValue={handleChangeInputValue}
              />
            )}
            {!hidePayment && (
            <IconButton onClick={onSendTip}>
              <MonetizationOnIcon />
            </IconButton>)}
            
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={handleMessageSendClick}>
              <SendIcon />
            </IconButton>
          </InputAdornment>
        ),
        className: classes.input
      }}
      onChange={(e) => setValue(e.target.value)}
      onKeyDown={handleEnterKeyDown}
    />
  );
}

MessageSenderInput.propTypes = {
  placeholder: PropTypes.string,
  hideMediaEditor: PropTypes.bool,
  hideEmojiPicker: PropTypes.bool,
  hidePayment: PropTypes.bool,

  onSendMessageClick: PropTypes.func,
};

MessageSenderInput.defaultProps = {
  placeholder: "",
  hideMediaEditor: false,
  hideEmojiPicker: false,
  hidePayment: false,

  onSendMessageClick: undefined,
};
export default MessageSenderInput;
