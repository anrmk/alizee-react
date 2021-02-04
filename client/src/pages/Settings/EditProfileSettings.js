import React, { useContext } from "react";
import { connect } from "react-redux";

import ApiContext from '../../context/ApiContext';
import * as settingsActions from '../../store/actions/settings';
import { EditProfileForm } from '../../domain/SettingsForms';

function EditProfileSettings(props) {
  const apiClient = useContext(ApiContext);

  const { me } = props;
  const {
    updateAccount,
  } = props;

  const handleEditProfileSubmit = (data) => {
    (async () => {
      await updateAccount(apiClient, data);
    })();
  }

  return (
    <EditProfileForm {...me} onSubmit={handleEditProfileSubmit} />
  )
}

function mapStateToProps(state) {
  return {
    me: {
      avatarUrl: state.signIn?.userInfo?.avatarUrl,
      userName: state.signIn?.userInfo?.userName,
      membership: state.signIn?.userInfo?.membership,
      name: state.signIn?.userInfo?.name,
      bio: state.signIn?.userInfo?.bio,
      birthday: state.signIn?.userInfo?.birthday,
      email: state.signIn?.userInfo?.email,
      phone: state.signIn?.userInfo?.phoneNumber,
      sites: state.signIn?.userInfo?.sites,
      isFetching: state.signIn.isFetching
    },
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateAccount: (api, data) => dispatch(settingsActions.updateAccount(api, data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfileSettings);
