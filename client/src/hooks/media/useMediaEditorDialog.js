import { useCallback, useEffect, useState} from "react";

import dialogs, { MEDIA_EDITOR_DIALOG_TYPE } from "../../constants/dialogs";
import {
  MAX_SIZE_VIDEO_MEDIA_FILE,
  MAX_SIZE_IMAGE_MEDIA_FILE,
  MEDIA_TYPE,
  MEDIA_GROUP_TYPE,
} from "../../constants/media_types";
import useDialog from "../useDialog";

export default function useMediaEditorDialog({ onSendMediaMessageClick }) {
  const dialog = useDialog();
  const [uploadedMediaFiles, setUploadedMediaFiles] = useState([]);

  useEffect(() => () => uploadedMediaFiles.forEach((file) => URL.revokeObjectURL(file.previewUrl)), []);

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
        dialogs[MEDIA_EDITOR_DIALOG_TYPE](
          {
            onMainClick: handleSendMediaMessage,
            onCloseClick: handleCloseMediaFilePreview,
          },
          {
            mediaFiles: uploadedMediaFiles,
            onChangeMediaFiles: handleChangeMediaFiles,
          }
        )
      );
    }
  }, [uploadedMediaFiles]);

  const onMediaChange = useCallback(async (data) => {
    setUploadedMediaFiles(data);
  }, []);

  return {
    onMediaChange
  };
}
