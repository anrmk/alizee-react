import React, { useContext } from "react";
import { connect } from "react-redux";

import ApiContext from "../../context/ApiContext";
import * as settingsActions from "../../store/actions/settings";
import { EditProfileForm } from "../../domain/SettingsForms";

function EditProfileSettings({ user, updateAccount }) {
  const apiClient = useContext(ApiContext);

  const handleEditProfileSubmit = (data) => {
    (async () => {
      await updateAccount(apiClient, data);
    })();
  };

  return <EditProfileForm {...user} onSubmit={handleEditProfileSubmit} />;
}

function mapStateToProps(state) {
  return {
    user: state.signIn.userInfo,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateAccount: (api, data) => dispatch(settingsActions.updateAccount(api, data)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfileSettings);
