import React, { useState, useEffect, useContext } from "react";
import { connect } from "react-redux";

import AlertContainer from "../../components/AlertContainer"
import { PrivacyForm } from '../../domain/SettingsForms';

import ApiContext from '../../context/ApiContext';
import * as settingsActions from '../../store/actions/settings';
import * as userActions from '../../store/actions/user';
import dialogs, { DELETE_ACCOUNT_DIALOG_TYPE, RESET_PWD_ACCOUNT_DIALOG_TYPE } from "../../constants/dialogs";
import useDialog from "../../hooks/useDialog";

const DEFAULT_ALERT_SUCCESS_TEXT = "Settings have been updated";
const DEFAULT_ALERT_ERROR_TEXT = "Settings have not been updated";
const RESET_PASSWORD_ALERT_SUCCESS_TEXT = "The reset link has been sent to the mail, please check your mail";
const RESET_PASSWORD_ALERT_ERROR_TEXT = "Something went wrong try again please";
const DELETE_ACCOUNT_ALERT_SUCCESS_TEXT = "The account has been deleted";
const DELETE_ACCOUNT_ALERT_ERROR_TEXT = "The account has not been deleted";

function PrivacySecuritySettings(props) {
  const apiClient = useContext(ApiContext);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertSuccessText, setAlertSuccessText] = useState(DEFAULT_ALERT_SUCCESS_TEXT);
  const [alertErrorText, setAlertErrorText] = useState(DEFAULT_ALERT_ERROR_TEXT);

  const { settings, user } = props;
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
    (async () => {
      await getPrivacy(apiClient);
    })();
  }, [])

  const handleAccountPrivateChange = (status) => {
    if (!settings.isFetching) {
      (async () => {
        await updatePrivateStatus(apiClient, status);
        setAlertTextToDefault();
      })();
    }
  }

  const handleActivityStatusChange = (status) => {
    if (!settings.isFetching) {
      (async () => {
        await updateActivityStatus(apiClient, status);
        setAlertTextToDefault();
      })();
    }
  }

  const handleOffensiveCommentsChange = (status) => {
    if (!settings.isFetching) {
      (async () => {
        await updateOffensiveComments(apiClient, status);
        setAlertTextToDefault();
      })();
    }
  }

  const handlePasswordResetConfirmClick = () => {
    (async () => {
      await getSettingsResetPasswordConfirm(apiClient);
      setAlertSuccessText(RESET_PASSWORD_ALERT_SUCCESS_TEXT)
      setAlertErrorText(RESET_PASSWORD_ALERT_ERROR_TEXT)
      setAlertOpen(true);
    })();
  }

  const handlePasswordResetClick = () => {
    dialog.toggle(dialogs[RESET_PWD_ACCOUNT_DIALOG_TYPE]({ onMainClick: handlePasswordResetConfirmClick }));
  }

  const handleAccountDeleteConfirmClick = () => {
    (async () => {
      await deleteAccount(apiClient);
      setAlertSuccessText(DELETE_ACCOUNT_ALERT_SUCCESS_TEXT);
      setAlertErrorText(DELETE_ACCOUNT_ALERT_ERROR_TEXT);
      setAlertOpen(true);
    })();
  }

  const handleAccountDeleteClick = () => {
    dialog.toggle(dialogs[DELETE_ACCOUNT_DIALOG_TYPE]({ onMainClick: handleAccountDeleteConfirmClick }));
  }
  
  const handleAlertClose = () => {
    setAlertOpen(false)
  }

  const setAlertTextToDefault = () => {
    setAlertSuccessText(DEFAULT_ALERT_SUCCESS_TEXT)
    setAlertErrorText(DEFAULT_ALERT_ERROR_TEXT);
    setAlertOpen(true)
  }

  return (
    <AlertContainer 
      successAlert={alertSuccessText || DEFAULT_ALERT_SUCCESS_TEXT}
      errorAlert={alertErrorText || DEFAULT_ALERT_ERROR_TEXT}
      alertOpen={alertOpen}
      error={user.error}
      onAlertClose={handleAlertClose}>
      <PrivacyForm 
        {...settings.privacy}
        loading={settings.isFetching || user.isFetching}
        onAccountPrivateUpdate={handleAccountPrivateChange}
        onActivityStatusUpdate={handleActivityStatusChange}
        onOffensiveCommentsUpdate={handleOffensiveCommentsChange}
        onPasswordReset={handlePasswordResetClick}
        onAccountDelete={handleAccountDeleteClick} />
    </AlertContainer>
  )
}

function mapStateToProps(state) {
  return {
    settings: {
      privacy: { 
        ...state.settings.data,
        email: state.signIn?.userInfo?.email,
        token: state.signIn?.userInfo?.token
      }
    },
    user: {
      isFetching: state.user.isFetching,
      error: state.user.errorMessage
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
