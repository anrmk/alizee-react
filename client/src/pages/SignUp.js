import React, { useState, useContext } from "react";
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";

import { GoogleLogin } from 'react-google-login';
import { SOCIAL_GOOGLE } from '../constants/social_types';
import { MOCK_SIGNUP_INFO } from '../mock/user';

import {
  signUpUser,
  signUpSocial,
  requestSignUpSocial,
  errorSignUpSocial
} from '../store/actions/signUp';
import ApiContext from '../context/ApiContext';
import { GOOGLE_CLIENT_ID } from '../constants/social_client_ids';

function SignUp(props) {
  const apiClient = useContext(ApiContext);

  const { isSignUp, errorMessage } = props;
  const {
    signUp,
    signUpSocial,
    reqSignUpSocial,
    failSignUpSocial
  } = props;

  const [formData, setFormData] = useState({
    username: '',
    email: ''
  });

  if (isSignUp) {
    return <Redirect to="signIn" />
  }

  const handleFormChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email) return;

    // TODO: replace mock data
    signUp({
        name: MOCK_SIGNUP_INFO.name,
        surname: MOCK_SIGNUP_INFO.surname,
        username: formData.username,
        email: formData.email,
        phoneNumber: MOCK_SIGNUP_INFO.phoneNumber,
        avatar: MOCK_SIGNUP_INFO.avatar,
        tokenId: MOCK_SIGNUP_INFO.token
      },
      apiClient);
  };

  const handleGoogleRequest = () => {
    reqSignUpSocial()
  }

  const handleGoogleSuccess = (response) => {
    signUpSocial(SOCIAL_GOOGLE, response, apiClient);
  }

  const handleGoogleFailure = (response) => {
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
            <label htmlFor="username">Username</label>
            <input
              className="form-control"
              type="text"
              name="username"
              placeholder="Username"
              onChange={() => { }}
              value={formData.username}
            />
          </div>
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
        <div className="form-row">
          <button type="submit" className="btn btn-primary form-group col-md-3">SignUp</button>
        </div>
        <div className="form-row">
          <GoogleLogin
            className="form-group col-md-3"
            type="button"
            clientId={GOOGLE_CLIENT_ID}
            onRequest={handleGoogleRequest}
            onSuccess={handleGoogleSuccess}
            onFailure={handleGoogleFailure}
          />
        </div>
        <p>{errorMessage}</p>
      </form>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    isSignUp: state.signUp.isSignUp,
    errorMessage: state.signUp.errorMessage
  }
}

function mapDispatchToProps(dispatch) {
  return {
    signUp: (creds, api) => dispatch(signUpUser(creds, api)),
    signUpSocial: (socialType, socialData, api) => dispatch(signUpSocial(socialType, socialData, api)),
    reqSignUpSocial: () => dispatch(requestSignUpSocial()),
    failSignUpSocial: (message) => dispatch(errorSignUpSocial(message))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
