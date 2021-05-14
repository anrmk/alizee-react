import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core";

import ApiContext from "../context/ApiContext";
import AlertContainer from "../components/AlertContainer"
import { confirmEmail } from "../store/actions/confirmEmail";
import StatusError from "../components/StatusError";
import { ChangePasswordForm } from "../domain/PasswordForms";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh"
  }
}))

function EmailVerify({ signIn, confirmingEmail, confirmEmail }) {
  const classes = useStyles();
  const apiClient = useContext(ApiContext);
  const [alertOpen, setAlertOpen] = useState(false);

  if (signIn.isVerified) {
    return <Redirect to="/" />
  }

  if (signIn.errorMessage) {
    return <StatusError code={signIn.errorStatus} message={signIn.errorMessage} />;
  }

  if (confirmingEmail.errorMessage) {
    return <StatusError code={confirmingEmail.errorStatus} message={confirmingEmail.errorMessage} />;
  }

  const handleSubmit = async (password) => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const email = urlParams.get("email");
    const token = urlParams.get("token");

    if (email && 
        token && 
        !confirmingEmail.isFetching &&
        !confirmingEmail.isConfirmed && 
        password) {
      await confirmEmail(apiClient, {
        password,
        email,
        token
      });
      setAlertOpen(true);
    }
  }

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
        onSubmit={handleSubmit} />
    </AlertContainer>
  );
}

function mapStateToProps(state) {
  return {
    signIn: {
      isFetching: state.signIn.isFetching,
      isVerified: state.signIn.isVerified,
      errorMessage: state.signIn.errorMessage,
      errorStatus: state.signIn.errorStatus
    },
    confirmingEmail: {
      isFetching: state.confirmEmail.isFetching,
      isConfirmed: state.confirmEmail.isConfirmed,
      errorMessage: state.confirmEmail.errorMessage,
      errorStatus: state.confirmEmail.errorStatus
    }
  }
}

function mapDispatchToProps(dispatch) {
  return {
    confirmEmail: (api, creds) => dispatch(confirmEmail(api, creds))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EmailVerify)
