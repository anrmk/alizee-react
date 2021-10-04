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

import { PROFILE_USERNAME_ROUTE } from "../constants/routes";
import {
  FOLLOW_PENDING,
  FOLLOW_ACCEPTED,
  FOLLOW_REJECTED,
} from "../constants/follow_types";
import RelationshipList from "../components/RelationshipList";
import { useFollowDialog } from "../hooks/payment";

function Followers(props) {
  const { username } = useParams();
  const apiClient = useContext(ApiContext);
  const followDialog = useFollowDialog();

  const { me, followers } = props;
  const { fetchFollowers, acceptFollow, rejectFollow, unrejectFollow, reset } =
    props;

  const [status, setStatus] = useState(FOLLOW_ACCEPTED);

  useEffect(() => {
    (async () => {
      await fetchFollowers(apiClient, username, status);
    })();
  }, [status]);

  useEffect(
    () => () => {
      reset();
    },
    []
  );

  const handleRefresh = () => {
    console.log("refresh");
  };

  const handleFetchMore = () => {
    fetchFollowers(apiClient, username, status);
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
            <Link to={PROFILE_USERNAME_ROUTE(me.userName)}>
              <Avatar src={me.avatarUrl} />
            </Link>
          }
          title={me.name}
          subheader={`Followers [${followers.data?.length}]`}
        />
        {me?.userName && (
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
        onFetchMore={handleFetchMore}
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
    followers: {
      isFetching: state.users.isFetching,
      data: state.users.data,
      hasMore: state.users.hasMore,
    },
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchFollowers: (api, userName, status) =>
      dispatch(relationshipActions.getFollowers(api, userName, status)),
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
