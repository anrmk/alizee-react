import React, { Suspense, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createBrowserHistory as history } from "history";
import { connect } from "react-redux";
import { CssBaseline } from "@material-ui/core";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import LinearDeterminate from "./components/LinearDeterminate";

import HubComponent from "./domain/Hub/NotificationHub";
import ThemeProvider from "./domain/ThemeProvider";

import { SignIn, SignUp } from "./pages/Auth";
import EmailConfirmation from "./pages/EmailConfirmation";
import EmailVerify from "./pages/EmailVerify";
import PrivateRoute from "./pages/PrivateRoute";
import Chat from "./pages/Chat";
import Post from "./pages/Post";
import Feed from "./pages/Feed";
import PeopleSuggested from "./pages/PeopleSuggested";
import CreateRoom from "./pages/Meet/CreateRoom";
import Meeting from "./pages/Meet/Meeting";
import Room from "./pages/Meet/Room";
import Profile from "./pages/Profile";
import Followers from "./pages/Followers";
import Followings from "./pages/Followings";
import { Settings } from "./pages/Settings";
import { ResetPassword, ChangePassword } from "./pages/Password";

import { signOutUser } from "./store/actions/signIn";
import * as Routes from "./constants/routes";
import theme from "./constants/theme";

function App({ userInfo, username, isAuthenticated, avatarUrl, signOut }) {
  const [open, setOpen] = useState(true);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  return (
    <Suspense fallback={<LinearDeterminate />}>
      <HubComponent>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Router history={history}>
            <div style={{ display: "flex" }}>
              {isAuthenticated && (
                <>
                  <Navbar
                    username={userInfo.username}
                    avatarUrl={userInfo.avatarUrl}
                    onSignOut={signOut}
                    open={open}
                  />
                  <Sidebar userInfo={userInfo} open={open} onDrawerToggle={handleDrawerToggle} />
                </>
              )}
              <div style={{flexGrow: 1, paddingTop: 64}}>
                <Switch>
                  <Route path={Routes.SIGN_UP_ROUTE} component={SignUp} />
                  <Route path={Routes.SIGN_IN_ROUTE} component={SignIn} />
                  <Route path={Routes.EMAIL_CONFIRMATION} component={EmailConfirmation} />
                  <Route path={Routes.EMAIL_VERIFY} component={EmailVerify} />
                  <Route exact path={Routes.RESET_PASSWORD_ROUTE} component={ResetPassword} />
                  <Route exact path={Routes.PASSWORD_CHANGE_ROUTE} component={ChangePassword} />
                  <PrivateRoute exact path={Routes.DEFAULT_ROUTE} />
                  <PrivateRoute path={Routes.HOME_ROUTE} component={Feed} />
                  <PrivateRoute path={Routes.POST_ID_ROUTE} component={Post} />
                  <PrivateRoute path={Routes.MEET_ROUTE} component={Meeting} />
                  <PrivateRoute path={Routes.CHAT_ROUTE} component={Chat} />
                  <PrivateRoute path={Routes.ROOM_ROUTE} component={CreateRoom} />
                  <PrivateRoute path={Routes.ROOM_ID_DEFAULT_ROUTE} component={Room} />
                  <PrivateRoute path={Routes.SUGESTED_PEOPLE} component={PeopleSuggested} />
                  <PrivateRoute path={Routes.SETTINGS_TYPE_ROUTE} component={Settings} />
                  <PrivateRoute exact path={Routes.PROFILE_USERNAME_ROUTE} component={Profile} />
                  <PrivateRoute exact path={Routes.PROFILE_FOLLOWERS_ROUTE} component={Followers} />
                  <PrivateRoute exact path={Routes.PROFILE_FOLLOWINGS_ROUTE} component={Followings} />
                </Switch>
              </div>
            </div>
          </Router>
        </ThemeProvider>
      </HubComponent>
    </Suspense>
  );
}

function mapStateToProps(state) {
  return {
    userInfo: state.signIn?.userInfo,
    username: state.signIn?.userInfo?.userName,
    avatarUrl: state.signIn.userInfo?.avatarUrl,
    isAuthenticated: state.signIn.isAuthenticated,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    signOut: (api) => dispatch(signOutUser(api)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
