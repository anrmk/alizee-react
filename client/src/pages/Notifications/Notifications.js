import React, { useState } from "react";

import { useSelector } from "react-redux";

import { Route, Switch, Redirect } from "react-router-dom";

import { NOTIFICATION_ROUTE_CONTENT, NOTIFICATION_ROUTE_ALL } from "../../constants/routes";

import { Navbar, Content, SortContent } from "../../domain/Notification";

import { Typography, Divider, Box, Link } from "@material-ui/core";

function Notifications() {
  const [type, setType] = useState("");
  const [filter, setFilter] = useState("all");

  const list = useSelector((state) => state.notification.list);

  const filterList = () => {
    switch (filter) {
      case "all":
        return list;
      case "users":
        return list.slice(0, list.length / 10);
      case "posts":
        return list;
      case "unread":
        return list;

      default:
        return list;
    }
  };

  const changeType = (type) => {
    setType(type);
  };

  const handleChangeFilter = (e) => {
    setFilter(e.target.value);
  };

  return (
    <>
      <Navbar type={type} />
      <Divider />
      <Box padding={2}>
        <Typography variant="h5" color="textPrimary" gutterBottom={true}>
          Notifications
        </Typography>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="body1" color="textSecondary" variantMapping={{ h6: "h6" }}>
            {type.toUpperCase()}
          </Typography>
          <Box display="flex" justifyContent="space-between" alignItems="center" width="180px">
            <Link href="#">Mark All as Read</Link>
            <SortContent onChangeFilter={handleChangeFilter} filter={filter} />
          </Box>
        </Box>
      </Box>
      <Divider />
      <Switch>
        <Route path={NOTIFICATION_ROUTE_CONTENT}>
          <Content data={filterList()} onChangeType={changeType} />
        </Route>
        <Redirect to={NOTIFICATION_ROUTE_ALL} />
      </Switch>
    </>
  );
}

export default Notifications;
