import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";

import Header from "./components/Header";
import Footer from "./components/Footer";

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import PrivateRoute from './pages/PrivateRoute';
import Chat from "./components/Chat";

import Feed from "./pages/Feed";

import CreateRoom from "./pages/CreateRoom";
import Meeting from "./pages/Meeting";
import Room from "./pages/Room";
import { signOutUser } from './store/actions/signIn';

function App({ signOut, isAuthenticated, avatarUrl }) {
  return (
    <Router>
      <Header
        onSignOut={signOut}
        isAuthenticated={isAuthenticated}
        avatarUrl={avatarUrl} />
      <div className="py-4">
        <Switch>
          <PrivateRoute exact path="/" component={Feed} />
          <PrivateRoute path="/meet" component={Meeting} />
          <PrivateRoute path="/chat" component={Chat} />
          <PrivateRoute exact path="/room" component={CreateRoom} />
          <PrivateRoute path="/room/:roomID" component={Room} />
          <Route path="/signUp" component={SignUp} />
          <Route path="/signIn" component={SignIn} />
        </Switch>
      </div>
      <Footer />
    </Router>
  );
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.signIn.isAuthenticated,
    avatarUrl: state.signUp?.userInfo?.avatar,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    signOut: api => dispatch(signOutUser(api))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
