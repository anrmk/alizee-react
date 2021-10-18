import React, { useContext, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { connect } from "react-redux";

import { Container, Card, CardHeader, Avatar } from "@material-ui/core";
import ApiContext from "../context/ApiContext";

import { PROFILE_USERNAME_ROUTE } from "../constants/routes";

import RelationshipList from "../components/RelationshipList";
import SearchInput from "../domain/Search";
import * as relationshipActions from "../store/actions/relationship";
import * as userActions from "../store/actions/user";

import { useFollowDialog } from "../hooks/payment";
import useUsersSearch from "../hooks/useUsersSearch";

function Followings(props) {
  const { user, me, following } = props;
  const { fetchUser, fetchFollowings } = props;

  const { username } = useParams();

  const apiClient = useContext(ApiContext);
  const history = useHistory();

  const followDialog = useFollowDialog();
  const { onSearch, onFetchMore, onClearInput } = useUsersSearch(
    fetchFollowings,
    username
  );

  useEffect(() => {
    if (username) {
      (async () => {
        await fetchUser(apiClient, username);
        await fetchFollowings(apiClient, username);
      })();
    }
  }, [username]);

  const handleRefresh = () => {
    console.log("refresh");
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
        <CardHeader
          title={
            <SearchInput onSendQuery={onSearch} onClearInput={onClearInput} />
          }
        />
      </Card>

      <RelationshipList
        items={following.data}
        currentUserName={me.userName}
        onSubscribeClick={followDialog.toggle}
        hasMore={following.hasMore}
        onRefresh={handleRefresh}
        onFetchMore={onFetchMore}
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
    fetchFollowings: (api, userName, query) =>
      dispatch(relationshipActions.getFollowings(api, userName, query)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Followings);
