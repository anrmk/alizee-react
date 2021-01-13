import React, { useContext, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { Box, Container, Grid, Hidden } from "@material-ui/core";

import { SignInForm } from "../../domain/AuthForms";

import * as signInActions from "../../store/actions/signIn";
import * as socialAuthActions from "../../store/actions/socialAuth";
import ApiContext from "../../context/ApiContext";
import useStyles from "./styles";

function SignIn(props) {
  const apiClient = useContext(ApiContext);
  const classes = useStyles();

  const { isAuthenticated, errorMessage } = props;
  const { signIn, signInSocial, requestSignInSocial, failSignInSocial, resetSignIn } = props;
  const { from } = props.location.state || { from: { pathname: "/" } };

  useEffect(() => {
    resetSignIn();
  }, []);

  if (isAuthenticated) {
    return <Redirect to={from} />;
  }

  const handleSocialRequest = () => {
    requestSignInSocial();
  };

  const handleSocialSuccess = (response, socialType) => {
    (async () => {
      await signInSocial(apiClient, socialType, response);
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
    <Container>
      <Grid container justify="center" alignItems="center" direction="row" className={classes.container}>
        <Hidden smDown>
          <Grid item sm={6}>
            <Box className={classes.authImage} />
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
    </Container>
  );
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.signIn.isAuthenticated,
    errorMessage: state.signIn.errorMessage,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    signIn: (creds, api) => dispatch(signInActions.signInUser(creds, api)),
    signInSocial: (api, socialType, data) => dispatch(signInActions.signInSocial(api, socialType, data)),
    requestSignInSocial: () => dispatch(socialAuthActions.requestSocialAuth()),
    failSignInSocial: (message) => dispatch(socialAuthActions.errorSocialAuth(message)),
    resetSignIn: () => dispatch(signInActions.resetSignIn()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
