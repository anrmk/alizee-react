import { useCallback } from "react";

import useDialog from "./useDialog";
import dialogs, { AGREE_DIALOG_TYPE } from "../constants/dialogs";

export default function useAgreeDialog(callback) {
  const dialog = useDialog();

  const handleConfirmClick = useCallback(() => {
    dialog.setParams({ loading: true });
    callback && callback();
    dialog.toggle({ open: false, loading: false });
  }, []);

  const handleDialogToggle = useCallback(() => {
    dialog.toggle(
      dialogs[AGREE_DIALOG_TYPE](
        {
          onMainClick: handleConfirmClick,
        },
        {
          content: "You will be redirected to authentication service",
        }
      )
    );
  }, []);

  return {
    toggle: handleDialogToggle,
  };
}
