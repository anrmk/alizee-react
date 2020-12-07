import React, { useContext, useEffect } from "react";
import PropTypes from 'prop-types';
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

  const { user, me, follower } = props;
  const { 
    fetchUser, 
    fetchFollowings,
    createFollow,
    deleteFollow
  } = props;

  useEffect(() => {
    if (username) {
      (async () => {
        await fetchUser(apiClient, username);
      })();
    }
  }, [username])

  useEffect(() => {
    if (user.id) {
      (async () => {
        await fetchFollowings(apiClient, user.id);
      })();
    }
  }, [user.id])

  const handleFollowClick = (followId, userId, followers, loading) => {
    if (loading) return;

    const follower = followers.find(item => item.id === followId);
    if (follower) {
      follower.isFollowing ? 
        deleteFollow(apiClient, userId, followId) :
        createFollow(apiClient, userId, followId);
    }
  } 

  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="subtitle1">Followings</Typography>
        <Divider />
        <RelationshipList
          items={follower.data}
          currentUserId={me.id}
          onFollowClick={(id, userId) => handleFollowClick(id, userId, follower.data, follower.isFetching)}
        />
      </Box>
    </Container>
  );
}

function mapStateToProps(state) {
  return {
    me: {
      id: state.signIn?.userInfo?.id
    },
    user: {
      id: state.user.data?.id
    },
    follower: {
      isFetching: state.relationship.isFetching,
      data: state.relationship?.followings,
      errorMessage: state.relationship.errorMessage
    }
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchUser: (api, username) => dispatch(userActions.getUser(api, username)),
    fetchFollowings: (api, userId) => dispatch(relationshipActions.getFollowings(api, userId)),
    createFollow: (api, userId, followId) => dispatch(relationshipActions.createFollow(api, userId, followId)),
    deleteFollow: (api, userId, followId) => dispatch(relationshipActions.deleteFollow(api, userId, followId))
  };
}

Followings.propTypes = {
  me: PropTypes.any,
  user: PropTypes.any,
  follower: PropTypes.any,

  fetchUser: PropTypes.func,
  fetchFollowings:  PropTypes.func,
  createFollow: PropTypes.func,
  deleteFollow: PropTypes.func
}

Followings.defaultProps = {
  me: {},
  user: {},
  follower: {},

  fetchUser: () => {},
  fetchFollowings:  () => {},
  createFollow: () => {},
  deleteFollow: () => {}
};

export default connect(mapStateToProps, mapDispatchToProps)(Followings);
