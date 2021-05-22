import React, { useContext, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { Container, Grid, Box, Hidden } from "@material-ui/core";
import { SignInForm, Slider } from "../../domain/AuthForms";
import Footer from "../../components/Footer";

import * as signInActions from "../../store/actions/signIn";
import * as socialAuthActions from "../../store/actions/socialAuth";
import { SOCIAL_TWITTER } from "../../constants/social_types";
import { getUrlParams } from "../../helpers/functions";

import ApiContext from "../../context/ApiContext";

import useStyles from "./styles";

function SignIn(props) {
  const apiClient = useContext(ApiContext);
  const classes = useStyles();

  const { isAuthenticated, errorMessage } = props;
  const { authSocial, signIn, signInSocial, requestSignInSocial, failSignInSocial, resetSignIn } = props;
  const { from } = props.location.state || { from: { pathname: "/" } };

  useEffect(() => {
    resetSignIn();
    const params = getUrlParams();
    if (params?.token && params?.email) {
      (async () => {
        await signInSocial(apiClient, SOCIAL_TWITTER, params);
      })();
    }
  }, []);

  if (isAuthenticated) {
    return <Redirect to={from} />;
  }

  const handleSocialRequest = () => {
    requestSignInSocial();
  };

  const handleSocialSuccess = (response, socialType) => {
    (async () => {
      if (socialType === SOCIAL_TWITTER) {
        authSocial(apiClient, socialType, response);
      } else {
        await signInSocial(apiClient, socialType, response);
      }
    })();
  };

  const handleSocialFailure = (response) => {
    failSignInSocial(response.error);
  };

  const handleFormSubmit = (formData) => {
    signIn(
      {
        email: formData.email,
        password: formData.password,
        rememberMe: formData.rememberMe,
      },
      apiClient
    );
  };

  return (
    <Container className={classes.container}>
      <Grid container className={classes.grid}>
        <Hidden smDown>
          <Grid item sm={6}>
            <Slider />
          </Grid>
        </Hidden>

        <Grid item md={4} sm={6} xs={12}>
          <SignInForm
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
    </Container>
  );
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.signIn.isAuthenticated,
    errorMessage: state.signIn.errorMessage || state.socialAuth.errorMessage,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    signIn: (creds, api) => dispatch(signInActions.signInUser(creds, api)),
    signInSocial: (api, socialType, data) => dispatch(signInActions.signInSocial(api, socialType, data)),
    authSocial: (api, socialType, data) => dispatch(socialAuthActions.socialAuth(api, socialType, data)),
    requestSignInSocial: () => dispatch(socialAuthActions.requestSocialAuth()),
    failSignInSocial: (message) => dispatch(socialAuthActions.errorSocialAuth(message)),
    resetSignIn: () => dispatch(signInActions.resetSignIn()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
