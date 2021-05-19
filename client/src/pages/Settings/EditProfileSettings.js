import React, { useContext } from "react";
import { connect } from "react-redux";

import ApiContext from "../../context/ApiContext";
import * as settingsActions from "../../store/actions/settings";
import { EditProfileForm } from "../../domain/SettingsForms";

function EditProfileSettings({ user, updateProfile }) {
  const apiClient = useContext(ApiContext);

  const handleEditProfileSubmit = (data) => {
    (async () => {
      await updateProfile(apiClient, data);
    })();
  };

  return <EditProfileForm {...user} onSubmit={handleEditProfileSubmit} />;
}

function mapStateToProps(state) {
  return {
    user: state.signIn.userInfo,
    isFetching: state.signIn.isFetching,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateProfile: (api, data) => dispatch(settingsActions.updateProfile(api, data)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfileSettings);
