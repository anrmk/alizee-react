import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createBrowserHistory as history } from "history";
import { connect } from "react-redux";

import Header from "./components/Header";
import Footer from "./components/Footer";

import HubComponent from "./domain/Hub/NotificationHub";

import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import EmailConfirmation from "./pages/EmailConfirmation";
import EmailVerify from "./pages/EmailVerify";
import PrivateRoute from "./pages/PrivateRoute";
import Chat from "./pages/Chat";

import Post from "./pages/Post";
import Feed from "./pages/Feed";

import PeopleSuggested from "./pages/PeopleSuggested";

import CreateRoom from "./pages/CreateRoom";
import Meeting from "./pages/Meeting";
import Room from "./pages/Room";
import Profile from "./pages/Profile";
import Followers from "./pages/Followers";
import Followings from "./pages/Followings";

import { signOutUser } from './store/actions/signIn';
import * as Routes from './constants/routes';

function App({ username, isAuthenticated, avatarUrl, signOut }) {
  return (
  <HubComponent>
    <Router history={history}>
        {isAuthenticated && <Header username={username} avatarUrl={avatarUrl} onSignOut={signOut} />}
          <Switch>
            <Route path={Routes.SIGN_UP_ROUTE} component={SignUp} />
            <Route path={Routes.SIGN_IN_ROUTE} component={SignIn} />
            <Route path={Routes.EMAIL_CONFIRMATION} component={EmailConfirmation} />
            <Route path={Routes.EMAIL_VERIFY} component={EmailVerify} />
            <PrivateRoute exact path={Routes.DEFAULT_ROUTE} />
            <PrivateRoute path={Routes.HOME_ROUTE} component={Feed} />
            <PrivateRoute path={Routes.POST_ID_ROUTE} component={Post} />
            <PrivateRoute path={Routes.MEET_ROUTE} component={Meeting} />
            <PrivateRoute path={Routes.CHAT_ROUTE} component={Chat} />
            <PrivateRoute path={Routes.ROOM_ROUTE} component={CreateRoom} />
            <PrivateRoute path={Routes.ROOM_ID_ROUTE} component={Room} />
            <PrivateRoute path={Routes.SUGESTED_PEOPLE} component={PeopleSuggested} />
            <PrivateRoute exact path={Routes.PROFILE_USERNAME_ROUTE} component={Profile} />
            <PrivateRoute exact path={Routes.PROFILE_FOLLOWERS_ROUTE} component={Followers} />
            <PrivateRoute exact path={Routes.PROFILE_FOLLOWINGS_ROUTE} component={Followings} />
          </Switch>

        {isAuthenticated && <Footer />}
      </Router>
    </HubComponent>
  );
}

function mapStateToProps(state) {
  return {
    username: state.signIn?.userInfo?.userName,
    isAuthenticated: state.signIn.isAuthenticated,
    avatarUrl: state.signIn.userInfo?.avatarUrl,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    signOut: (api) => dispatch(signOutUser(api)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
