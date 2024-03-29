import React, { useContext, useEffect } from "react";
import { connect } from "react-redux";

import ApiContext from "../../context/ApiContext";
import * as settingsActions from "../../store/actions/settings";
import { EditCardForm } from "../../domain/SettingsForms";

function EditCardSettings({ data, isFetching, getCard, updateCard, onSetAlertText }) {
  const apiClient = useContext(ApiContext);

  useEffect(() => {
    getCard(apiClient);
  }, []);

  const handleEditCardSubmit = (data) => {
    (async () => {
      const fulfilled = await updateCard(apiClient, data);
      onSetAlertText(fulfilled);
    })();
  };
  return !isFetching && <EditCardForm {...data} onSubmit={handleEditCardSubmit} />;
}

function mapStateToProps(state) {
  return {
    data: state.settings.data,
    isFetching: state.settings.isFetching,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getCard: (api) => dispatch(settingsActions.getCard(api)),
    updateCard: (api, data) => dispatch(settingsActions.updateCard(api, data)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditCardSettings);
