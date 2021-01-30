import React, { useContext, useEffect, useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Box, Hidden } from "@material-ui/core";

import ApiContext from "../../context/ApiContext";
import { Navbar, BottomBar } from "../../domain/Navbar";
import Sidebar from "../../components/Sidebar";

import { SignIn, SignUp } from "../Auth";
import EmailConfirmation from "../EmailConfirmation";
import EmailVerify from "../EmailVerify";
import PrivateRoute from "../PrivateRoute";
import Chat from "../Chat";
import Post from "../Post";
import Feed from "../Feed";
import Activity from "../Activity";
import Explore from "../Explore";
import PeopleSuggested from "../PeopleSuggested";
import CreateRoom from "../Meet/CreateRoom";
import Meeting from "../Meet/Meeting";
import Room from "../Meet/Room";
import Profile from "../Profile";
import PrivacyPolicy from "../PrivacyPolicy";
import Followers from "../Followers";
import Followings from "../Followings";
import Favorites from "../Favorites";
import { Settings } from "../Settings";
import { ResetPassword, ChangePassword } from "../Password";
import Story from "../Story";

import * as userActions from "../../store/actions/user";
import { signOutUser } from "../../store/actions/signIn";
import * as Routes from "../../constants/routes";
import useHideNavigation from "../../hooks/useHideNavigation";
import usePostSproutDialog from "../../hooks/usePostSproutDialog";

import * as postActions from "../../store/actions/post";
import * as storyActions from "../../store/actions/story";
import * as moodAction from "../../store/actions/mood";

import useStyles from "./styles";

function Main(props) {
  const { userInfo, isAuthenticated, userStatistics } = props;
  const { signOut, createPost, createStory, createMood } = props;

  const apiClient = useContext(ApiContext);
  const [open, setOpen] = useState(true);
  const isNavigationHide = useHideNavigation(Routes.STORIES_DEFAULT_ROUTE);
  const classes = useStyles({ isAuthenticated, isNavigationHide });
  const { dialogToggleSprout } = usePostSproutDialog({ 
    onCreatePost: createPost,
    onCreateStory: createStory,
    onCreateMood: createMood
  });

  const handleDrawerToggle = () => {
    setOpen(!open);
  };


  return (
    <Box className={classes.mainContainer}>
      {isAuthenticated && !isNavigationHide && (
        <>
          <Navbar username={userInfo.userName} avatarUrl={userInfo.avatarUrl} open={open} onSignOut={signOut} />
          <Hidden smDown>
            <Sidebar
              user={userInfo}
              open={open}
              userStatistics={userStatistics}
              onDrawerToggle={handleDrawerToggle}
            />
          </Hidden>
        </>
      )}
      <Box className={classes.routesContainer}>
        <Switch>
          <Route exact path={Routes.DEFAULT_ROUTE} render={() => <Redirect to={Routes.HOME_ROUTE} />} />
          <Route path={Routes.SIGN_UP_ROUTE} component={SignUp} />
          <Route path={Routes.SIGN_IN_ROUTE} component={SignIn} />
          <Route path={Routes.PRIVACY_POLICY_ROUTE} component={PrivacyPolicy} />
          <Route path={Routes.EMAIL_CONFIRMATION} component={EmailConfirmation} />
          <Route path={Routes.EMAIL_VERIFY} component={EmailVerify} />
          <Route exact path={Routes.RESET_PASSWORD_ROUTE} component={ResetPassword} />
          <Route exact path={Routes.PASSWORD_CHANGE_ROUTE} component={ChangePassword} />
          <PrivateRoute path={Routes.HOME_ROUTE} component={Feed} />
          <PrivateRoute path={Routes.EXPLORE_ROUTE} component={Explore} />
          <PrivateRoute path={Routes.POST_ROUTE} component={Post} />
          <PrivateRoute path={Routes.ACTIVITY_ROUTE} component={Activity} />
          <PrivateRoute path={Routes.MEET_ROUTE} component={Meeting} />
          <PrivateRoute path={Routes.CHAT_USERNAME_ROUTE} component={Chat} />
          <PrivateRoute exact path={Routes.ROOM_ROUTE} component={CreateRoom} />
          <PrivateRoute path={Routes.ROOM_ID_DEFAULT_ROUTE} component={Room} />
          <PrivateRoute path={Routes.SUGESTED_PEOPLE} component={PeopleSuggested} />
          <PrivateRoute path={Routes.SETTINGS_TYPE_ROUTE} component={Settings} />
          <PrivateRoute exact path={Routes.PROFILE_ROUTE} component={Profile} />
          <PrivateRoute exact path={Routes.PROFILE_FOLLOWERS_ROUTE} component={Followers} />
          <PrivateRoute exact path={Routes.PROFILE_FOLLOWINGS_ROUTE} component={Followings} />
          <PrivateRoute exact path={Routes.FAVORITES_ROUTE} component={Favorites} />
          <PrivateRoute exact path={Routes.STORIES_ID_ROUTE} component={Story} />
        </Switch>
      </Box>
      {isAuthenticated && !isNavigationHide && (
        <Hidden mdUp>
          <BottomBar user={userInfo} onDialogToggle={dialogToggleSprout} />
        </Hidden>
      )}
    </Box>
  );
}

function mapStateToProps(state) {
  return {
    userInfo: state.signIn.userInfo,
    isAuthenticated: state.signIn.isAuthenticated,

    isFetchingPost: state.posts.isFetching,
    isFetchingStory: state.story.isFetching,

    userStatistics:  state.user.statistics,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    signOut: (api) => dispatch(signOutUser(api)),
    getUserStatistics: (api, userId) => dispatch(userActions.getUserStatistics(api, userId)),

    createPost: (api, data, media) => dispatch(postActions.createPost(api, data, media)),
    createStory: (api, data, media) => dispatch(storyActions.createStorySlide(api, data, media)),
    createMood: (api, data) => dispatch(moodAction.createMood(api, data))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
