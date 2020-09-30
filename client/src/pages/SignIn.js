import React, { useState, useContext } from "react";
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";

import { signInUser } from '../store/actions/signIn';
import ApiContext from '../context/ApiContext';

function SignIn(props) {
  const apiClient = useContext(ApiContext);

  const { isAuthenticated, errorMessage } = props;
  const { signIn } = props;
  const { from } = props.location.state || { from: { pathname: '/' } }

  const [formData, setFormData] = useState({
    userName: '',
    password: '',
    rememberMe: false
  });

  if (isAuthenticated) {
    return <Redirect to={from} />
  }

  const handleFormChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    setFormData({
      ...formData,
      [name]: value
    })
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.userName || !formData.password) return;

    signIn({
      userName: formData.userName,
      password: formData.password,
      rememberMe: formData.rememberMe
    },
      apiClient);
  };

  return (
    <div className="container">
      <h1>Sign In</h1>
      <Link to="signUp">
        <button type="button" className="btn btn-link">SignUp</button>
      </Link>
      <form onSubmit={handleFormSubmit} onChange={handleFormChange}>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="userName">Username</label>
            <input
              className="form-control"
              type="text"
              name="userName"
              placeholder="Username"
              onChange={() => { }}
              value={formData.userName}
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="password">Password</label>
            <input
              className="form-control"
              type="password"
              name="password"
              placeholder="Password"
              onChange={() => { }}
              value={formData.password}
            />
          </div>
        </div>
        <div className="form-group">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              name="rememberMe"
              placeholder="Remember me"
              onChange={() => { }}
              checked={formData.rememberMe}
            />
            <label className="form-check-label" htmlFor="rememberMe">
              Remember me
            </label>
          </div>
        </div>
        <div className="form-row">
          <button type="submit" className="btn btn-primary form-group col-md-3">SignIn</button>
        </div>
      </form>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.signIn.isAuthenticated,
    errorMessage: state.signIn.errorMessage
  }
}

function mapDispatchToProps(dispatch) {
  return {
    signIn: (creds, api) => dispatch(signInUser(creds, api))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
