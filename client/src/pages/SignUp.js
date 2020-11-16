import React, { useState, useContext } from "react";
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import Box from "@material-ui/core/Box";

import * as signUpActions from "../store/actions/signUp";
import * as signInActions from "../store/actions/signIn";
import * as socialAuthActions from "../store/actions/socialAuth";
import ApiContext from "../context/ApiContext";
import { GOOGLE_CLIENT_ID } from "../constants/social_client_ids";
import SocialButtons from "../components/SocialButtons";
import { HOME_ROUTE, EMAIL_CONFIRMATION } from "../constants/routes";

function SignUp(props) {
  const apiClient = useContext(ApiContext);

  const { isSignUp, isSocial, errorMessage } = props;
  const {
    signUp,
    signUpSocial,
    requestSignUpSocial,
    failSignUpSocial
  } = props;

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    username: "",
    email: ""
  });

  if (isSocial) {
    return <Redirect to={HOME_ROUTE} />
  }

  if (isSignUp) {
    return <Redirect to={EMAIL_CONFIRMATION} />
  }

  const handleFormChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.name || !formData.surname) return;

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
    <div className="container">
      <h1>Sign Up</h1>
      <Link to="signIn">
        <button type="button" className="btn btn-link">SignIn</button>
      </Link>
      <form onSubmit={handleFormSubmit} onChange={handleFormChange}>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="name">First name</label>
            <input
              className="form-control"
              type="text"
              name="name"
              placeholder="Name"
              onChange={() => { }}
              value={formData.name}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="surname">Last name</label>
            <input
              className="form-control"
              type="text"
              name="surname"
              placeholder="Surname"
              onChange={() => { }}
              value={formData.surname}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="birthday">Birth day</label>
            <input
              className="form-control"
              type="date"
              name="birthday"
              onChange={() => { }}
              value={formData.birthday}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="username">Username</label>
            <input
              className="form-control"
              type="text"
              name="username"
              placeholder="Nickname"
              onChange={() => { }}
              value={formData.username}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="email">Email address</label>
            <input
              className="form-control"
              type="email"
              name="email"
              placeholder="Email"
              onChange={() => { }}
              value={formData.email}
            />
          </div>
        </div>
        <br />
        <Box>
          <button type="submit" className="btn btn-primary form-group col-md-3">SignUp</button>
          <SocialButtons
            googleClientId={GOOGLE_CLIENT_ID}
            onRequest={handleSocialRequest}
            onSuccess={handleSocialSuccess}
            onFailure={handleSocialFailure} />
        </Box>
        <p>{errorMessage}</p>
      </form>
    </div>
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
