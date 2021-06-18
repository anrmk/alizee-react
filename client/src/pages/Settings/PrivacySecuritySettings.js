import React, { useEffect, useContext } from "react";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import { useSnackbar } from "notistack";

import { PrivacyForm } from '../../domain/SettingsForms';

import ApiContext from '../../context/ApiContext';
import * as settingsActions from '../../store/actions/settings';
import * as userActions from '../../store/actions/user';
import dialogs, { AGREE_DIALOG_TYPE, RESET_PWD_ACCOUNT_DIALOG_TYPE } from "../../constants/dialogs";
import useDialog from "../../hooks/useDialog";

const DEFAULT_ALERT_SUCCESS_TEXT = "Settings have been updated";
const DEFAULT_ALERT_ERROR_TEXT = "Settings have not been updated";
const SET_PRIVATE_ALERT_ERROR_TEXT = "Subscription price should be zero (free) If you cannot update account visibility to public";
const RESET_PASSWORD_ALERT_SUCCESS_TEXT = "The reset link has been sent to the mail, please check your mail";
const RESET_PASSWORD_ALERT_ERROR_TEXT = "Something went wrong try again please";
const DELETE_ACCOUNT_ALERT_SUCCESS_TEXT = "The account has been deleted";
const DELETE_ACCOUNT_ALERT_ERROR_TEXT = "The account has not been deleted";

function PrivacySecuritySettings(props) {
  const apiClient = useContext(ApiContext);
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();

  const { privacySettings, user } = props;
  const {
    getPrivacy,
    updateActivityStatus,
    updatePrivateStatus,
    updateOffensiveComments,
    deleteAccount,
    getSettingsResetPasswordConfirm
  } = props;
  const dialog = useDialog();

  useEffect(() => {
    getPrivacy(apiClient);
  }, [])

  const handleAccountPrivateChange = (status) => {
    if (!privacySettings.isFetching) {
      (async () => {
        await updatePrivateStatus(apiClient, status);
        setAlertText(DEFAULT_ALERT_SUCCESS_TEXT, SET_PRIVATE_ALERT_ERROR_TEXT);
      })();
    }
  }

  const handleActivityStatusChange = (status) => {
    if (!privacySettings.isFetching) {
      (async () => {
        await updateActivityStatus(apiClient, status);
        setAlertText();
      })();
    }
  }

  const handleOffensiveCommentsChange = (status) => {
    if (!privacySettings.isFetching) {
      (async () => {
        await updateOffensiveComments(apiClient, status);
        setAlertText();
      })();
    }
  }

  const handlePasswordResetConfirmClick = () => {
    (async () => {
      await getSettingsResetPasswordConfirm(apiClient);
      setAlertText(RESET_PASSWORD_ALERT_SUCCESS_TEXT, RESET_PASSWORD_ALERT_ERROR_TEXT);
    })();
  }

  const handlePasswordResetClick = () => {
    dialog.toggle(dialogs[RESET_PWD_ACCOUNT_DIALOG_TYPE]({ onMainClick: handlePasswordResetConfirmClick }));
  }

  const handleAccountDeleteConfirmClick = () => {
    (async () => {
      await deleteAccount(apiClient);
      setAlertText(DELETE_ACCOUNT_ALERT_SUCCESS_TEXT, DELETE_ACCOUNT_ALERT_ERROR_TEXT);
    })();
  }

  const handleAccountDeleteClick = () => {
    dialog.toggle(dialogs[AGREE_DIALOG_TYPE]({
      title: t("DeleteAccountDialogTitle"),
      onMainClick: handleAccountDeleteConfirmClick
    }, {
      content: t("DeleteAccountDialogDescription")
    }));
  }

  const setAlertText = (success = DEFAULT_ALERT_SUCCESS_TEXT, error = DEFAULT_ALERT_ERROR_TEXT) => {
    if (user.errorMessage || privacySettings.errorMessage) {
      enqueueSnackbar(error, { variant: "error" });
    } else {
      enqueueSnackbar(success, { variant: "success" });
    }
  }

  return (
    <PrivacyForm 
      {...privacySettings.data}
      loading={privacySettings.isFetching || user.isFetching}
      onAccountPrivateUpdate={handleAccountPrivateChange}
      onActivityStatusUpdate={handleActivityStatusChange}
      onOffensiveCommentsUpdate={handleOffensiveCommentsChange}
      onPasswordReset={handlePasswordResetClick}
      onAccountDelete={handleAccountDeleteClick} />
  )
}

function mapStateToProps(state) {
  return {
    privacySettings: { 
      isFetching: state.settings.isFetching,
      data: {
        ...state.settings.data,
        email: state.signIn?.userInfo?.email,
        token: state.signIn?.userInfo?.token
      },
      errorMessage: state.settings.errorMessage,
    },
    user: {
      isFetching: state.user.isFetching,
      errorMessage: state.user.errorMessage
    }
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getPrivacy: (api) => dispatch(settingsActions.getPrivacy(api)),
    updateActivityStatus: (api, status) => dispatch(settingsActions.updateActivityStatus(api, status)),
    updatePrivateStatus: (api, status) => dispatch(settingsActions.updatePrivateStatus(api, status)),
    updateOffensiveComments: (api, status) => dispatch(settingsActions.updateOffensiveComments(api, status)),
    deleteAccount: (api) => dispatch(settingsActions.deleteAccount(api)),
    getSettingsResetPasswordConfirm: (api) => dispatch(userActions.getSettingsResetPasswordConfirm(api)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PrivacySecuritySettings);
