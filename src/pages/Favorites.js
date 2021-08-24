import React, { useContext, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { connect } from "react-redux";

import { Container, Card, CardHeader, Avatar } from "@material-ui/core";
import ApiContext from "../context/ApiContext";

import { PROFILE_USERNAME_ROUTE } from "../constants/routes";

import RelationshipList from "../components/RelationshipList";
import * as userActions from "../store/actions/user";
import * as accountActions from "../store/actions/account";
import * as relationshipActions from "../store/actions/relationship";

function Favorites(props) {
  const { username } = useParams();

  const apiClient = useContext(ApiContext);
  const history = useHistory();

  const { user, me, favorites } = props;
  const {
    fetchUser,
    fetchFavorites,
    createSubscribe,
    deleteSubscribe,
    resetFollowings,
  } = props;

  useEffect(() => {
    if (username) {
      (async () => {
        await fetchUser(apiClient, username);
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

  const handleFollowClick = ({ userName, isFollow }) => {
    !favorites.isLoading && isFollow
      ? deleteSubscribe(apiClient, userName)
      : createSubscribe(apiClient, userName);
  };

  return (
    <Container maxWidth="sm">
      <Card>
        <CardHeader
          avatar={<Avatar src={user.avatarUrl} />}
          title={user.name}
          subheader={`Favorites [${favorites.data?.length}]`}
          onClick={() => {
            history.push(PROFILE_USERNAME_ROUTE(user.userName));
          }}
        />
      </Card>

      <RelationshipList
        items={favorites.data}
        currentUserName={me.userName}
        onSubscribeClick={(item) =>
          handleFollowClick(item, favorites.isFetching)
        }
      />
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
    },
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchUser: (api, username) => dispatch(userActions.getUser(api, username)),
    fetchFavorites: (api, userName) =>
      dispatch(accountActions.getFavorites(api, userName)),
    createSubscribe: (api, userName) =>
      dispatch(relationshipActions.createSubscribe(api, userName)),
    deleteSubscribe: (api, userName) =>
      dispatch(relationshipActions.deleteSubscribe(api, userName)),
    resetFollowings: () => dispatch(relationshipActions.resetRelationship()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
