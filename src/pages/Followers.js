import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { connect } from "react-redux";

import {
  Container,
  Tabs,
  Tab,
  Card,
  CardHeader,
  Avatar,
} from "@material-ui/core";
import ApiContext from "../context/ApiContext";

import * as relationshipActions from "../store/actions/relationship";
import * as userActions from "../store/actions/user";
import SearchInput from "../domain/Search";

import { PROFILE_USERNAME_ROUTE } from "../constants/routes";
import {
  FOLLOW_PENDING,
  FOLLOW_ACCEPTED,
  FOLLOW_REJECTED,
} from "../constants/follow_types";
import RelationshipList from "../components/RelationshipList";
import { useFollowDialog } from "../hooks/payment";
import useUsersSearch from "../hooks/useUsersSearch";

function Followers(props) {
  const { username } = useParams();
  const apiClient = useContext(ApiContext);
  const followDialog = useFollowDialog();

  const { user, me, followers } = props;
  const {
    fetchUser,
    fetchFollowers,
    acceptFollow,
    rejectFollow,
    unrejectFollow,
    reset,
  } = props;

  const [status, setStatus] = useState(FOLLOW_ACCEPTED);

  const { onSearch, onFetchMore, onClearInput, query } = useUsersSearch(
    fetchFollowers,
    username,
    status
  );

  useEffect(() => {
    if (username) {
      (async () => {
        await fetchUser(apiClient, username);
      })();
    }
  }, [username]);

  useEffect(() => {
    (async () => {
      await fetchFollowers(apiClient, username, query, status);
    })();
  }, [status]);

  const handleRefresh = () => {
    console.log("refresh");
  };

  const handleConfirmClick = ({ userName }) => {
    !followers.isFetching && acceptFollow(apiClient, userName);
  };

  const handleRejectClick = ({ userName }) => {
    rejectFollow(apiClient, userName);
  };

  const handleUnrejectClick = ({ userName }) => {
    unrejectFollow(apiClient, userName);
  };

  const handleTabChange = (e, newValue) => {
    reset();
    setStatus(newValue);
  };

  return (
    <Container maxWidth="sm">
      <Card>
        <CardHeader
          avatar={
            <Link to={PROFILE_USERNAME_ROUTE(user.userName)}>
              <Avatar src={user.avatarUrl} />
            </Link>
          }
          title={user.name}
          subheader={`Followers [${user.followersCount}]`}
        />
        <CardHeader
          title={
            <SearchInput onSendQuery={onSearch} onClearInput={onClearInput} />
          }
        />
        {me?.userName === user.userName && (
          <Tabs
            value={status}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            onChange={handleTabChange}>
            <Tab
              label="Accepted"
              aria-label="accepted"
              value={FOLLOW_ACCEPTED}
            />
            <Tab label="Pending" aria-label="pending" value={FOLLOW_PENDING} />
            <Tab
              label="Rejected"
              aria-label="rejected"
              value={FOLLOW_REJECTED}
            />
          </Tabs>
        )}
      </Card>

      <RelationshipList
        items={followers.data}
        currentUserName={me.userName}
        onSubscribeClick={followDialog.toggle}
        onConfirmClick={(item) => handleConfirmClick(item)}
        onRejectClick={(item) => handleRejectClick(item)}
        onUnrejectClick={(item) => handleUnrejectClick(item)}
        hasMore={followers.hasMore}
        onRefresh={handleRefresh}
        onFetchMore={onFetchMore}
      />
    </Container>
  );
}

function mapStateToProps(state) {
  return {
    me: {
      userName: state.signIn?.userInfo.userName,
      name: state.signIn?.userInfo.name,
      avatarUrl: state.signIn?.userInfo.avatarUrl,
      errorMessage: state.signIn?.errorMessage,
    },
    user: state.user.data,
    followers: {
      isFetching: state.users.isFetching,
      data: state.users.data,
      hasMore: state.users.hasMore,
    },
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchUser: (api, userName) => dispatch(userActions.getUser(api, userName)),
    fetchFollowers: (api, userName, query, status) =>
      dispatch(relationshipActions.getFollowers(api, userName, query, status)),
    acceptFollow: (api, userName) =>
      dispatch(relationshipActions.acceptFollow(api, userName)),
    rejectFollow: (api, userName) =>
      dispatch(relationshipActions.rejectFollow(api, userName)),
    unrejectFollow: (api, userName) =>
      dispatch(relationshipActions.unrejectFollow(api, userName)),
    reset: () => dispatch(relationshipActions.resetRelationship()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Followers);
