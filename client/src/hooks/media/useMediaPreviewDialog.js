import {  useCallback } from "react";

import dialogs, { MEDIA_PREVIEW_DIALOG_TYPE } from "../../constants/dialogs";
import useDialog from "../useDialog";

export default function useMediaPreviewDialog() {
  const dialog = useDialog();

  const handleDialogToggle = useCallback(async (data) => {
    dialog.toggle(dialogs[MEDIA_PREVIEW_DIALOG_TYPE](null, data));
  }, []);

  return {
    toggle: handleDialogToggle,
  };
}
