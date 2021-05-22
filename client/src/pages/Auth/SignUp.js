import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

import { Container, Box, Grid, Hidden } from "@material-ui/core";
import { SignUpForm, Slider } from "../../domain/AuthForms";
import Footer from "../../components/Footer";

import * as signUpActions from "../../store/actions/signUp";
import * as signInActions from "../../store/actions/signIn";
import * as socialAuthActions from "../../store/actions/socialAuth";
import { HOME_ROUTE, EMAIL_CONFIRMATION_ROUTE } from "../../constants/routes";
import ApiContext from "../../context/ApiContext";

import useStyles from "./styles";

function SignUp(props) {
  const apiClient = useContext(ApiContext);
  const classes = useStyles();

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
    <Container className={classes.container}>
      <GoogleReCaptchaProvider
        useRecaptchaNet
        reCaptchaKey={process.env.REACT_APP_RECAPTCHA_KEY}
        scriptProps={{ async: true, defer: true, appendTo: "body" }}
      >
        <Grid container className={classes.grid}>
          <Hidden smDown>
            <Grid item sm={6}>
              <Slider />
            </Grid>
          </Hidden>

          <Grid item md={4} sm={6} xs={12}>
            <SignUpForm
              error={errorMessage}
              onSubmit={handleFormSubmit}
              onSocialRequest={handleSocialRequest}
              onSocialSuccess={handleSocialSuccess}
              onSocialFailure={handleSocialFailure}
            />
          </Grid>
        </Grid>

      <Box marginTop="auto">
        <Footer open={true} />
      </Box>
      </GoogleReCaptchaProvider>
    </Container>
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
    signUpSocial: (api, socialType, data) => dispatch(signInActions.signInSocial(api, socialType, data)),
    requestSignUpSocial: () => dispatch(socialAuthActions.requestSocialAuth()),
    failSignUpSocial: (message) => dispatch(socialAuthActions.errorSocialAuth(message)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
