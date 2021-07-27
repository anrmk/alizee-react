import React, { useState, useEffect, useRef } from "react";

import { ENTER_KEY_CODE } from "../../constants/key_codes";
import { InputAdornment, IconButton, TextField } from "@material-ui/core";
import SendIcon from "@material-ui/icons/SendOutlined";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOnRounded";

import { EmojiPicker } from "../EmojiPicker";
import { MediaEditor } from "../MediaEditor";

import useStyles from "./styles";

function MessageSenderInput({
  placeholder,
  transparentBg = false,
  hideMediaEditor,
  hideEmojiPicker,
  disabled,
  currentFocus = true,

  onSendTip,
  onSendMessageClick,
}) {
  const classes = useStyles();
  const inputRef = useRef(null);
  const textFieldRef = useRef(null);
  const [closePickerModal, setClosePickerModal] = useState(false);
  const [value, setValue] = useState("");

  useEffect(() => {
    !disabled && currentFocus && inputRef.current.focus();
  }, [disabled])

  const messageSend = () => {
    onSendMessageClick && onSendMessageClick({ media: [], text: value.trim() });
    setValue("");
    setClosePickerModal(true);
  };

  const handleMessageSendClick = (e) => {
    e.preventDefault();
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
      onSendMessageClick && onSendMessageClick({ media: mediaFiles, text: "" });
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
        classes: { notchedOutline: transparentBg && classes.textField },
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
            {onSendTip && (
              <IconButton onClick={onSendTip}>
                <MonetizationOnIcon />
              </IconButton>
            )}
            
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

export default MessageSenderInput;
