import { useContext, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import ApiContext from "../../context/ApiContext";
import dialogs, {
  SEND_TIP_DIALOG_TYPE,
  SEND_DONATE_DIALOG_TYPE,
} from "../../constants/dialogs";
import * as paymentActions from "../../store/actions/payment";
import useDialog from "../useDialog";

import {
  SEND_TIP_ALERT_SUCCESS_TEXT,
  SEND_TIP_ALERT_ERROR_TEXT,
} from "../../constants/alerts";
import useAlert from "../useAlert";

const FORM_ID = "dialog-sendTip";

export default function useSendTipDialog() {
  const { requestStatus } = useSelector((state) => state.payment);

  const apiClient = useContext(ApiContext);
  const dialog = useDialog();
  useAlert(
    requestStatus,
    SEND_TIP_ALERT_SUCCESS_TEXT,
    SEND_TIP_ALERT_ERROR_TEXT
  );

  const dispatch = useDispatch();

  const handleSendTip = useCallback(async (data, isDonate) => {
    dialog.setParams({ loading: true });
    isDonate
      ? await dispatch(paymentActions.sendDonation(apiClient, data))
      : await dispatch(paymentActions.sendTip(apiClient, data));

    dialog.toggle({ open: false, loading: false });
  }, []);

  const handleDialogToggle = useCallback(async (user, isDonate) => {
    isDonate
      ? dialog.toggle(
          dialogs[SEND_DONATE_DIALOG_TYPE](
            {
              mainBtnProps: { type: "submit", form: FORM_ID },
            },
            {
              formId: FORM_ID,
              onSubmit: handleSendTip,
              user,
              isDonate,
            }
          )
        )
      : dialog.toggle(
          dialogs[SEND_TIP_DIALOG_TYPE](
            {
              mainBtnProps: { type: "submit", form: FORM_ID },
            },
            {
              formId: FORM_ID,
              onSubmit: handleSendTip,
              user,
              isDonate,
            }
          )
        );
  }, []);

  return {
    toggle: handleDialogToggle,
  };
}
