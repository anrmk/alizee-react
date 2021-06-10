import React, { useContext, useEffect } from "react";
import { connect } from "react-redux";
import * as changeLogActions from "../../store/actions/changeLog";
import ApiContext from "../../context/ApiContext";
import { formatDate } from "../../helpers/functions";

import {
  List,
  ListItem,
  Card,
  CardContent,
  ListItemIcon,
  Box,
  Divider,
  CardHeader,
  ListItemText,
} from "@material-ui/core/";
import InfoIcon from "@material-ui/icons/Info";

import { PublicLayout } from "../Layouts";

import useStyles from "./styles";

function ChangeLog({ data, isFetching, getLogs, resetLogs }) {

  const apiClient = useContext(ApiContext);

  useEffect(() => {
    getLogs(apiClient, { length: 10 });
    return () => {
      resetLogs();
    };
  }, []);

  return (
    <PublicLayout>
      <Card elevation={0}>
        <CardHeader title="What's News" />

        <CardContent>
          <List>
            {data.map((log, index) => (
              <React.Fragment key={index}>
                <ListItem alignItems="flex-start">
                  <ListItemIcon>
                    <InfoIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary={formatDate(log.createdDate)} secondary={log.content}></ListItemText>
                </ListItem>
                <Divider variant="inset" component="li" />
              </React.Fragment>
            ))}
          </List>
        </CardContent>
      </Card>
    </PublicLayout>
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
