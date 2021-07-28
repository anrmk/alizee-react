import React, { useState, useContext, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core";

import ApiContext from "../context/ApiContext";
import AlertContainer from "../components/AlertContainer";
import * as emailActions from "../store/actions/confirmEmail";
import StatusError from "../components/StatusError";
import { ChangePasswordForm } from "../domain/PasswordForms";
import * as signActions from "../store/actions/signIn";
import { getUrlParams } from "../helpers/functions";
import { HOME_ROUTE } from "../constants/routes";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
}));

function EmailVerify({ signIn, confirmingEmail, confirmEmail, signOutUser }) {
  const classes = useStyles();
  const apiClient = useContext(ApiContext);
  const [alertOpen, setAlertOpen] = useState(false);
  const { token, email } = getUrlParams();

  useEffect(() => {
    signOutUser();
  }, []);

  if (confirmingEmail.isConfirmed || !token || !email) {
    return <Redirect to={HOME_ROUTE} />;
  }

  if (signIn.errorMessage) {
    return (
      <StatusError code={signIn.errorStatus} message={signIn.errorMessage} />
    );
  }

  if (confirmingEmail.errorMessage) {
    return (
      <StatusError
        code={confirmingEmail.errorStatus}
        message={confirmingEmail.errorMessage}
      />
    );
  }

  const handleSubmit = async (password) => {
    if (
      email &&
      token &&
      !confirmingEmail.isFetching &&
      !confirmingEmail.isConfirmed &&
      password
    ) {
      await confirmEmail(apiClient, {
        password,
        email,
        token,
      });
      setAlertOpen(true);
    }
  };

  return (
    <AlertContainer
      successAlert="Reset link was sended to email. Check your email."
      errorAlert="Invalid email address"
      className={classes.container}
      alertOpen={alertOpen}
      error={confirmingEmail.errorMessage}
      onAlertClose={() => setAlertOpen(false)}>
      <ChangePasswordForm
        title="Create new password"
        helperText="In order to protect your account, make sure you think strong password."
        btnText="Create Password"
        loading={confirmingEmail.isFetching}
        onSubmit={handleSubmit}
      />
    </AlertContainer>
  );
}

function mapStateToProps(state) {
  return {
    signIn: {
      isFetching: state.signIn.isFetching,
      isVerified: state.signIn.isVerified,
      errorMessage: state.signIn.errorMessage,
      errorStatus: state.signIn.errorStatus,
    },
    confirmingEmail: {
      isFetching: state.confirmEmail.isFetching,
      isConfirmed: state.confirmEmail.isConfirmed,
      errorMessage: state.confirmEmail.errorMessage,
      errorStatus: state.confirmEmail.errorStatus,
    },
  };
}

function mapDispatchToProps(dispatch) {
  return {
    confirmEmail: (api, creds) =>
      dispatch(emailActions.confirmEmail(api, creds)),
    signOutUser: () => dispatch(signActions.signOutUser()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EmailVerify);
