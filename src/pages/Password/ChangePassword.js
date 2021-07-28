import React, { useState, useEffect, useContext } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";

import ApiContext from "../../context/ApiContext";
import * as userActions from "../../store/actions/user";
import { ChangePasswordForm } from "../../domain/PasswordForms";
import AlertContainer from "../../components/AlertContainer";
import { getUrlParams } from "../../helpers/functions";
import { SIGN_IN_ROUTE } from "../../constants/routes";
import useStyles from "./styles";

const GO_TO_PAGE_WITH_DELAY = 1000;

function ResetSettings({
  isFetching,
  error,
  passwordUpdated,

  changePassword,
}) {
  const history = useHistory();
  const apiClient = useContext(ApiContext);
  const classes = useStyles();
  const [alertOpen, setAlertOpen] = useState(false);

  const params = getUrlParams();

  useEffect(() => {
    if (passwordUpdated) {
      setTimeout(() => history.push(SIGN_IN_ROUTE), GO_TO_PAGE_WITH_DELAY);
    }
  }, [passwordUpdated]);

  if (!params?.token || !params?.email) {
    return <Redirect to={SIGN_IN_ROUTE} />;
  }

  const handleSubmit = async (password) => {
    const { token, email } = params;
    await changePassword(apiClient, { token, email, password });
    setAlertOpen(true);
  };

  return (
    <AlertContainer
      successAlert="You have changed your password."
      errorAlert="Password has not been changed."
      className={classes.container}
      alertOpen={alertOpen}
      error={error}
      onAlertClose={() => setAlertOpen(false)}>
      <ChangePasswordForm loading={isFetching} onSubmit={handleSubmit} />
    </AlertContainer>
  );
}

function mapStateToProps(state) {
  return {
    isFetching: state.user.isFetching,
    error: state.user.errorMessage,
    passwordUpdated: state.user.passwordUpdated,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changePassword: (api, opts) =>
      dispatch(userActions.resetPassword(api, opts)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetSettings);
