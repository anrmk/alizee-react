import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import { IconButton } from "@material-ui/core";

import ImageIcon from "@material-ui/icons/ImageOutlined";

import useDialog from "../../hooks/useDialog";
import dialogs, { UPLOAD_FILE_AMOUNT_ERROR_DIALOG_TYPE, UPLOAD_FILE_EDIT_DIALOG_TYPE } from "../../constants/dialogs";
import {
  MAX_SIZE_VIDEO_MEDIA_FILE,
  MAX_SIZE_IMAGE_MEDIA_FILE,
  MEDIA_TYPE,
  MEDIA_GROUP_TYPE,
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
  const dialog = useDialog();

  const [uploadedMediaFiles, setUploadedMediaFiles] = useState([]);

  useEffect(() => {
    return () => {
      uploadedMediaFiles.forEach((file) => URL.revokeObjectURL(file.previewUrl));
    };
  }, []);

  const handleCloseMediaFilePreview = () => {
    setUploadedMediaFiles([]);
  };

  const handleSendMediaMessage = () => {
    onSendMediaMessageClick(uploadedMediaFiles.filter((file) => {
      return MEDIA_TYPE[file.type] === MEDIA_GROUP_TYPE.VIDEO && file.size < MAX_SIZE_VIDEO_MEDIA_FILE
        || MEDIA_TYPE[file.type] === MEDIA_GROUP_TYPE.IMAGE && file.size < MAX_SIZE_IMAGE_MEDIA_FILE
    }));
    setUploadedMediaFiles([]);
    dialog.toggle({ open: false });
  };

  const handleChangeMediaFiles = (changedMediaFiles) => {
    if (changedMediaFiles.length === 0) {
      dialog.toggle({ open: false });
      setUploadedMediaFiles([]);
    }
    setUploadedMediaFiles(changedMediaFiles);
  };

  useEffect(() => {
    if (uploadedMediaFiles.length) {
      dialog.toggle(
        dialogs[UPLOAD_FILE_EDIT_DIALOG_TYPE](
          {
            onMainClick: handleSendMediaMessage,
            onCloseClick: handleCloseMediaFilePreview,
          },
          {
            files: uploadedMediaFiles,
            onChangeMediaFiles: handleChangeMediaFiles,
          }
        )
      );
    }
  }, [uploadedMediaFiles]);

  const handleCheckMediaFileAmount = (mediaFiles) => {
    if (mediaFiles && mediaFiles.length > 5) {
      dialog.toggle(
        dialogs[UPLOAD_FILE_AMOUNT_ERROR_DIALOG_TYPE](null, {
          errorText: `The number of uploaded files must not be more than 5 items`,
        })
      );
      return true;
    }
    return false;
  };

  const handleMediaChange = (e) => {
    e.preventDefault();
    setUploadedMediaFiles([]);
    const mediaFiles = Object.values(e.target.files);

    if (!mediaFiles.length || handleCheckMediaFileAmount(mediaFiles)) {
      return;
    }

    mediaFiles.forEach((mediaFile) => {
      mediaFile.previewURL = URL.createObjectURL(mediaFile);
    });

    setUploadedMediaFiles(mediaFiles);
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
