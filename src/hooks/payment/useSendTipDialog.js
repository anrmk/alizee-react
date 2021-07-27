import { useContext, useCallback } from "react";
import { useDispatch } from "react-redux";

import ApiContext from "../../context/ApiContext";
import dialogs, { SEND_TIP_DIALOG_TYPE } from "../../constants/dialogs";
import * as paymentActions from "../../store/actions/payment";
import useDialog from "../useDialog";
import { useSnackbar } from "notistack";

import {SEND_TIP_ALERT_SUCCESS_TEXT, SEND_TIP_ALERT_ERROR_TEXT  } from "../../constants/alerts"

const FORM_ID = "dialog-sendTip";

export default function useSendTipDialog() {
  const apiClient = useContext(ApiContext);
  const dialog = useDialog();
  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useDispatch();

  const handleSetAlertText = (fulfilled) => {
    if (fulfilled) {
      enqueueSnackbar(SEND_TIP_ALERT_SUCCESS_TEXT, { variant: "success" });
    } else {
      enqueueSnackbar(SEND_TIP_ALERT_ERROR_TEXT, { variant: "error" });
    }
  };
  
  const handleSendTip = useCallback(async ({ userName, amount, message }) => {
    dialog.setParams({ loading: true });
    const fulfilled = await dispatch(paymentActions.sendTip(apiClient, userName, amount, message));
    dialog.toggle({ open: false, loading: false });
	handleSetAlertText(fulfilled)
  }, []);

  const handleDialogToggle = useCallback(async (user) => {
    dialog.toggle(
      dialogs[SEND_TIP_DIALOG_TYPE](
        {
          mainBtnProps: { type: "submit", form: FORM_ID },
        },
        {
          formId: FORM_ID,
          onSubmit: handleSendTip,
          user,
        }
      )
    );
  }, []);

  return {
    toggle: handleDialogToggle,
  };
}
