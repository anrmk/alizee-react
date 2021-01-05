import React, { useContext, useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";

import ApiContext from "../context/ApiContext";

import { RelationshipList } from "../components/RelationshipList";
import * as userActions from "../store/actions/user";
import * as relationshipActions from "../store/actions/relationship";

import { Container, Box, Typography, Divider } from "@material-ui/core";

function Followings(props) {
  const { username } = useParams();

  const apiClient = useContext(ApiContext);

  const { user, me, following } = props;
  const { fetchUser, fetchFollowings, createFollow, deleteFollow } = props;

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
        await fetchFollowings(apiClient, user.id);
      })();
    }
  }, [user.id]);

  const handleFollowClick = (item, isLoading) => {
    if (isLoading) return;

    item.isFollow ? deleteFollow(apiClient, item.userId, item.followId) : createFollow(apiClient, item.userId, item.followId);
  };

  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Box display="flex" flexWrap="noWrap" justifyContent="space-between">
          <Typography variant="subtitle1">Following</Typography>
          <Typography variant="subtitle1">[{following?.data.length}]</Typography>
        </Box>
        <Divider />
        <RelationshipList
          items={following?.data}
          currentUserName={me.userName}
          onFollowClick={(item) => handleFollowClick(item, following.isFetching)}
        />
      </Box>
    </Container>
  );
}

function mapStateToProps(state) {
  return {
    me: {
      userName: state.signIn?.userInfo.userName
    },
    user: {
      id: state.user.data?.id,
    },
    following: {
      isFetching: state.relationship.isFetching,
      data: state.relationship?.followings,
      errorMessage: state.relationship.errorMessage,
    },
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchUser: (api, username) => dispatch(userActions.getUser(api, username)),
    fetchFollowings: (api, userId) => dispatch(relationshipActions.getFollowings(api, userId)),
    createFollow: (api, userId, followId) => dispatch(relationshipActions.createFollow(api, userId, followId)),
    deleteFollow: (api, userId, followId) => dispatch(relationshipActions.deleteFollow(api, userId, followId)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Followings);
