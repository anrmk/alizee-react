import React, { useEffect, useContext } from "react";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";

import { PrivacyForm } from "../../domain/SettingsForms";

import ApiContext from "../../context/ApiContext";
import * as settingsActions from "../../store/actions/settings";
import * as userActions from "../../store/actions/user";
import dialogs, {
  AGREE_DIALOG_TYPE,
  RESET_PWD_ACCOUNT_DIALOG_TYPE,
} from "../../constants/dialogs";
import useDialog from "../../hooks/useDialog";
import useAlert from "../../hooks/useAlert";

function PrivacySecuritySettings(props) {
  const apiClient = useContext(ApiContext);
  const { t } = useTranslation();

  const { privacySettings, user } = props;
  const {
    getPrivacy,
    updateActivityStatus,
    updatePrivateStatus,
    updateOffensiveComments,
    deleteAccount,
    getSettingsResetPasswordConfirm,
    onBackClick,
  } = props;
  const dialog = useDialog();
  useAlert(privacySettings.requestStatus);

  useEffect(() => {
    getPrivacy(apiClient);
  }, []);

  const handleAccountPrivateChange = (status) => {
    if (!privacySettings.isFetching) {
      (async () => {
        await updatePrivateStatus(apiClient, status);
      })();
    }
  };

  const handleActivityStatusChange = (status) => {
    if (!privacySettings.isFetching) {
      (async () => {
        await updateActivityStatus(apiClient, status);
      })();
    }
  };

  const handleOffensiveCommentsChange = (status) => {
    if (!privacySettings.isFetching) {
      (async () => {
        await updateOffensiveComments(apiClient, status);
      })();
    }
  };

  const handlePasswordResetConfirmClick = () => {
    (async () => {
      await getSettingsResetPasswordConfirm(apiClient);
    })();
  };

  const handlePasswordResetClick = () => {
    dialog.toggle(
      dialogs[RESET_PWD_ACCOUNT_DIALOG_TYPE]({
        onMainClick: handlePasswordResetConfirmClick,
      })
    );
  };

  const handleAccountDeleteConfirmClick = () => {
    (async () => {
      await deleteAccount(apiClient);
    })();
  };

  const handleAccountDeleteClick = () => {
    dialog.toggle(
      dialogs[AGREE_DIALOG_TYPE](
        {
          title: t("DeleteAccountDialogTitle"),
          onMainClick: handleAccountDeleteConfirmClick,
        },
        {
          content: t("DeleteAccountDialogDescription"),
        }
      )
    );
  };

  return (
    <PrivacyForm
      {...privacySettings.data}
      loading={privacySettings.isFetching || user.isFetching}
      onAccountPrivateUpdate={handleAccountPrivateChange}
      onActivityStatusUpdate={handleActivityStatusChange}
      onOffensiveCommentsUpdate={handleOffensiveCommentsChange}
      onPasswordReset={handlePasswordResetClick}
      onAccountDelete={handleAccountDeleteClick}
      onBackClick={onBackClick}
    />
  );
}

function mapStateToProps(state) {
  return {
    privacySettings: {
      isFetching: state.settings.isFetching,
      requestStatus: state.settings.requestStatus,
      data: {
        ...state.settings.data,
        email: state.signIn?.userInfo?.email,
        token: state.signIn?.userInfo?.token,
      },
      errorMessage: state.settings.errorMessage,
    },
    user: {
      isFetching: state.user.isFetching,
      errorMessage: state.user.errorMessage,
    },
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getPrivacy: (api) => dispatch(settingsActions.getPrivacy(api)),
    updateActivityStatus: (api, status) =>
      dispatch(settingsActions.updateActivityStatus(api, status)),
    updatePrivateStatus: (api, status) =>
      dispatch(settingsActions.updatePrivateStatus(api, status)),
    updateOffensiveComments: (api, status) =>
      dispatch(settingsActions.updateOffensiveComments(api, status)),
    deleteAccount: (api) => dispatch(settingsActions.deleteAccount(api)),
    getSettingsResetPasswordConfirm: (api) =>
      dispatch(userActions.getSettingsResetPasswordConfirm(api)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PrivacySecuritySettings);
