import React, { useEffect, useState } from "react";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";

import { Box, IconButton } from "@material-ui/core";

import useTheme from "@material-ui/core/styles/useTheme";

import SentimentSatisfiedOutlinedIcon from "@material-ui/icons/SentimentSatisfiedOutlined";

import useStyles from "./styles";

function EmojiPicker({
  inputRef,
  textFieldRef,
  value,
  closePickerModal,

  onChangeInputValue,
}) {
  const classes = useStyles();
  const theme = useTheme();
  const [emojiPickerIsOpen, setEmojiPickerIsOpen] = useState(false);

  useEffect(() => {
    if (closePickerModal) {
      setEmojiPickerIsOpen(false);
    }
  }, [closePickerModal]);

  useEffect(() => {
    document.addEventListener("mousedown", handleTextFieldMouseDown);
    document.addEventListener("touchstart", handleTextFieldMouseDown);

    return () => {
      document.removeEventListener("mousedown", handleTextFieldMouseDown);
      document.removeEventListener("touchstart", handleTextFieldMouseDown);
    };
  }, [textFieldRef]);

  const handleTextFieldMouseDown = (event) => {
    if (!textFieldRef.current || textFieldRef.current.contains(event.target)) {
      return;
    }

    setEmojiPickerIsOpen(false);
  };

  const handleEmojiPickerModal = () => {
    setEmojiPickerIsOpen((prev) => !prev);
  };

  const handleAddEmoji = (emoji) => {
    const input = inputRef.current;
    const cursorPosition = input.selectionEnd;
    const start = value.substring(0, input.selectionStart);
    const end = value.substring(input.selectionStart);
    const text = start + emoji.native + end;

    onChangeInputValue(text);

    input.focus();
    setTimeout(() => {
      input.selectionEnd = cursorPosition + emoji.native.length;
    }, 0);
  };

  const renderEmojiPicker = () => {
    return (
      <Box className={classes.picker}>
        <Picker
          tabIndex={0}
          set="google"
          showPreview={false}
          showSkinTones={false}
          theme={theme.palette.type === "light" ? "light" : "dark"}
          style={{
            position: "absolute",
            width: "auto",
            maxWidth: "355px",
            bottom: "60px",
            left: 0,
            display: emojiPickerIsOpen ? null : "none",
            backgroundColor:
              theme.palette.type === "light" ? theme.palette.common.white : theme.palette.background.paper,
          }}
          onClick={handleAddEmoji}
        />
      </Box>
    );
  };

  return (
    <>
      {renderEmojiPicker()}
      <IconButton onClick={handleEmojiPickerModal}>
        <SentimentSatisfiedOutlinedIcon />
      </IconButton>
    </>
  );
}

export default EmojiPicker;
