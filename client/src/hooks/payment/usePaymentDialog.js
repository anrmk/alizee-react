import { useContext, useCallback } from "react";

import ApiContext from "../../context/ApiContext";
import dialogs, { PAYMENT_DIALOG_TYPE } from "../../constants/dialogs";
import useDialog from "../useDialog";

export default function usePaymentDialog({ isFetching, onPayment }) {
  const apiClient = useContext(ApiContext);
  const dialog = useDialog();
  const FORM_ID = "dialog-payment";

  const handlePayment = useCallback(
    async ({ id }) => {
      dialog.toggle({ open: false });
      !isFetching && (await onPayment(apiClient, id));
    },
    [onPayment]
  );

  const handleDialogToggle = useCallback(async (data) => {
    dialog.toggle(dialogs[PAYMENT_DIALOG_TYPE]({ onMainClick: handlePayment, tempData: data }, data));
  }, []);

  return {
    toggle: handleDialogToggle,
  };
}
