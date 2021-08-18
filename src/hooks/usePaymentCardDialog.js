import React, { useContext, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useSnackbar } from "notistack";
import useDialog from "./useDialog";
import dialogs, {
  PAYMENT_CARD_DIALOG_TYPE,
  CONFIRM_DIALOG_TYPE,
} from "../constants/dialogs";

import ApiContext from "../context/ApiContext";
// TODO: another method
import { createCard } from "../store/actions/settings";

import { SETTINGS_BANK_ROUTE } from "../constants/routes";
import {
  DEFAULT_ALERT_SUCCESS_TEXT,
  DEFAULT_ALERT_ERROR_TEXT,
} from "../constants/alerts";

const FORM_ID = "create-card-dialog";

export default function usePaymentCardDialog() {
  const apiClient = useContext(ApiContext);
  const dispatch = useDispatch();
  const dialog = useDialog();
  const { enqueueSnackbar } = useSnackbar();
  const { identityVerified } = useSelector((state) => ({
    isFetching: state.settings.isFetching,
    identityVerified: state.signIn.userInfo.identityVerified,
  }));

  const handleSetAlertText = (fulfilled) => {
    if (fulfilled) {
      enqueueSnackbar(DEFAULT_ALERT_SUCCESS_TEXT, { variant: "success" });
    } else {
      enqueueSnackbar(DEFAULT_ALERT_ERROR_TEXT, { variant: "error" });
    }
  };

  const handlePaymentCardCreate = useCallback(async ({ data }) => {
    dialog.setParams({ loading: true });
    const fulfilled = await dispatch(createCard(apiClient, data));
    dialog.toggle({ open: false, loading: false });
    handleSetAlertText(fulfilled);
  }, []);

  const handleDialogToggle = useCallback(async () => {
    if (identityVerified) {
      dialog.toggle(
        dialogs[PAYMENT_CARD_DIALOG_TYPE](
          {
            title: "Create a payment card",
            mainBtnProps: { type: "submit", form: FORM_ID },
          },
          {
            formId: FORM_ID,
            onSubmit: handlePaymentCardCreate,
          }
        )
      );
    } else {
      dialog.toggle(
        dialogs[CONFIRM_DIALOG_TYPE](null, {
          contentText: (
            <Alert severity="warning">
              You are unable to create bundle until you have uploaded a photo
              ID. To upload a photo ID, please click{" "}
              <Link href={SETTINGS_BANK_ROUTE}>here</Link>
            </Alert>
          ),
        })
      );
    }
  }, [handlePaymentCardCreate, identityVerified]);

  return {
    toggle: handleDialogToggle,
  };
}