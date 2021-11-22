import React, { useContext } from "react";
import { connect } from "react-redux";

import ApiContext from "../../../context/ApiContext";
import * as settingsActions from "../../../store/actions/settings";
import EditProfileForm from "./Forms/index";
import useAlert from "../../../hooks/useAlert";

function EditProfileSettings({
  user,
  requestStatus,
  updateProfile,
  onBackClick,
}) {
  const apiClient = useContext(ApiContext);
  useAlert(requestStatus);

  const handleEditProfileSubmit = (data) => {
    (async () => {
      await updateProfile(apiClient, data);
    })();
  };

  return (
    <EditProfileForm
      {...user}
      onSubmit={handleEditProfileSubmit}
      onBackClick={onBackClick}
    />
  );
}

function mapStateToProps(state) {
  return {
    requestStatus: state.signIn.requestStatus,
    user: state.signIn.userInfo,
    isFetching: state.signIn.isFetching,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateProfile: (api, data) =>
      dispatch(settingsActions.updateProfile(api, data)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditProfileSettings);
