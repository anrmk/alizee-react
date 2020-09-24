import React, { Component } from "react";
import PropTypes from "prop-types";

export class Login extends Component {
  state = {
    userName: "",
    userPwd: "",
    errors: {}
  };
  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  onSubmit = (e) => {
    e.preventDefault();
    this.props.onLoginSubmit(e.target, this.state.userName, this.state.userPwd, this.props.history);
    this.setState({ userName: "", userPwd: "" });
    console.log(this.props);
  };

  render() {
    return (
      <form onSubmit={this.onSubmit} className="container">
        <div className="form-group">
          <input
            type="text"
            name="userName"
            value={this.state.userName}
            onChange={this.onChange}
          />
          <input
            type="password"
            name="userPwd"
            value={this.state.userPwd}
            onChange={this.onChange}
          />
        </div>
        <input type="submit" className="btn" value="Submit" />
      </form>
    );
  }
}

Login.protoTypes = {
  onLoginSubmit: PropTypes.func.isRequired,
};

export default Login;
