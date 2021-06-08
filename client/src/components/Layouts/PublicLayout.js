import React from "react";

import { useSelector, useDispatch } from "react-redux";

import Footer from "../Footer";

import { Navbar } from "../../domain/Navbar";

import { signOutUser } from "../../store/actions/signIn";

import useNotification from "../../hooks/useNotificationHub";

function Layout({ children }) {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.signIn.userInfo);
  const isAuthenticated = useSelector((state) => state.signIn.isAuthenticated);
  const notifyData = useSelector((state) => state.notification.data);

  const notification = useNotification();

  const signOut = () => {
    dispatch(signOutUser());
  };

  return (
    <>
      <Navbar
        userName={user.userName}
        ranking={user.ranking}
        avatarUrl={user.avatarUrl}
        newMessage={notifyData?.newMessage}
        newNotification={notifyData?.newNotification}
        onChange={notification.toggle}
        onSignOut={signOut}
        isAuthenticated={isAuthenticated}
        showNotification={false}
        showLogo={true}
      />

      {children}
      <Footer open />
    </>
  );
}

export default Layout;
