import React, { useEffect, useContext } from "react";
import { connect } from "react-redux";

import { NotificationForm } from "../../domain/SettingsForms";

import ApiContext from "../../context/ApiContext";
import * as settingsActions from "../../store/actions/settings";

function NotificationSettings(props) {
  const { settings } = props;
  const { getNotification, updateNotification } = props;

  const apiClient = useContext(ApiContext);

  useEffect(() => {
    getNotification(apiClient);
  }, []);

  const handleNotificationSettingsChange = (formData) => {
    if (!settings.isFetching) {
      (async () => {
        await updateNotification(apiClient, formData);
      })();
    }
  };

  return (
    <NotificationForm {...settings.data} loading={settings.isFetching} onChange={handleNotificationSettingsChange} />
  );
}

function mapStateToProps(state) {
  return {
    settings: {
      isFetching: state.settings.isFetching,
      data: state.settings.data,
    },
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getNotification: (api) => dispatch(settingsActions.getNotification(api)),
    updateNotification: (api, formData) => dispatch(settingsActions.updateNotification(api, formData)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationSettings);
