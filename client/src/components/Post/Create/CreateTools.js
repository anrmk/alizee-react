import React, { useRef } from "react";

import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import LockOpenOutlinedIcon from "@material-ui/icons/LockOpenOutlined";
import CommentOutlinedIcon from "@material-ui/icons/SpeakerNotesOutlined";
import CommentBlockOutlinedIcon from "@material-ui/icons/SpeakerNotesOffOutlined";
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary";

import { Box, Input, IconButton, Tooltip } from "@material-ui/core";

function CreateTools({ className, isPrivate, isCommentable, onChange }) {
  const mediaRef = useRef();

  return (
    <Box className={className}>
      <Input
        name="amount"
        onChange={onChange}
        type="number"
        inputProps={{ min: 0, max: 10000 }}
        placeholder="Amount"
      />

      <Tooltip title="Set Post to Private">
        <IconButton onClick={onChange} name="private">
          {isPrivate ? (
            <LockOutlinedIcon fontSize="small" color="secondary" />
          ) : (
            <LockOpenOutlinedIcon fontSize="small" />
          )}
        </IconButton>
      </Tooltip>

      <Tooltip title="Turn off Commenting">
        <IconButton onClick={onChange} name="commentable">
          {isCommentable ? (
            <CommentOutlinedIcon fontSize="small" />
          ) : (
            <CommentBlockOutlinedIcon fontSize="small" color="secondary" />
          )}
        </IconButton>
      </Tooltip>

      <Tooltip title="Share up to 10 photos and videos in one Post">
        <IconButton onClick={(e) => mediaRef.current.click()}>
          <PhotoLibraryIcon fontSize="small" />
          <input
            type="file"
            id="medias"
            name="medias"
            ref={mediaRef}
            style={{ display: "none" }}
            multiple
            onChange={onChange}
          />
        </IconButton>
      </Tooltip>
    </Box>
  );
}

export default CreateTools;
