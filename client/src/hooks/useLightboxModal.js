import { useCallback, useEffect } from "react";
import dialogs, { LIGHTBOX_MODAL_TYPE } from "../constants/dialogs";
import useDialog from "./useDialog";

import { ESC_KEY_CODE } from "../constants/key_codes";

export default function useLightboxModal() {
  const dialog = useDialog();

  const handleModalCloseKeyPress = (e) => {
    if (e.keyCode === ESC_KEY_CODE) {
      dialog.toggle({ open: false });
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleModalCloseKeyPress, false);
    return () => {
      document.removeEventListener("keydown", handleModalCloseKeyPress, false);
    };
  }, []);

  const handleDialogToggle = useCallback(({ items, startSlideIndex = 0 }) => {
    dialog.toggle(dialogs[LIGHTBOX_MODAL_TYPE]({ asModal: true }, { items, startSlideIndex }));
  }, []);

  return {
    toggle: handleDialogToggle,
  };
}
