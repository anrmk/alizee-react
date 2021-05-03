import React, { useState, useRef } from "react";
import clsx from "clsx";
import { Box, IconButton, Tooltip, Fade } from "@material-ui/core";

import CameraIcon from "@material-ui/icons/PhotoCamera";
import ClearIcon from "@material-ui/icons/Clear"; 

import useStyles from "./styles";

function Cover({
  src,
  showControls,
  fileInputProps,
  rootClassName = null,
  children,
  onNewImageClick,
  onFileInputChange,
  onDeleteImageClick
}) {
  const classes = useStyles({ imageUrl: src });
  const fileInputEl = useRef(null);
  const [focusCover, setFocusCover] = useState(false);

  const handleCoverChange = (e) => {
    const files = e.target.files;

    if (files && files.length) {
      onFileInputChange && onFileInputChange(files[0]);
    }
  };

  const handleNewImageClick = () => {
    fileInputEl.current.click();

    onNewImageClick && onNewImageClick();
  }

  return (
    <Box className={clsx(classes.cover, rootClassName)}
      onMouseEnter={() => setFocusCover(true)}
      onMouseLeave={() => setFocusCover(false)}>
      {children}
      {showControls && (
        <Box
          position="absolute"
          right="0"
          bottom="0">
          <Fade in={focusCover}>
            <Box className={classes.controls}>
              <Tooltip title="Change cover image">
                <IconButton onClick={handleNewImageClick}>
                  <CameraIcon />
                </IconButton>
              </Tooltip>
              {src && (
                <Tooltip title="Delete cover image">
                  <IconButton onClick={onDeleteImageClick}>
                    <ClearIcon />
                  </IconButton>
                </Tooltip>
              )}
            </Box>
          </Fade>
          <input hidden type="file" name="avatarUrl" ref={fileInputEl} {...fileInputProps} onChange={handleCoverChange} />
        </Box>
      )}
    </Box>
  );
}

export default Cover;
