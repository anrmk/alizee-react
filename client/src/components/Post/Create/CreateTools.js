import React, { useRef } from "react";

import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import LockOpenOutlinedIcon from "@material-ui/icons/LockOpenOutlined";
import CommentOutlinedIcon from "@material-ui/icons/SpeakerNotesOutlined";
import CommentBlockOutlinedIcon from "@material-ui/icons/SpeakerNotesOffOutlined";
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary";

import { Box, IconButton, Tooltip } from "@material-ui/core";
import useStyles from "./styles";

function CreateTools({
  multiple = true,
  onlyMedia,
  isPrivate,
  isCommentable,
  commentBtnName = "comment",
  privateBtnName = "private",

  onChange
}) {
  const mediaRef = useRef();

  return (
    <Box display="flex">
      {!onlyMedia && (
        <>
          <Box>
            <Tooltip title="Set Post to Private">
              <IconButton onClick={onChange} name={privateBtnName}>
                {isPrivate ? (
                  <LockOutlinedIcon fontSize="small" color="secondary" />
                ) : (
                  <LockOpenOutlinedIcon fontSize="small" />
                )}
              </IconButton>
            </Tooltip>

            <Tooltip title="Turn off Commenting">
              <IconButton onClick={onChange} name={commentBtnName}>
                {isCommentable ? (
                  <CommentOutlinedIcon fontSize="small" />
                ) : (
                  <CommentBlockOutlinedIcon fontSize="small" color="secondary" />
                )}
              </IconButton>
            </Tooltip>
          </Box>
        </>
      )}
      <Tooltip title="Share up to 10 photos and videos in one Post">
        <IconButton onClick={(e) => mediaRef.current.click()}>
          <PhotoLibraryIcon fontSize="small" />
          <input
            type="file"
            multiple={multiple}
            id="medias"
            name="medias"
            ref={mediaRef}
            style={{ display: "none" }}
            onChange={onChange}
          />
        </IconButton>
      </Tooltip>
    </Box>
  );
}

export default CreateTools;
