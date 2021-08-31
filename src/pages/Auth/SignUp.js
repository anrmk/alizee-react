import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

import { Hidden } from "@material-ui/core";
import { SignUpForm, Slider } from "../../domain/AuthForms";
import { TwoColumnLayout } from "../../layouts";

import * as signUpActions from "../../store/actions/signUp";
import * as signInActions from "../../store/actions/signIn";
import * as socialAuthActions from "../../store/actions/socialAuth";
import { HOME_ROUTE, EMAIL_CONFIRMATION_ROUTE } from "../../constants/routes";
import ApiContext from "../../context/ApiContext";

function SignUp(props) {
  const apiClient = useContext(ApiContext);

  const { isSignUp, isSocial, errorMessage } = props;
  const { signUp, signUpSocial, requestSignUpSocial, failSignUpSocial } = props;

  if (isSocial) {
    return <Redirect to={HOME_ROUTE} />;
  }

  if (isSignUp) {
    return <Redirect to={EMAIL_CONFIRMATION_ROUTE} />;
  }

  const handleFormSubmit = async (formData) => {
    await signUp(apiClient, formData);
  };

  const handleSocialRequest = () => {
    requestSignUpSocial();
  };

  const handleSocialSuccess = (response, socialType) => {
    (async () => {
      await signUpSocial(apiClient, socialType, response);
    })();
  };

  const handleSocialFailure = (response) => {
    failSignUpSocial(response.error);
  };

  return (
    <GoogleReCaptchaProvider
      useRecaptchaNet
      reCaptchaKey={process.env.REACT_APP_RECAPTCHA_KEY}
      scriptProps={{ async: true, defer: true, appendTo: "body" }}>
      <TwoColumnLayout>
        <Hidden smDown>
          <Slider />
        </Hidden>

        <SignUpForm
          error={errorMessage}
          onSubmit={handleFormSubmit}
          onSocialRequest={handleSocialRequest}
          onSocialSuccess={handleSocialSuccess}
          onSocialFailure={handleSocialFailure}
        />
      </TwoColumnLayout>
    </GoogleReCaptchaProvider>
  );
}

function mapStateToProps(state) {
  return {
    isSignUp: state.signUp.isSignUp,
    isSocial: state.signIn.isSocial,
    errorMessage: state.signUp.errorMessage,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    signUp: (api, creds) => dispatch(signUpActions.signUpUser(api, creds)),
    signUpSocial: (api, socialType, data) =>
      dispatch(signInActions.signInSocial(api, socialType, data)),
    requestSignUpSocial: () => dispatch(socialAuthActions.requestSocialAuth()),
    failSignUpSocial: (message) =>
      dispatch(socialAuthActions.errorSocialAuth(message)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
