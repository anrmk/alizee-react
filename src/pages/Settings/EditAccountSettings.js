import React, { useContext, useEffect } from "react";
import { connect } from "react-redux";

import ApiContext from "../../context/ApiContext";
import * as settingsActions from "../../store/actions/settings";
import EditAccountForm from "../../domain/SettingsForms/EditAccountForm";

function EditAccountSettings({
  data,
  isFetching,
  getAccount,
  updateAccount,
  onSetAlertText,
}) {
  const apiClient = useContext(ApiContext);

  useEffect(() => {
    getAccount(apiClient);
  }, []);

  const handleEditAccountSubmit = (pData) => {
    (async () => {
      const fulfilled = await updateAccount(apiClient, pData);
      onSetAlertText(fulfilled);
    })();
  };
  return (
    !isFetching && (
      <EditAccountForm {...data} onSubmit={handleEditAccountSubmit} />
    )
  );
}

function mapStateToProps(state) {
  return {
    data: state.settings.data,
    isFetching: state.settings.isFetching,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getAccount: (api) => dispatch(settingsActions.getAccount(api)),
    updateAccount: (api, data) =>
      dispatch(settingsActions.updateAccount(api, data)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditAccountSettings);
