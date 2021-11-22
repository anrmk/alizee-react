import React, { useContext, useEffect } from "react";
import { connect } from "react-redux";
import ApiContext from "../../../context/ApiContext";
import * as settingsActions from "../../../store/actions/settings";
import EditAccountForm from "./EditForm/index";
import useAlert from "../../../hooks/useAlert";

const EditAccountSettings = ({
  data,
  requestStatus,
  isFetching,
  getAccount,
  updateAccount,
  onBackClick,
}) => {
  const apiClient = useContext(ApiContext);
  useAlert(requestStatus);
  useEffect(() => {
    getAccount(apiClient);
  }, []);
  const handleEditAccountSubmit = (pData) => {
    (async () => {
      await updateAccount(apiClient, pData);
    })();
  };
  return (
    !isFetching && (
      <EditAccountForm
        {...data}
        onSubmit={handleEditAccountSubmit}
        onBackClick={onBackClick}
      />
    )
  );
};
function mapStateToProps(state) {
  return {
    data: state.settings.data,
    requestStatus: state.signIn.requestStatus,
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
