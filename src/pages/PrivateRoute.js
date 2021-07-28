import React from "react";
import { Route, Redirect, useParams, useLocation } from "react-router-dom";
import { connect } from "react-redux";

import { DEFAULT_ROUTE, SIGN_IN_ROUTE } from "../constants/routes";

const PrivateRoute = ({ component: Component, componentProps, ...rest }) => {
  const { pathname } = useLocation();
  const { username } = useParams();

  const { isAuthenticated } = rest;

  if (!isAuthenticated && pathname === DEFAULT_ROUTE && !username) {
    return (
      <Redirect
        to={{ pathname: SIGN_IN_ROUTE, state: { from: DEFAULT_ROUTE } }}
      />
    );
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} {...componentProps} />
        ) : (
          <Redirect
            to={{ pathname: SIGN_IN_ROUTE, state: { from: props.location } }}
          />
        )
      }
    />
  );
};

function mapStateToProps(state) {
  return {
    isAuthenticated: state.signIn.isAuthenticated,
  };
}

export default connect(mapStateToProps)(PrivateRoute);
