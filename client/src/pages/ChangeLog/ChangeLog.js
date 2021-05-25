import React, { useContext, useEffect } from "react";
import { connect } from "react-redux";
import * as changeLogActions from "../../store/actions/changeLog";
import ApiContext from "../../context/ApiContext";
import { formatDate } from "../../helpers/functions";

import { Container, List, ListItem, ListItemText, Divider, Card, CardContent, CardHeader, Typography, ListItemIcon } from "@material-ui/core/";
import AnnouncementIcon from "@material-ui/icons/AnnouncementOutlined";

function ChangeLog({ data, isFetching, getLogs, resetLogs }) {
  const apiClient = useContext(ApiContext);

  useEffect(() => {
    getLogs(apiClient, { length: 10 });
    return () => {
      resetLogs();
    };
  }, []);

  return (
    <Container>
      <Card>
        <CardHeader title="What's News" />
        <CardContent>
          <List>
            {data.map((log, index) => (
              <ListItem key={index}>
                <ListItemIcon><AnnouncementIcon /></ListItemIcon>
                <ListItemText primary={formatDate(log.createdDate)} secondary={log.content} />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    </Container>
  );
}

function mapStateToProps(state) {
  return {
    data: state.changeLog.data,
    isFetching: state.changeLog.isFetching,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getLogs: (api, opts) => dispatch(changeLogActions.getChangeLog(api, opts)),
    resetLogs: () => dispatch(changeLogActions.resetLogs()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangeLog);
