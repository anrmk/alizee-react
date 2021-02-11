import React from "react";
import { Box, IconButton } from "@material-ui/core";

import BackIcon from "@material-ui/icons/ArrowBackRounded";

import SelectableList from "../components/SelectableList/SelectableList";

function ChatListDialog({ items, onBackClick, onItemSelect }) {
  return (
    <Box display="block">
      <IconButton onClick={onBackClick}>
        <BackIcon />
      </IconButton>
      <SelectableList
        multiple
        items={items}
        onItemSelect={onItemSelect} />
    </Box>
  )
}

export default ChatListDialog;
