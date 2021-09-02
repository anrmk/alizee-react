import React, { useContext, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import useDialog from "./useDialog";
import dialogs, {
  SUBSCRIPTION_CAMPAIGN_DIALOG_TYPE,
  CONFIRM_DIALOG_TYPE,
} from "../constants/dialogs";

import ApiContext from "../context/ApiContext";

import { createCampaign } from "../store/actions/settings";

import { SETTINGS_BANK_ROUTE } from "../constants/routes";

const FORM_ID = "create-campaign-dialog";

export default function useSubscriptionBundleDialog() {
  const apiClient = useContext(ApiContext);
  const dispatch = useDispatch();
  const dialog = useDialog();
  const { identityVerified } = useSelector((state) => ({
    isFetching: state.settings.isFetching,
    identityVerified: state.signIn.userInfo.identityVerified,
  }));

  const handleCampaignCreate = useCallback(async ({ data }) => {
    dialog.setParams({ loading: true });
    await dispatch(createCampaign(apiClient, data));
    dialog.toggle({ open: false, loading: false });
  }, []);

  const handleDialogToggle = useCallback(async () => {
    if (identityVerified) {
      dialog.toggle(
        dialogs[SUBSCRIPTION_CAMPAIGN_DIALOG_TYPE](
          {
            title: "Promotion Campaign for",
            mainBtnProps: { type: "submit", form: FORM_ID },
          },
          {
            formId: FORM_ID,
            onSubmit: handleCampaignCreate,
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
  }, [handleCampaignCreate, identityVerified]);

  return {
    toggle: handleDialogToggle,
  };
}
