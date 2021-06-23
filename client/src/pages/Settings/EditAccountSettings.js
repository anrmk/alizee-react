import React, { useContext, useEffect } from "react";
import { connect } from "react-redux";

import ApiContext from "../../context/ApiContext";
import * as settingsActions from "../../store/actions/settings";
import EditAccountForm from "../../domain/SettingsForms/EditAccountForm";

function EditAccountSettings({ user, isFetching, updateAccount, onSetAlertText }) {
  const apiClient = useContext(ApiContext);

  const handleEditAccountSubmit = (data) => {
    (async () => {
      const fulfilled = await updateAccount(apiClient, data);
      onSetAlertText(fulfilled);
    })();
  };

  return <EditAccountForm {...user} onSubmit={handleEditAccountSubmit} />;
}

function mapStateToProps(state) {
  return {
    user: state.signIn.userInfo,
    isFetching: state.signIn.isFetching,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateAccount: (api, data) => dispatch(settingsActions.updateAccount(api, data)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditAccountSettings);
