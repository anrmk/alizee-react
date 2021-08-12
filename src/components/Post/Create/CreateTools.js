import React, { useRef } from "react";

import CommentOutlinedIcon from "@material-ui/icons/SpeakerNotesOutlined";
import CommentBlockOutlinedIcon from "@material-ui/icons/SpeakerNotesOffOutlined";
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary";
import TagPeopleIcon from "@material-ui/icons/GroupAdd";
import PublicIcon from "@material-ui/icons/Public";
import VpnLockIcon from "@material-ui/icons/VpnLock";

import { Box, IconButton, Tooltip } from "@material-ui/core";

import {
  TYPE_JPEG,
  TYPE_PJPEG,
  TYPE_GIF,
  TYPE_XPNG,
  TYPE_PNG,
  TYPE_MP4,
  TYPE_MOV,
  TYPE_WEBM,
  TYPE_OGG,
} from "../../../constants/media_types";

const supportedInputMediaType = [
  TYPE_JPEG,
  TYPE_PJPEG,
  TYPE_GIF,
  TYPE_XPNG,
  TYPE_PNG,
  TYPE_MP4,
  TYPE_MOV,
  TYPE_WEBM,
  TYPE_OGG,
];

function CreateTools({
  multiple = true,
  onlyMedia,
  isExplorable,
  isCommentable,
  isTaggable,

  commentBtnName = "comment",
  privateBtnName = "private",
  tagBtnName = "taggedUsers",

  onChange,
}) {
  const mediaRef = useRef();

  return (
    <Box display="flex" alignItems="flex-start" marginTop={1} marginBottom={1}>
      {!onlyMedia && (
        <>
          {isTaggable && (
            <Tooltip title="Tag someone">
              <IconButton onClick={onChange} name={tagBtnName}>
                <TagPeopleIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          )}
          <Tooltip title={`Set Post to ${isExplorable ? "Private" : "Public"}`}>
            <IconButton onClick={onChange} name={privateBtnName}>
              {isExplorable ? (
                <VpnLockIcon fontSize="small" color="secondary" />
              ) : (
                <PublicIcon fontSize="small" />
              )}
            </IconButton>
          </Tooltip>

          <Tooltip title={`Turn ${isCommentable ? "off" : "on"} Commenting`}>
            <IconButton onClick={onChange} name={commentBtnName}>
              {isCommentable ? (
                <CommentOutlinedIcon fontSize="small" />
              ) : (
                <CommentBlockOutlinedIcon fontSize="small" color="secondary" />
              )}
            </IconButton>
          </Tooltip>
        </>
      )}

      <Tooltip title="Share up to 10 photos and videos in one Post">
        <IconButton onClick={() => mediaRef.current.click()}>
          <PhotoLibraryIcon fontSize="small" />
          <input
            type="file"
            multiple={multiple}
            id="medias"
            name="medias"
            ref={mediaRef}
            accept={supportedInputMediaType.join(", ")}
            style={{ display: "none" }}
            onChange={onChange}
          />
        </IconButton>
      </Tooltip>
    </Box>
  );
}

export default CreateTools;
