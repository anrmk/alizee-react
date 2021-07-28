import { useCallback } from "react";

import dialogs, { SHARE_POST_DIALOG_TYPE } from "../../constants/dialogs";
import useDialog from "../useDialog";

export default function useSharePostDialog() {
  const dialog = useDialog();

  const handleDialogToggle = useCallback(async (data) => {
    dialog.toggleWithStack(
      dialogs[SHARE_POST_DIALOG_TYPE](null, {
        ...data,
      })
    );
  }, []);

  return {
    toggle: handleDialogToggle,
  };
}
