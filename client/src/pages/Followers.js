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

  const { user, me, followers } = props;
  const { fetchUser, fetchFollowers, createFollow, deleteFollow } = props;

  useEffect(() => {
    if (username) {
      (async () => {
        await fetchUser(apiClient, username);
        await fetchFollowers(apiClient, username);
      })();
    }
  }, [username]);

  const handleFollowClick = ({ userName, isFollow }) => {
    !followers.isFetching && isFollow ? deleteFollow(apiClient, userName) : createFollow(apiClient, userName);
  };

  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Box display="flex" flexWrap="noWrap" justifyContent="space-between">
          <Typography variant="subtitle1">Followers</Typography>
          <Typography variant="subtitle1">[{followers.data?.length}]</Typography>
        </Box>
        <Divider />
        <RelationshipList
          items={followers.data}
          currentUserName={me.userName}
          onFollowClick={(item) => handleFollowClick(item, followers.isFetching)}
        />
      </Box>
    </Container>
  );
}

function mapStateToProps(state) {
  return {
    me: {
      userName: state.signIn?.userInfo.userName,
    },
    user: state.user.data,
    followers: {
      isFetching: state.users.isFetching, 
      data: state.users.data,
    }
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchUser: (api, userName) => dispatch(userActions.getUser(api, userName)),
    fetchFollowers: (api, userName) => dispatch(relationshipActions.getFollowers(api, userName)),
    createFollow: (api, userName) => dispatch(relationshipActions.createFollow(api, userName)),
    deleteFollow: (api, userName) => dispatch(relationshipActions.deleteFollow(api, userName)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Followers);
