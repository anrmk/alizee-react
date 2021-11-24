import { useCallback } from "react";

import dialogs, {
  UPLOAD_FILE_AMOUNT_ERROR_DIALOG_TYPE,
} from "../constants/dialogs";
import useDialog from "./useDialog";

export default function useErrorDialog({ errorText }) {
  const dialog = useDialog();

  const handleDialogToggle = useCallback(async () => {
    dialog.toggle(
      dialogs[UPLOAD_FILE_AMOUNT_ERROR_DIALOG_TYPE](null, { errorText })
    );
  }, []);

  return {
    toggle: handleDialogToggle,
  };
}
