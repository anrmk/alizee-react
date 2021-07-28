import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import {
  Avatar as MUIAvatar,
  IconButton,
  Fade,
  Box,
  Tooltip,
} from "@material-ui/core";

import CameraIcon from "@material-ui/icons/PhotoCamera";
import ClearIcon from "@material-ui/icons/Clear";

import { DEFAULT_VARIANT } from "./constants";
import useStyles, { StyledBadge } from "./styles";

function Avatar({
  src,
  size,
  className,
  badgeClassName,
  borderWidth,
  borderColor,
  variant = DEFAULT_VARIANT,
  online,
  live,
  avatarBaseProps,
  badgeProps,
  dotWidth,
  fileInputProps,
  showControls,
  children,
  onNewImageClick,
  onFileInputChange,
  onDeleteImageClick,
}) {
  const classes = useStyles({
    size,
    borderWidth,
    borderColor,
    variant,
    online,
    live,
    dotWidth,
  });
  const fileInputEl = useRef(null);
  const [focusAvatar, setFocusAvatar] = useState(false);

  const handleAvatarUrlChange = () => {
    const { files } = fileInputEl.current;

    if (files.length === 1) {
      onFileInputChange && onFileInputChange(files[0]);
    }
  };

  const handleNewImageClick = () => {
    fileInputEl.current.click();

    onNewImageClick && onNewImageClick();
  };

  const renderFileInput = () => (
    <input
      hidden
      type="file"
      name="avatarUrl"
      ref={fileInputEl}
      {...fileInputProps}
      onChange={handleAvatarUrlChange}
    />
  );

  const renderWithBadge = () => (
    <StyledBadge
      {...badgeProps}
      dotwidth={dotWidth}
      className={clsx(classes.badge, badgeClassName, className)}>
      <MUIAvatar
        {...avatarBaseProps}
        className={clsx(classes.avatar)}
        src={src}>
        {children}
      </MUIAvatar>
    </StyledBadge>
  );

  const renderBase = () => (
    <MUIAvatar
      {...avatarBaseProps}
      className={clsx(classes.avatar, className)}
      src={src}>
      {children}
    </MUIAvatar>
  );

  const renderWithControls = () => (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      onMouseEnter={() => setFocusAvatar(true)}
      onMouseLeave={() => setFocusAvatar(false)}>
      {online !== undefined ? renderWithBadge() : renderBase()}
      <Fade in={focusAvatar}>
        <Box className={classes.controls}>
          <Tooltip title="Change avatar image">
            <IconButton onClick={handleNewImageClick}>
              <CameraIcon />
            </IconButton>
          </Tooltip>
          {src && (
            <Tooltip title="Delete avatar image">
              <IconButton onClick={onDeleteImageClick}>
                <ClearIcon />
              </IconButton>
            </Tooltip>
          )}
        </Box>
      </Fade>
      {renderFileInput()}
    </Box>
  );

  if ((onNewImageClick || onDeleteImageClick) && showControls) {
    return renderWithControls();
  }

  if (online !== undefined) {
    return renderWithBadge();
  }

  return renderBase();
}

Avatar.propTypes = {
  live: PropTypes.bool,
  online: PropTypes.bool,
  badgeProps: PropTypes.object,
  dotWidth: PropTypes.string,
};

Avatar.defaultProps = {
  live: undefined,
  online: undefined,
  badgeProps: {
    overlap: "circle",
    anchorOrigin: {
      vertical: "bottom",
      horizontal: "right",
    },
    variant: "dot",
  },
  dotWidth: undefined,
};

export default Avatar;
