import React, { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";

import { Divider, Grid } from "@material-ui/core";
import { Navbar, Content } from "../../domain/Notification";

import ApiContext from "../../context/ApiContext";
import * as notificationActions from "../../store/actions/notification";

function Notifications({ notification, getNotifications, resetNotifications }) {
  const apiClient = useContext(ApiContext);
  const { type } = useParams();

  // const [filter, setFilter] = useState("all");
  useEffect(() => {
    getNotifications(apiClient, { type });
    return () => {
      resetNotifications();
    };
  }, [type]);

  return (
    <Grid container direction="column">
      <Grid item>
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
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
