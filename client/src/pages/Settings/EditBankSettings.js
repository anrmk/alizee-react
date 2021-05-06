import React, { useContext, useEffect } from "react";
import { connect } from "react-redux";

import ApiContext from "../../context/ApiContext";
import * as settingsActions from "../../store/actions/settings";
import { EditBankForm } from "../../domain/SettingsForms";

function EditBankSettings({data, isFetching, getBank, updateBank }) {
  const apiClient = useContext(ApiContext);

  useEffect(() => {
    getBank(apiClient);
  }, []);

  const handleEditBankSubmit = (data) => {
    (async () => {
      await updateBank(apiClient, data);
    })();
  };
  return (!isFetching && <EditBankForm {...data} onSubmit={handleEditBankSubmit} /> );
}

function mapStateToProps(state) {
  return {
    data: state.settings.data,
    isFetching: state.settings.isFetching
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getBank: (api) => dispatch(settingsActions.getBank(api)),
    updateBank: (api, data) => dispatch(settingsActions.updateBank(api, data))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditBankSettings);