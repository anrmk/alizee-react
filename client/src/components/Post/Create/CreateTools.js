import React, { useRef } from "react";

import IconButton from "@material-ui/core/IconButton";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import LockOpenOutlinedIcon from "@material-ui/icons/LockOpenOutlined";
import CommentOutlinedIcon from "@material-ui/icons/SpeakerNotesOutlined";
import CommentBlockOutlinedIcon from "@material-ui/icons/SpeakerNotesOffOutlined";
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary";

import { Input } from "@material-ui/core";

function CreateTools({ isPrivate, isCommentable, className, onChange }) {
  const mediaRef = useRef();

  return (
    <div className={className}>
      <Input id="input-amount" type="number" inputProps={{ min: 0, max: 100000 }} placeholder="Amount" />

      <IconButton onClick={onChange} name="private">
        {isPrivate ? (
          <LockOutlinedIcon fontSize="small" color="secondary" />
        ) : (
          <LockOpenOutlinedIcon fontSize="small" />
        )}
      </IconButton>

      <IconButton onClick={onChange} name="commentable">
        {isCommentable ? (
          <CommentOutlinedIcon fontSize="small" />
        ) : (
          <CommentBlockOutlinedIcon fontSize="small" color="secondary" />
        )}
      </IconButton>

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
    </div>
  );
}

export default CreateTools;
