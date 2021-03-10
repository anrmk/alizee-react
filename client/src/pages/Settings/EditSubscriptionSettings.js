import React, { useContext, useEffect } from "react";
import { connect } from "react-redux";

import ApiContext from "../../context/ApiContext";
import * as settingsActions from "../../store/actions/settings";
import { EditSubscriptionForm } from "../../domain/SettingsForms";

function EditSubscriptionSettings({ data, getSubscription, updateSubscription }) {
  const apiClient = useContext(ApiContext);

  useEffect(() => {
    (async () => {
      await getSubscription(apiClient);
    })();
  }, []);

  const handleEditProfileSubmit = async (data) => {
    await updateSubscription(apiClient, data);
  };

  return <EditSubscriptionForm price={data.price} onSubmit={handleEditProfileSubmit} />;
}

function mapStateToProps(state) {
  return {
    data: state.settings.data,
    isFetching: state.settings.isFetching
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getSubscription: (api) => dispatch(settingsActions.getSubscription(api)),
    updateSubscription: (api, opts) => dispatch(settingsActions.updateSubscription(api, opts)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditSubscriptionSettings);
