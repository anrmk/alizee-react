import React, { useState, useContext } from "react";
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import Box from "@material-ui/core/Box";

import VideoBackground from "../components/VideoBackground";
import SocialButtons from "../components/SocialButtons/SocialButtons";

import * as signInActions from '../store/actions/signIn';
import * as socialAuthActions from '../store/actions/socialAuth';
import { GOOGLE_CLIENT_ID } from '../constants/social_client_ids';
import ApiContext from "../context/ApiContext";
import login_video from "../../src/assets/img/login_video.webm";
import { RESET_PASSWORD_ROUTE } from "../constants/routes";

function SignIn(props) {
  const apiClient = useContext(ApiContext);

  const { isAuthenticated, errorMessage } = props;
  const {
    signIn,
    signInSocial,
    requestSignInSocial,
    failSignInSocial
  } = props;
  const { from } = props.location.state || { from: { pathname: "/" } };

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: true,
  });

  if (isAuthenticated) {
    return <Redirect to={from} />;
  }

  const handleSocialRequest = () => {
    requestSignInSocial()
  }

  const handleSocialSuccess = (response, socialType) => {
    (async () => {
      await signInSocial(apiClient, socialType, response);
    })();
  }

  const handleSocialFailure = (response) => {
    failSignInSocial(response.error);
  }

  const handleFormChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) return;

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
    <>
      <VideoBackground src={login_video} >
      <div className="container h-100 d-flex align-items-center justify-content-start">
        <div className="d-block">
            <div className="card o-8 mb-3">
              <div className="card-body">
                <h1 className="text-center font-weight-lighter">Alizee</h1>
                <form onSubmit={handleFormSubmit} onChange={handleFormChange}>
                  {errorMessage ?? ""}
                  <div className="form-group">
                    <input
                      className="form-control"
                      type="text"
                      name="email"
                      placeholder="Email"
                      onChange={() => {}}
                      value={formData.email}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      className="form-control"
                      type="password"
                      name="password"
                      placeholder="Password"
                      onChange={() => {}}
                      value={formData.password}
                    />
                  </div>
                  <div className="form-group" hidden>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="rememberMe"
                        placeholder="Remember me"
                        onChange={() => {}} />
                      <label className="form-check-label" htmlFor="rememberMe">
                        Remember me
                      </label>
                    </div>
                  </div>
                  <Box>
                    <button
                      type="submit"
                      className="btn btn-primary btn-sm btn-block"
                    >
                      Sign In
                    </button>
                  <SocialButtons
                    googleClientId={GOOGLE_CLIENT_ID}
                    onRequest={handleSocialRequest}
                    onSuccess={handleSocialSuccess}
                    onFailure={handleSocialFailure} />
                  </Box>
                </form>
                <hr />
                <Link to={RESET_PASSWORD_ROUTE} className="btn btn-link btn-sm btn-block">
                  Forgot password?
                </Link>
              </div>
            </div>
            <div className="card o-8">
              <div className="card-body text-center">
                Don't have an account? &nbsp;
                <Link to="signUp" className="btn btn-link">Sign Up</Link>
              </div>
            </div>
        </div>
      </div>
      </VideoBackground>
    </>
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
    failSignInSocial: (message) => dispatch(socialAuthActions.errorSocialAuth(message))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
