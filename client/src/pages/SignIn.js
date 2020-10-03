import React, { useState, useContext } from "react";
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";

import VideoBackground from "../components/VideoBackground";

import { signInUser } from "../store/actions/signIn";
import ApiContext from "../context/ApiContext";

import login_video from "../../src/assets/img/login_video.webm";

function SignIn(props) {
  const apiClient = useContext(ApiContext);

  const { isAuthenticated, errorMessage } = props;
  const { signIn } = props;
  const { from } = props.location.state || { from: { pathname: "/" } };

  const [formData, setFormData] = useState({
    userName: "",
    password: "",
    rememberMe: true,
  });

  if (isAuthenticated) {
    return <Redirect to={from} />;
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
    if (!formData.userName || !formData.password) return;

    signIn(
      {
        userName: formData.userName,
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
                  <div className="form-group">
                    <input
                      className="form-control"
                      type="text"
                      name="userName"
                      placeholder="Username"
                      onChange={() => {}}
                      value={formData.userName}
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
                        onChange={() => {}}
                        //checked={formData.rememberMe}
                      />
                      <label className="form-check-label" htmlFor="rememberMe">
                        Remember me
                      </label>
                    </div>
                  </div>
                  <div className="form-group">
                    <button
                      type="submit"
                      className="btn btn-primary btn-sm btn-block"
                    >
                      Sign In
                    </button>
                  </div>
                </form>
                <hr />
                <a className="btn btn-link btn-sm btn-block" href="#">
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="card o-8">
              <div className="card-body text-center">
                Don't have an account? &nbsp;
                <Link to="signUp">Sign Up</Link>
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
    signIn: (creds, api) => dispatch(signInUser(creds, api)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
