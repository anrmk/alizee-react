import React, { useContext, useEffect } from "react";
import { connect } from "react-redux";

import ApiContext from '../../context/ApiContext';
import BlackListForm from "../../domain/SettingsForms/BlackListForm";
import * as settingsActions from '../../store/actions/settings';

function BlackList(props) {
  const apiClient = useContext(ApiContext);

  const {
    data
  } = props;

  const {
    getBlackList,
    deleteBlackList
  } = props;

  useEffect(() => {
    (async () => {
      await getBlackList(apiClient);
    })();
  }, [])

  const handleDelete = (data) => {
    (async () => {
      await deleteBlackList(apiClient, data);
    })();
  }

  return (
    <BlackListForm items={data} onDelete={handleDelete} />
  );
}

function mapStateToProps(state) {
  return {
    data: state.settings.blackList
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getBlackList: (api) => dispatch(settingsActions.getBlackList(api)),
    deleteBlackList: (api, data) => dispatch(settingsActions.deleteBlackList(api, data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BlackList);
