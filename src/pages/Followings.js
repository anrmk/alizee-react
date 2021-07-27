import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";

import ApiContext from "../context/ApiContext";

import { PROFILE_USERNAME_ROUTE } from "../constants/routes";

import { RelationshipList } from "../components/RelationshipList";
import * as userActions from "../store/actions/user";
import * as relationshipActions from "../store/actions/relationship";

import { useFollowDialog } from "../hooks/payment";

import { Container, Card, CardHeader, Avatar } from "@material-ui/core";

function Followings(props) {
  const { username } = useParams();

  const apiClient = useContext(ApiContext);
  const history = useHistory();

  const followDialog = useFollowDialog();

  const { user, me, following } = props;
  const { fetchUser, fetchFollowings, resetFollowings } = props;

  useEffect(() => {
    if (username) {
      (async () => {
        await fetchUser(apiClient, username);
        await fetchFollowings(apiClient, username);
      })();
    }
  }, [username]);

  useEffect(() => {
    return () => {
      resetFollowings();
    };
  }, []);

  return (
    <Container maxWidth="sm">
      <Card>
        <CardHeader
          avatar={<Avatar src={user.avatarUrl} />}
          title={user.name}
          subheader={`Following [${following.data?.length}]`}
          onClick={() => {
            history.push(PROFILE_USERNAME_ROUTE(user.userName));
          }}
        ></CardHeader>
      </Card>

      <RelationshipList items={following.data} currentUserName={me.userName} onSubscribeClick={followDialog.toggle} />
    </Container>
  );
}

function mapStateToProps(state) {
  return {
    me: {
      userName: state.signIn?.userInfo.userName,
    },
    user: state.user.data,
    following: {
      isFetching: state.users.isFetching,
      data: state.users.data,
    },
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchUser: (api, username) => dispatch(userActions.getUser(api, username)),
    fetchFollowings: (api, userName) => dispatch(relationshipActions.getFollowings(api, userName)),
    resetFollowings: () => dispatch(relationshipActions.resetRelationship()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Followings);
