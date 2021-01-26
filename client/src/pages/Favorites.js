import React, { useContext, useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";

import ApiContext from "../context/ApiContext";

import { RelationshipList } from "../components/RelationshipList";
import * as userActions from "../store/actions/user";
import * as accountActions from "../store/actions/account";
import * as relationshipActions from "../store/actions/relationship";

import { Container, Box, Typography, Divider } from "@material-ui/core";

function Favorites(props) {
  const { username } = useParams();

  const apiClient = useContext(ApiContext);

  const { user, me, favorites } = props;
  const { fetchUser, fetchFavorites, createFollow, deleteFollow } = props;

  useEffect(() => {
    if (username) {
      (async () => {
        await fetchUser(apiClient, username);
        await fetchFavorites(apiClient, username);
      })();
    }
  }, [username]);

   const handleFollowClick = ({ userName, isFollow }) => {
     !favorites.isLoading && isFollow ? deleteFollow(apiClient, userName) : createFollow(apiClient, userName);
   };

  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Box display="flex" flexWrap="noWrap" justifyContent="space-between">
          <Typography variant="subtitle1">Favorites</Typography>
          <Typography>[{favorites.data?.length}]</Typography>
        </Box>
        <Divider />
        <RelationshipList
          items={favorites.data}
          currentUserName={me.userName}
          onFollowClick={(item) => handleFollowClick(item, favorites.isFetching)}
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
    user: state.user.data,
    favorites: {
      isFetching: state.users.isFetching, 
      data: state.users.data,
    }
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchUser: (api, username) => dispatch(userActions.getUser(api, username)),
    fetchFavorites: (api, userName) => dispatch(accountActions.getFavorites(api, userName)),
    createFollow: (api, userName) => dispatch(relationshipActions.createFollow(api, userName)),
    deleteFollow: (api, userName) => dispatch(relationshipActions.deleteFollow(api, userName)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
