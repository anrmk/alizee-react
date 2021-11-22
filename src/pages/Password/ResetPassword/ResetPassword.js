import React, { useState, useContext } from "react";
import { connect } from "react-redux";

import { Redirect } from "react-router-dom";
import ApiContext from "../../../context/ApiContext";
import * as userActions from "../../../store/actions/user";
import { ResetPasswordForm } from "../../../domain/PasswordForms";
import AlertContainer from "../../../components/AlertContainer";
import useStyles from "../styles";
import { HOME_ROUTE } from "../../../constants/routes";

function ResetSettings({
  isFetching,
  isAuthenticated,
  error,

  getPasswordConfirm,
}) {
  const apiClient = useContext(ApiContext);
  const classes = useStyles();
  const [alertOpen, setAlertOpen] = useState(false);

  if (isAuthenticated) {
    return <Redirect to={HOME_ROUTE} />;
  }

  const handleSubmit = async (email) => {
    await getPasswordConfirm(apiClient, email);
    setAlertOpen(true);
  };

  return (
    <AlertContainer
      successAlert="Reset link was sended to email. Check your email."
      errorAlert="Invalid email address"
      className={classes.container}
      alertOpen={alertOpen}
      error={error}
      onAlertClose={() => setAlertOpen(false)}>
      <ResetPasswordForm loading={isFetching} onSubmit={handleSubmit} />
    </AlertContainer>
  );
}

function mapStateToProps(state) {
  return {
    isFetching: state.user.isFetching,
    isAuthenticated: state.signIn.isAuthenticated,
    error: state.user.errorMessage,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getPasswordConfirm: (api, email) =>
      dispatch(userActions.getPasswordConfirm(api, email)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetSettings);
