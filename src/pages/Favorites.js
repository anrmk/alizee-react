import React, { useContext, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { connect } from "react-redux";

import { Container, Card, CardHeader, Avatar } from "@material-ui/core";
import ApiContext from "../context/ApiContext";

import { PROFILE_USERNAME_ROUTE } from "../constants/routes";

import { useFollowDialog } from "../hooks/payment";

import RelationshipList from "../components/RelationshipList";
import * as accountActions from "../store/actions/account";
import * as relationshipActions from "../store/actions/relationship";

function Favorites(props) {
  const { username } = useParams();

  const apiClient = useContext(ApiContext);
  const history = useHistory();
  const followDialog = useFollowDialog();

  const { me, favorites } = props;
  const { fetchFavorites, resetFollowings } = props;

  useEffect(() => {
    if (username) {
      (async () => {
        await fetchFavorites(apiClient, username);
      })();
    }
  }, [username]);

  useEffect(
    () => () => {
      resetFollowings();
    },
    []
  );

  return (
    <Container maxWidth="sm">
      <Card>
        <CardHeader
          avatar={<Avatar src={me.avatarUrl} />}
          title={me.name}
          subheader={`Favorites [${favorites.data?.length}]`}
          onClick={() => {
            history.push(PROFILE_USERNAME_ROUTE(me.userName));
          }}
        />
      </Card>

      <RelationshipList
        items={favorites.data}
        currentUserName={me.userName}
        onSubscribeClick={followDialog.toggle}
      />
    </Container>
  );
}

function mapStateToProps(state) {
  return {
    me: {
      userName: state.signIn?.userInfo?.userName,
      name: state.signIn?.userInfo?.name,
      avatarUrl: state.signIn?.userInfo?.avatarUrl,
    },

    favorites: {
      isFetching: state.users.isFetching,
      data: state.users.data,
    },
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchFavorites: (api, userName) =>
      dispatch(accountActions.getFavorites(api, userName)),
    resetFollowings: () => dispatch(relationshipActions.resetRelationship()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
