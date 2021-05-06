import React, { useContext, useEffect } from "react";
import { connect } from "react-redux";

import ApiContext from "../../context/ApiContext";
import * as settingsActions from "../../store/actions/settings";

import EditPersonalForm from "../../domain/SettingsForms/EditPersonalForm";

function EditPersonalSettings({data, isFetching, getPersonal, updatePersonal }) {
  const apiClient = useContext(ApiContext);

  useEffect(() => {
    getPersonal(apiClient);
  }, []);

  const handleEditPersonalSubmit = (data) => {
    (async () => {
      await updatePersonal(apiClient, data);
    })();
  };

  return (!isFetching && <EditPersonalForm {...data} onSubmit={handleEditPersonalSubmit} /> );
}

function mapStateToProps(state) {
  return {
    data: state.settings.data,
    isFetching: state.settings.isFetching
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getPersonal: (api) => dispatch(settingsActions.getPersonal(api)),
    updatePersonal: (api, data) => dispatch(settingsActions.updatePersonal(api, data))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditPersonalSettings);
