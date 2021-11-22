import React, { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";

import { Divider, Grid } from "@material-ui/core";
import { Navbar, Content } from "../../domain/Notification";

import ApiContext from "../../context/ApiContext";
import * as notificationActions from "../../store/actions/notification";

import useStyles from "./styles";

function Notifications({
  notification,
  getNotifications,
  resetNotifications,
  setNotification,
}) {
  const apiClient = useContext(ApiContext);
  const classes = useStyles();
  const { type } = useParams();

  // const [filter, setFilter] = useState("all");
  useEffect(() => {
    getNotifications(apiClient, { type });
    return () => {
      resetNotifications();
    };
  }, [type]);

  useEffect(() => {
    if (notification.data.newNotification) {
      setNotification(apiClient);
    }
  }, [notification]);

  return (
    <Grid container direction="column">
      <Grid item className={classes.tabsContainer}>
        <Navbar type={type} />
      </Grid>
      <Divider component="div" />

      {/* <Grid item>
        <Box display="flex" justifyContent="flex-end" alignItems="center">
          <SortContent onChangeFilter={handleChangeFilter} filter={filter} />
        </Box>
      </Grid> */}
      <Grid item>
        <Content data={notification.list} />
      </Grid>
    </Grid>
  );
}

function mapStateToProps(state) {
  return {
    notification: state.notification,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getNotifications: (api, opts) =>
      dispatch(notificationActions.getNotificationsList(api, opts)),
    resetNotifications: (api) =>
      dispatch(notificationActions.resetCurrentNotificationList(api)),
    setNotification: (api) =>
      dispatch(
        notificationActions.setNotification(api, {
          newNotification: false,
        })
      ),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
