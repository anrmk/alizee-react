import React, { useContext, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { connect } from "react-redux";

import { Container, Card, CardHeader, Avatar } from "@material-ui/core";
import ApiContext from "../context/ApiContext";

import { PROFILE_USERNAME_ROUTE } from "../constants/routes";

import RelationshipList from "../components/RelationshipList";
import * as relationshipActions from "../store/actions/relationship";
import * as userActions from "../store/actions/user";

import { useFollowDialog } from "../hooks/payment";

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

  useEffect(
    () => () => {
      resetFollowings();
    },
    []
  );

  const handleRefresh = () => {
    console.log("refresh");
  };

  const handleFetchMore = () => {
    fetchFollowings(apiClient, username);
  };

  return (
    <Container maxWidth="sm">
      <Card>
        <CardHeader
          avatar={<Avatar src={user.avatarUrl} />}
          title={user.name}
          subheader={`Following [${user.followingsCount}]`}
          onClick={() => {
            history.push(PROFILE_USERNAME_ROUTE(user.userName));
          }}
        />
      </Card>

      <RelationshipList
        items={following.data}
        currentUserName={me.userName}
        onSubscribeClick={followDialog.toggle}
        hasMore={following.hasMore}
        onRefresh={handleRefresh}
        onFetchMore={handleFetchMore}
      />
    </Container>
  );
}

function mapStateToProps(state) {
  return {
    user: state.user.data,
    me: {
      userName: state.signIn?.userInfo.userName,
      name: state.signIn?.userInfo.name,
      avatarUrl: state.signIn?.userInfo.avatarUrl,
    },
    following: {
      isFetching: state.users.isFetching,
      data: state.users.data,
      hasMore: state.users.hasMore,
    },
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchUser: (api, username) => dispatch(userActions.getUser(api, username)),
    fetchFollowings: (api, userName) =>
      dispatch(relationshipActions.getFollowings(api, userName)),
    resetFollowings: () => dispatch(relationshipActions.resetRelationship()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Followings);
