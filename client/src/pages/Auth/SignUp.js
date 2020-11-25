import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Container } from "@material-ui/core";

import { SignUpForm } from "../../domain/AuthForms";

import * as signUpActions from "../../store/actions/signUp";
import * as signInActions from "../../store/actions/signIn";
import * as socialAuthActions from "../../store/actions/socialAuth";
import { HOME_ROUTE, EMAIL_CONFIRMATION } from "../../constants/routes";
import ApiContext from "../../context/ApiContext";
import useStyles from "./styles";

function SignUp(props) {
  const apiClient = useContext(ApiContext);
  const classes = useStyles();

  const { isSignUp, isSocial, errorMessage } = props;
  const {
    signUp,
    signUpSocial,
    requestSignUpSocial,
    failSignUpSocial
  } = props;

  if (isSocial) {
    return <Redirect to={HOME_ROUTE} />
  }

  if (isSignUp) {
    return <Redirect to={EMAIL_CONFIRMATION} />
  }

  const handleFormSubmit = (formData) => {
    (async () => {
      await signUp(
        apiClient,
        {
          name: formData.name,
          surname: formData.surname,
          birthday: formData.birthday,
          username: formData.username,
          email: formData.email,
          phoneNumber: formData.phoneNumber
        });
    })();
  };

  const handleSocialRequest = () => {
    requestSignUpSocial()
  }

  const handleSocialSuccess = (response, socialType) => {
    (async () => {
      await signUpSocial(apiClient, socialType, response);
    })();
  }

  const handleSocialFailure = (response) => {
    failSignUpSocial(response.error);
  }

  return (
    <Container className={classes.container}>
      <SignUpForm
        error={errorMessage}
        onSubmit={handleFormSubmit}
        onSocialRequest={handleSocialRequest}
        onSocialSuccess={handleSocialSuccess}
        onSocialFailure={handleSocialFailure} />
    </Container>
  );
}

function mapStateToProps(state) {
  return {
    isSignUp: state.signUp.isSignUp,
    isSocial: state.signIn.isSocial,
    errorMessage: state.signUp.errorMessage
  }
}

function mapDispatchToProps(dispatch) {
  return {
    signUp: (api, creds) => dispatch(signUpActions.signUpUser(api, creds)),
    signUpSocial: (api, socialType, data) => dispatch(signInActions.signInSocial(api, socialType, data)),
    requestSignUpSocial: () => dispatch(socialAuthActions.requestSocialAuth()),
    failSignUpSocial: (message) => dispatch(socialAuthActions.errorSocialAuth(message))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
