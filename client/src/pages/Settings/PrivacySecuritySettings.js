import React, { useEffect, useContext } from "react";
import { connect } from "react-redux";

import ApiContext from '../../context/ApiContext';
import * as settingsActions from '../../store/actions/settings';
import { PrivacyForm } from '../../domain/SettingsForms';

function PrivacySecuritySettings(props) {
  const apiClient = useContext(ApiContext);

  const { settings } = props;
  const {
    getPrivacy,
    updateActivityStatus,
    updatePrivateStatus,
    updateOffensiveComments,
    deleteAccount 
  } = props;

  useEffect(() => {
    (async () => {
      await getPrivacy(apiClient);
    })();
  }, [])

  const handleAccountPrivateChange = (status) => {
    if (!settings.isFetching) {
      (async () => {
        await updatePrivateStatus(apiClient, status);
      })();
    }
  }

  const handleActivityStatusChange = (status) => {
    if (!settings.isFetching) {
      (async () => {
        await updateActivityStatus(apiClient, status);
      })();
    }
  }

  const handleOffensiveCommentsChange = (status) => {
    if (!settings.isFetching) {
      (async () => {
        await updateOffensiveComments(apiClient, status);
      })();
    }
  }

  const handleAccountDeleteSubmit = () => {
    (async () => {
      await deleteAccount(apiClient);
    })();
  }

  return (
    <PrivacyForm 
      {...settings.privacy}
      loading={settings.isFetching}
      onAccountPrivateUpdate={handleAccountPrivateChange}
      onActivityStatusUpdate={handleActivityStatusChange}
      onOffensiveCommentsUpdate={handleOffensiveCommentsChange}
      onAccountDelete={handleAccountDeleteSubmit} />
  )
}

function mapStateToProps(state) {
  return {
    settings: {
      privacy: { 
        ...state.settings.data
      },
      issFetching: state.settings.isFetching
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PrivacySecuritySettings);
