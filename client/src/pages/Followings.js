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
        await fetchFollowings(apiClient, username);
      })();
    }
  }, [username]);

  const handleFollowClick = ({ userName, isFollow }) => {
    !following.isFetching && isFollow ? deleteFollow(apiClient, userName) : createFollow(apiClient, userName);
  };

  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Box display="flex" flexWrap="noWrap" justifyContent="space-between">
          <Typography variant="subtitle1">Following</Typography>
          <Typography variant="subtitle1">[{following.data?.length}]</Typography>
        </Box>
        <Divider />
        <RelationshipList
          items={following.data}
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
    user: state.user.data,
    following: {
      isFetching: state.users.isFetching,
      data: state.users.data
    }
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchUser: (api, username) => dispatch(userActions.getUser(api, username)),
    fetchFollowings: (api, userName) => dispatch(relationshipActions.getFollowings(api, userName)),
    createFollow: (api, userName) => dispatch(relationshipActions.createFollow(api, userName)),
    deleteFollow: (api, userName) => dispatch(relationshipActions.deleteFollow(api, userName)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Followings);
