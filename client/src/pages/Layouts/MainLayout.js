import React from "react";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";
import { Grid, Container, Hidden } from "@material-ui/core";

import { BottomBar, Navbar } from "../../domain/Navbar";
import Sidebar from "../../components/Sidebar";
import ContainerLayout from "./ContainerLayout";

import { signOutUser } from "../../store/actions/signIn";
import * as Routes from "../../constants/routes";
import useNotification from "../../hooks/useNotificationHub";
import { usePostDialog, useStoryDialog, useMoodDialog } from "../../hooks/post";

import useStyles from "./styles";
import { useHistory } from "react-router";

export default function MainLayout({
  baseClassName,
  containerClassName,
  innerGridClassName,
  leftColProps = { md: 3, lg: 3 },
  rightColProps = { xs: 12, md: 9, lg: 9 },
  children
}) {
  const history = useHistory();
  const classes = useStyles();
  const notification = useNotification();

  const { userInfo, notificationData } = useSelector(state => ({
    userInfo: state.signIn.userInfo,
    notificationData: state.notification.data,
  }))
  const dispatch = useDispatch();

  const createPostDialog = usePostDialog();
  const createStoryDialog = useStoryDialog();
  const createMoodDialog = useMoodDialog();

  const handleCreateMeet = () => {
    history.push(Routes.MEET_ROUTE);
  };

  const handleSignOut = () => {
    dispatch(signOutUser());
  }

  return (
    <ContainerLayout 
      isFullScreenHeight
      baseClassName={clsx(classes.mainBase, baseClassName)}
      className={clsx(classes.mainContainer, containerClassName)}
      beforeChildren={(
        <Hidden mdUp>
          <Container>
            <Navbar
              userName={userInfo.userName}
              ranking={userInfo.ranking}
              avatarUrl={userInfo.avatarUrl}
              newMessage={notificationData?.newMessage}
              newNotification={notificationData?.newNotification}
              open
              onChange={notification.toggle}
              onSignOut={handleSignOut} />
          </Container>
        </Hidden>
      )}
      afterChildren={(
        <Hidden mdUp>
          <BottomBar
            user={userInfo}
            onCreatePost={createPostDialog.toggle}
            onCreateStory={createStoryDialog.toggle}
            onCreateMood={createMoodDialog.toggle} />
        </Hidden>
      )}>
      <Grid container spacing={(0, 3)} className={clsx(classes.mainInnerGrid, innerGridClassName)}>
        <Hidden smDown>
          <Grid item {...leftColProps}>
            <Sidebar
              open
              user={userInfo}
              onSignOut={handleSignOut}
              onCreateMeet={handleCreateMeet}
              onCreatePost={createPostDialog.toggle}
              onCreateStory={createStoryDialog.toggle} />
          </Grid>
        </Hidden>
        <Grid item {...rightColProps}>
          {children}
        </Grid>
      </Grid>
    </ContainerLayout>
  )
}
