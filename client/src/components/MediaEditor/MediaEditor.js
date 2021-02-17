import React, { useRef } from "react";
import PropTypes from "prop-types";
import { IconButton } from "@material-ui/core";

import ImageIcon from "@material-ui/icons/ImageOutlined";

import { useErrorDialog } from "../../components/ErrorDialog";
import useMediaEditorDialog from "../../hooks/media/useMediaEditorDialog";
import {
  TYPE_JPEG,
  TYPE_PJPEG,
  TYPE_GIF,
  TYPE_XPNG,
  TYPE_PNG,
  TYPE_MP4,
  TYPE_WEBM,
  TYPE_OGG,
} from "../../constants/media_types";

import useStyles from "./styles";

const supportedInputMediaType = [TYPE_JPEG, TYPE_PJPEG, TYPE_GIF, TYPE_XPNG, TYPE_PNG, TYPE_MP4, TYPE_WEBM, TYPE_OGG];
function MediaEditor({
  onSendMediaMessageClick
}) {
  const classes = useStyles();
  const mediaRef = useRef();

  const { onMediaChange } = useMediaEditorDialog({ onSendMediaMessageClick });
  const errorDialog = useErrorDialog({ errorText: "The number of uploaded files must not be more than 5 items" });

  const handleCheckMediaFileAmount = (mediaFiles) => {
    if (mediaFiles && mediaFiles.length > 5) {
      errorDialog.toggle();
      return true;
    }
    return false;
  };

  const handleMediaChange = (e) => {
    e.preventDefault();
    const mediaFiles = Object.values(e.target.files);

    if (!mediaFiles.length || handleCheckMediaFileAmount(mediaFiles)) {
      return;
    }

    mediaFiles.forEach((mediaFile) => {
      mediaFile.previewURL = URL.createObjectURL(mediaFile);
    });

    onMediaChange(mediaFiles);
    mediaRef.current.value = null;
  };

  return (
    <>
      <IconButton onClick={() => mediaRef.current.click()}>
        <ImageIcon className={classes.icon} />
      </IconButton>

      <input
        className={classes.mediaInputField}
        type="file"
        name="mediaInputField"
        ref={mediaRef}
        multiple
        accept={supportedInputMediaType.join(", ")}
        onChange={handleMediaChange}
      />
    </>
  );
}

MediaEditor.propTypes = {
  onSendMediaMessageClick: PropTypes.func,
};

MediaEditor.defaultProps = {
  onSendMediaMessageClick: undefined,
};
export default MediaEditor;
