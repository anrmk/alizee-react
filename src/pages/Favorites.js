import React, { useContext, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { connect } from "react-redux";

import { Container, Card, CardHeader, Avatar } from "@material-ui/core";
import ApiContext from "../context/ApiContext";
import SearchInput from "../domain/Search";

import { PROFILE_USERNAME_ROUTE } from "../constants/routes";

import useFavoriteUserAction from "../hooks/useFavoriteUserAction";

import RelationshipList from "../components/RelationshipList";
import * as accountActions from "../store/actions/account";
import useUsersSearch from "../hooks/useUsersSearch";

function Favorites(props) {
  const { username } = useParams();

  const apiClient = useContext(ApiContext);
  const history = useHistory();
  const { favoriteUserAction } = useFavoriteUserAction();

  const { me, favorites } = props;
  const { fetchFavorites } = props;

  const { onSearch, onFetchMore, onClearInput } = useUsersSearch(
    fetchFavorites,
    username
  );

  useEffect(() => {
    if (username) {
      (async () => {
        await fetchFavorites(apiClient, username);
      })();
    }
  }, [username]);

  const handleFavorite = async (data) => {
    await favoriteUserAction(data);
  };

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
        <CardHeader
          title={
            <SearchInput onSendQuery={onSearch} onClearInput={onClearInput} />
          }
        />
      </Card>

      <RelationshipList
        items={favorites.data}
        currentUserName={me.userName}
        onFavoriteClick={handleFavorite}
        onFetchMore={onFetchMore}
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
    fetchFavorites: (api, userName, query) =>
      dispatch(accountActions.getFavorites(api, userName, query)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
