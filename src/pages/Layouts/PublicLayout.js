import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Hidden } from "@material-ui/core";
import ContainerLayout from "./ContainerLayout";
import { Navbar } from "../../domain/Navbar";
import Footer from "../../components/Footer";

import { signOutUser } from "../../store/actions/signIn";

import useStyles from "./styles";

function PublicLayout({ children }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { userInfo, notificationData, isAuthenticated } = useSelector(
    (state) => ({
      userInfo: state.signIn.userInfo,
      notificationData: state.notification.data,
      isAuthenticated: state.signIn.isAuthenticated,
    })
  );

  const handleSignOut = () => {
    dispatch(signOutUser());
  };

  return (
    <ContainerLayout
      isFullScreenHeight
      baseClassName={classes.publicBase}
      beforeChildren={
        <Hidden mdUp>
          <Navbar
            userName={userInfo.userName}
            avatarUrl={userInfo.avatarUrl}
            isAuthenticated={isAuthenticated}
            newMessage={notificationData?.newMessage}
            newNotification={notificationData?.newNotification}
            open
            onSignOut={handleSignOut}
          />
        </Hidden>
      }>
      {children}
      <Footer open />
    </ContainerLayout>
  );
}

export default PublicLayout;
