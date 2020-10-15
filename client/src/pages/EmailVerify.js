import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import ApiContext from "../context/ApiContext";
import { confirmEmail } from "../store/actions/confirmEmail";
import StatusError from "../components/StatusError";

function EmailVerify({ signIn, confirmingEmail, confirmEmail }) {
  const apiClient = useContext(ApiContext);

  console.log(signIn, confirmingEmail)
  if (signIn.isVerified) {
    return <Redirect to="/" />
  }

  if (signIn.errorMessage) {
    return <StatusError code={signIn.errorStatus} message={signIn.errorMessage} />;
  }

  if (confirmingEmail.errorMessage) {
    return <StatusError code={confirmingEmail.errorStatus} message={confirmingEmail.errorMessage} />;
  }

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const email = urlParams.get('email');
  const token = urlParams.get('token');

  if (email && 
      token && 
      !confirmingEmail.isFetching &&
      !confirmingEmail.isConfirmed) {
    confirmEmail(apiClient, {
      email: email,
      token: token
    });
  }

  // TODO: replace with an existing component
  return (
    <div className="d-flex justify-content-center mt-3">
      <div className="spinner-border text-primary" style={{ width: "3rem", height: "3rem" }} role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    signIn: {
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
