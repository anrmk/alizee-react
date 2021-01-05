import React, { useContext, useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";

import ApiContext from "../context/ApiContext";

import { RelationshipList } from "../components/RelationshipList";
import * as userActions from "../store/actions/user";
import * as relationshipActions from "../store/actions/relationship";

import { Container, Box, Typography, Divider } from "@material-ui/core";

function Followers(props) {
  const { username } = useParams();

  const apiClient = useContext(ApiContext);

  const { user, me, follower } = props;
  const { fetchUser, fetchFollowers, createFollow, deleteFollow } = props;

  useEffect(() => {
    if (username) {
      (async () => {
        await fetchUser(apiClient, username);
      })();
    }
  }, [username]);

  useEffect(() => {
    if (user.id) {
      (async () => {
        await fetchFollowers(apiClient, user.id);
      })();
    }
  }, [user.id]);

  const handleFollowClick = (item, isLoading) => {
    if (isLoading) return;

    item.isFollow ? deleteFollow(apiClient, item.followId) : createFollow(apiClient, item.followId);
  };

  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Box display="flex" flexWrap="noWrap" justifyContent="space-between">
          <Typography variant="subtitle1">Followers</Typography>
          <Typography>[{follower?.data.length}]</Typography>
        </Box>
        <Divider />
        <RelationshipList
          items={follower?.data}
          currentUserName={me.userName}
          onFollowClick={(item) => handleFollowClick(item, follower.isFetching)}
        />
      </Box>
    </Container>
  );
}

function mapStateToProps(state) {
  return {
    me: {
      userName: state.signIn?.userInfo?.userName,
    },
    user: {
      id: state.user.data?.id,
    },
    follower: {
      isFetching: state.relationship.isFetching,
      data: state.relationship?.followers,
      errorMessage: state.relationship.errorMessage,
    },
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchUser: (api, username) => dispatch(userActions.getUser(api, username)),
    fetchFollowers: (api, userId) => dispatch(relationshipActions.getFollowers(api, userId)),
    createFollow: (api, userId) => dispatch(relationshipActions.createFollow(api, userId)),
    deleteFollow: (api, userId) => dispatch(relationshipActions.deleteFollow(api, userId)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Followers);
