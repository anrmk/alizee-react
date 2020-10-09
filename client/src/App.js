import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";

import Header from "./components/Header";
import Footer from "./components/Footer";

import HubComponent from "./domain/Hub/NotificationHub";

import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import EmailConfirmation from './pages/EmailConfirmation';
import EmailVerify from './pages/EmailVerify';
import PrivateRoute from "./pages/PrivateRoute";
import Chat from "./pages/Chat";

import Feed from "./pages/Feed";

import CreateRoom from "./pages/CreateRoom";
import Meeting from "./pages/Meeting";
import Room from "./pages/Room";
import { signOutUser } from "./store/actions/signIn";

function App({ signOut, isAuthenticated, avatarUrl }) {
  return (
    <Router>
      {isAuthenticated && <Header onSignOut={signOut} avatarUrl={avatarUrl} />}
        <Switch>
          {isAuthenticated && 
          <HubComponent>
            <PrivateRoute exact path="/" component={Feed} />
            <PrivateRoute path="/meet" component={Meeting} />
            <PrivateRoute path="/chat" component={Chat} />
            <PrivateRoute exact path="/room" component={CreateRoom} />
            <PrivateRoute path="/room/:roomID" component={Room} />
          </HubComponent> }
          <Route path="/signUp" component={SignUp} />
          <Route path="/signIn" component={SignIn} />
          <Route path="/email-confirmation" component={EmailConfirmation} />
          <Route path="/email-verify" component={EmailVerify} />
        </Switch>
      {isAuthenticated && <Footer />}
    </Router>
  );
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.signIn.isAuthenticated,
    avatarUrl: state.signIn.userInfo?.avatarUrl
  }
}

function mapDispatchToProps(dispatch) {
  return {
    signOut: (api) => dispatch(signOutUser(api)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
