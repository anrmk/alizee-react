import React, { useRef } from "react";

import IconButton from "@material-ui/core/IconButton";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import LockOpenOutlinedIcon from "@material-ui/icons/LockOpenOutlined";
import CommentOutlinedIcon from "@material-ui/icons/SpeakerNotesOutlined";
import CommentBlockOutlinedIcon from "@material-ui/icons/SpeakerNotesOffOutlined";
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary";

function CreateTools({ isPrivate, isCommentable, onChange }) {
  const mediaRef = useRef();

  return (
    <div className="nav">
      <IconButton className="nav-link" onClick={onChange} name="private">
        {isPrivate ? (
          <LockOutlinedIcon fontSize="small" color="secondary" />
        ) : (
          <LockOpenOutlinedIcon fontSize="small" />
        )}
      </IconButton>

      <IconButton className="nav-link" onClick={onChange} name="commentable">
        {isCommentable ? (
          <CommentOutlinedIcon fontSize="small" />
        ) : (
          <CommentBlockOutlinedIcon fontSize="small" color="secondary" />
        )}
      </IconButton>

      <IconButton className="nav-link" onClick={(e) => mediaRef.current.click()} >
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
      
      <div className="nav-item">
        <div className="input-group input-group-sm p-2">
          <div className="input-group-prepend">
            <span className="input-group-text">$</span>
          </div>
          <input
            className="form-control"
            name="amount"
            type="number"
            min="0"
            aria-label="Amount (to the nearest dollar)"
            placeholder="Amount"
            style={{ width: "80px" }}
            onChange={onChange}
          />
        </div>
      </div>
    </div>
  );
}

export default CreateTools;
