import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { history } from "./helpers";

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

import { signOutUser } from './store/actions/signIn';
import * as Routes from './constants/routes';

function App({ signOut, isAuthenticated, avatarUrl }) {

  return (
    <Router history>
      {isAuthenticated && <Header onSignOut={signOut} avatarUrl={avatarUrl} />}
        <Switch>
          <Route path={Routes.SIGN_UP_ROUTE} component={SignUp} />
          <Route path={Routes.SIGN_IN_ROUTE} component={SignIn} />
          <Route path={Routes.EMAIL_CONFIRMATION} component={EmailConfirmation} />
          <Route path={Routes.EMAIL_VERIFY} component={EmailVerify} />
          {/* 
            TODO: if routes are wrapped to some parent Element(not route). 
            All PrivateRoute execute render(in general redirect cause user isn't auth)
          */}
          <HubComponent>
            <PrivateRoute exact path={Routes.HOME_ROUTE} component={Feed} />
            <PrivateRoute path={Routes.POST_ID_ROUTE} component={Post} />
            <PrivateRoute path={Routes.MEET_ROUTE} component={Meeting} />
            <PrivateRoute path={Routes.CHAT_ROUTE} component={Chat} />
            <PrivateRoute path={Routes.ROOM_ROUTE} component={CreateRoom} />
            <PrivateRoute path={Routes.ROOM_ID_ROUTE} component={Room} />
            <PrivateRoute path={Routes.SUGESTED_PEOPLE} component={PeopleSuggested} />
          </HubComponent>
          
        </Switch>

      {isAuthenticated && <Footer />}
    </Router>
  );
}

function mapStateToProps(state) {
  return {
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
