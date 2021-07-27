import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import ApiContext from "../context/ApiContext";
import * as relationshipActions from "../store/actions/relationship";

import {
  Button,
  Container,
  Card,
  CardHeader,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
} from "@material-ui/core";
import { PROFILE_USERNAME_ROUTE } from "../constants/routes";
import { formatDate } from "../helpers/functions";
import useBlockDialog from "../hooks/useBlockDialog";

function BlackList({ me, blocked, fetchBlocked, resetBlocked }) {
  const apiClient = useContext(ApiContext);
  const blockDialog = useBlockDialog();

  useEffect(() => {
    fetchBlocked(apiClient);
  }, []);

  useEffect(() => {
    return () => {
      resetBlocked();
    };
  }, []);

  return (
    <Container maxWidth="sm">
      <Card>
        <CardHeader
          avatar={
            <Link to={PROFILE_USERNAME_ROUTE(me.userName)}>
              <Avatar src={me.avatarUrl} />
            </Link>
          }
          title={me.name}
          subheader={`Blocked [${blocked.data?.length}]`}
        ></CardHeader>
      </Card>

      <List dense={true}>
        {blocked.data &&
          blocked.data.map((item) => (
            <ListItem alignItems="flex-start" key={`blf_${item.userName}`} to={PROFILE_USERNAME_ROUTE(item.userName)}>
              <ListItemAvatar>
                <Avatar src={item.avatarUrl} />
              </ListItemAvatar>
              <ListItemText primary={item.name} secondary={`${item.userName} - ${formatDate(item.createdDate)}`} />
              <ListItemSecondaryAction>
                <Button
                  size="small"
                  variant="contained"
                  color="primary"
                  onClick={() => blockDialog.toggle({ userName: item.userName, isBlocked: item.isBlocked })}
                >
                  {item.isBlocked ? "Unblock" : "Block"}
                </Button>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
      </List>
    </Container>
  );
}

function mapStateToProps(state) {
  return {
    me: {
      userName: state.signIn?.userInfo.userName,
      name: state.signIn?.userInfo.name,
      avatarUrl: state.signIn?.userInfo.avatarUrl,
    },
    blocked: {
      data: state.users.data,
      isFetching: state.users.isFetching,
    },
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchBlocked: (api) => dispatch(relationshipActions.getBlocked(api)),
    resetBlocked: () => dispatch(relationshipActions.resetRelationship()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BlackList);
