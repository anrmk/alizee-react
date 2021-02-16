import { useContext, useCallback } from "react";

import ApiContext from "../../context/ApiContext";
import dialogs, { SEND_TIP_DIALOG_TYPE } from "../../constants/dialogs";
import useDialog from "../useDialog";

export default function useSendTipDialog({ isFetching, onSendTip }) {
  const apiClient = useContext(ApiContext);
  const dialog = useDialog();
  const FORM_ID = "dialog-sendTip";

  const handleSendTip = useCallback(
    async ({ user, amount, message }) => {
      dialog.toggle({ open: false });
      !isFetching && (await onSendTip(apiClient, user.userName, amount, message));
    },
    [onSendTip]
  );

  const handleDialogToggle = useCallback(async (user) => {
    dialog.toggle(
      dialogs[SEND_TIP_DIALOG_TYPE](
        {
          mainBtnProps: { type: "submit", form: FORM_ID },
          tempData: user,
        },
        {
          formId: FORM_ID,
          onSubmit: handleSendTip,
          user
        }
      )
    );
  }, []);

  return {
    toggle: handleDialogToggle,
  };
}
