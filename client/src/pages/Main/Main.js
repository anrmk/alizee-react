import React, { useContext, useEffect, useState } from "react";
import { Switch, Route, Redirect, useHistory, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { Container, Grid, Hidden } from "@material-ui/core";

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
import PearToPear from "../Meet/PeerToPeer";
import Profile from "../Profile";
import PrivacyPolicy from "../PrivacyPolicy";
import Followers from "../Followers";
import Followings from "../Followings";
import Favorites from "../Favorites";
import { Settings } from "../Settings";
import { ResetPassword, ChangePassword } from "../Password";
import Search from "../Search";
import Story from "../Story";
import Statistics from "../Statistics";
import Help from "../Help";
import ChangeLog from "../ChangeLog";
import NotFound from "../NotFound";
import Notifications from "../Notifications";

import { signOutUser } from "../../store/actions/signIn";
import { getMe } from "../../store/actions/user";
import * as Routes from "../../constants/routes";

import useNotification from "../../hooks/useNotificationHub";
import { usePostDialog, useStoryDialog, useMoodDialog } from "../../hooks/post";
import useChangeTheme from "../../hooks/useChangeTheme";
import { isPublicRoute } from "../../helpers/functions";
import ApiContext from "../../context/ApiContext";

import useStyles from "./styles";

function Main(props) {
  const apiClient = useContext(ApiContext);
  const classes = useStyles();

  const { user, notifyData, isAuthenticated } = props;
  const { signOut, getMe } = props;

  const [open, setOpen] = useState(true);
  const history = useHistory();
  const { pathname } = useLocation();
  const theme = useChangeTheme(true);
  const notification = useNotification();

  const createPostDialog = usePostDialog();
  const createStoryDialog = useStoryDialog();
  const createMoodDialog = useMoodDialog();

  useEffect(() => {
    if (!isPublicRoute(pathname)) {
      theme.setupTheme();
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      (async () => {
        await getMe(apiClient);
      })();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (isPublicRoute(pathname)) {
      theme.toggle("light");
    } else {
      theme.setupTheme();
    }
  }, [pathname]);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleCreateMeet = () => {
    history.push(Routes.MEET_ROUTE);
  };

  return (
    <Container maxWidth="xl" className={classes.root}>
      <Switch>
        <Route exact path={Routes.NOT_FOUND_ROUTE} component={NotFound} />
        <Route path={Routes.SIGN_UP_ROUTE} component={SignUp} />
        <Route path={Routes.SIGN_IN_ROUTE} component={SignIn} />
        <Route path={Routes.PRIVACY_POLICY_ROUTE} component={PrivacyPolicy} />
        <Route path={Routes.EMAIL_CONFIRMATION_ROUTE} component={EmailConfirmation} />
        <Route path={Routes.EMAIL_VERIFY_ROUTE} component={EmailVerify} />
        <Route exact path={Routes.RESET_PASSWORD_ROUTE} component={ResetPassword} />
        <Route exact path={Routes.PASSWORD_CHANGE_ROUTE} component={ChangePassword} />
        <Route exact path={Routes.HELP_ROUTE} component={Help} />
        <Route exact path={Routes.CHANGE_LOG_ROUTE} component={ChangeLog} />
        <PrivateRoute exact path={Routes.STORIES_ID_ROUTE} component={Story} />
        <PrivateRoute path={Routes.PEAR_TO_PEAR_DEFAULT_ROUTE} component={PearToPear} />
        <Route>
          <Hidden mdUp>
            <Navbar
              userName={user.userName}
              ranking={user.ranking}
              avatarUrl={user.avatarUrl}
              newMessage={notifyData?.newMessage}
              newNotification={notifyData?.newNotification}
              open={open}
              onChange={notification.toggle}
              onSignOut={signOut}
              isAuthenticated={isAuthenticated}
            />
          </Hidden>

          <Grid container spacing={3}>
            <Hidden smDown>
              <Grid item md={3} lg={2}>
                <Sidebar
                  user={user}
                  open={open}
                  onSignOut={signOut}
                  onCreateMeet={handleCreateMeet}
                  onCreatePost={createPostDialog.toggle}
                  onCreateStory={createStoryDialog.toggle}
                  onDrawerToggle={handleDrawerToggle}
                />
              </Grid>
            </Hidden>
            <Grid item xs={12} md={9} lg={10}>
              <Switch>
                <PrivateRoute path={Routes.EXPLORE_ROUTE} component={Explore} />
                <PrivateRoute path={Routes.NOTIFICATION_ROUTE} component={Notifications} />
                <PrivateRoute path={Routes.POST_ROUTE} component={Post} />
                <PrivateRoute path={Routes.ACTIVITY_ROUTE} component={Activity} />
                <PrivateRoute path={Routes.MEET_ROUTE} component={Meeting} />
                <PrivateRoute path={Routes.CHAT_USERNAME_ROUTE} component={Chat} />
                <PrivateRoute path={Routes.ROOM_ID_DEFAULT_ROUTE} component={Room} />
                <PrivateRoute path={Routes.SEARCH_ROUTE} component={Search} />
                <PrivateRoute exact path={Routes.ROOM_ROUTE} component={CreateRoom} />
                <PrivateRoute exact path={Routes.FAVORITES_ROUTE} component={Favorites} />
                <PrivateRoute path={Routes.SETTINGS_TYPE_ROUTE} component={Settings} />
                <PrivateRoute path={Routes.SUGESTED_PEOPLE} component={PeopleSuggested} />
                <PrivateRoute path={Routes.STATISTICS_ROUTE} component={Statistics} />
                <PrivateRoute exact path={Routes.PROFILE_FOLLOWERS_ROUTE} component={Followers} />
                <PrivateRoute exact path={Routes.PROFILE_FOLLOWINGS_ROUTE} component={Followings} />
                <PrivateRoute exact path={Routes.PROFILE_ROUTE} component={Profile} />
                <PrivateRoute path={Routes.HOME_ROUTE} component={Feed} />
              </Switch>
            </Grid>
          </Grid>

          <Hidden mdUp>
            <BottomBar
              user={user}
              onCreatePost={createPostDialog.toggle}
              onCreateStory={createStoryDialog.toggle}
              onCreateMood={createMoodDialog.toggle}
            />
          </Hidden>
        </Route>
        <Redirect to={Routes.NOT_FOUND_ROUTE} />
      </Switch>
    </Container>
  );
}

function mapStateToProps(state) {
  return {
    user: state.signIn.userInfo,
    isAuthenticated: state.signIn.isAuthenticated,
    notifyData: state.notification.data,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getMe: (api) => dispatch(getMe(api)),
    signOut: (api) => dispatch(signOutUser(api)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
