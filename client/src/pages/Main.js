import React, { useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import { SignIn, SignUp } from "./Auth";
import EmailConfirmation from "./EmailConfirmation";
import EmailVerify from "./EmailVerify";
import PrivateRoute from "./PrivateRoute";
import Chat from "./Chat";
import Post from "./Post";
import Feed from "./Feed";
import Explore from "./Explore";
import PeopleSuggested from "./PeopleSuggested";
import CreateRoom from "./Meet/CreateRoom";
import Meeting from "./Meet/Meeting";
import Room from "./Meet/Room";
import Profile from "./Profile";
import Followers from "./Followers";
import Followings from "./Followings";
import { Settings } from "./Settings";
import { ResetPassword, ChangePassword } from "./Password";
import Story from "./Story";

import { signOutUser } from "../store/actions/signIn";
import * as Routes from "../constants/routes";
import useHideNavigation from "../hooks/useHideNavigation";

function Main({ userInfo, isAuthenticated, signOut }) {
  const [open, setOpen] = useState(true);
  const isNavigationHide = useHideNavigation(Routes.STORIES_DEFAULT_ROUTE);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  return (
    <div style={!isNavigationHide ? ({ display: "flex" }) : null}>
      {isAuthenticated && !isNavigationHide && (
        <>
          <Navbar
            username={userInfo.userName}
            avatarUrl={userInfo.avatarUrl}
            onSignOut={signOut}
            open={open}
          />
          <Sidebar userInfo={userInfo} open={open} onDrawerToggle={handleDrawerToggle} />
        </>
      )}
      <div style={!isNavigationHide ? ({flexGrow: 1, paddingTop: 64}) : null}>
        <Switch>
          <Route exact path={Routes.DEFAULT_ROUTE} render={() => (<Redirect to={Routes.HOME_ROUTE} />)} />
          <Route path={Routes.SIGN_UP_ROUTE} component={SignUp} />
          <Route path={Routes.SIGN_IN_ROUTE} component={SignIn} />
          <Route path={Routes.EMAIL_CONFIRMATION} component={EmailConfirmation} />
          <Route path={Routes.EMAIL_VERIFY} component={EmailVerify} />
          <Route exact path={Routes.RESET_PASSWORD_ROUTE} component={ResetPassword} />
          <Route exact path={Routes.PASSWORD_CHANGE_ROUTE} component={ChangePassword} />
          <PrivateRoute exact path={Routes.DEFAULT_ROUTE} />
          <PrivateRoute path={Routes.HOME_ROUTE} component={Feed} />
          <PrivateRoute path={Routes.EXPLORE_ROUTE} component={Explore} />
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
          <PrivateRoute exact path={Routes.STORIES_ID_ROUTE} component={Story} />
        </Switch>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    userInfo: state.signIn?.userInfo,
    isAuthenticated: state.signIn.isAuthenticated,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    signOut: (api) => dispatch(signOutUser(api)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);

