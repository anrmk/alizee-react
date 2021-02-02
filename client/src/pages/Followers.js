import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";

import ApiContext from "../context/ApiContext";

import * as userActions from "../store/actions/user";
import * as relationshipActions from "../store/actions/relationship";

import { PROFILE_USERNAME_ROUTE } from "../constants/routes";
import { FOLLOW_PENDING, FOLLOW_ACCEPTED, FOLLOW_REJECTED } from "../constants/follow_types";
import { RelationshipList } from "../components/RelationshipList";

import { Container, Tabs, Tab, Card, CardHeader, Avatar } from "@material-ui/core";

function Followers(props) {
  const { username } = useParams();
  const apiClient = useContext(ApiContext);
  const history = useHistory();

  const { user, me, followers } = props;
  const { fetchUser, fetchFollowers, createFollow, acceptFollow, deleteFollow, rejectFollow, unrejectFollow } = props;

  const [status, setStatus] = useState(FOLLOW_ACCEPTED);

  useEffect(() => {
    if (username) {
      (async () => {
        await fetchUser(apiClient, username);
      })();
    }
  }, [username]);

  useEffect(() => {
    (async () => {
      await fetchFollowers(apiClient, username, status);
    })();
  }, [status]);

  const handleFollowClick = ({ userName, isFollow }) => {
    !followers.isFetching && isFollow ? deleteFollow(apiClient, userName) : createFollow(apiClient, userName);
  };

  const handleConfirmClick = ({ userName, status }) => {
    !followers.isFetching && acceptFollow(apiClient, userName);
  };

  const handleRejectClick = ({ userName, status }) => {
    rejectFollow(apiClient, userName);
  };

  const handleUnrejectClick = ({ userName, status }) => {
    unrejectFollow(apiClient, userName);
  };

  return (
    <Container maxWidth="sm">
      <Card>
        <CardHeader
          avatar={<Avatar src={user.avatarUrl} />}
          title={user.name}
          subheader={`Followers [${followers.data?.length}]`}
          onClick={() => {
            history.push(PROFILE_USERNAME_ROUTE(user.userName));
          }}
        ></CardHeader>
        {me.userName === user.userName && (
          <Tabs
            value={status}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            onChange={(e, newValue) => {
              setStatus(newValue);
            }}
          >
            <Tab label="Accepted" aria-label="accepted" value={FOLLOW_ACCEPTED} />
            <Tab label="Pending" aria-label="pending" value={FOLLOW_PENDING} />
            <Tab label="Rejected" aria-label="rejected" value={FOLLOW_REJECTED} />
          </Tabs>
        )}
      </Card>

      {!followers.isFetching && (
        <RelationshipList
          items={followers.data}
          currentUserName={me.userName}
          onFollowClick={(item) => handleFollowClick(item)}
          onConfirmClick={(item) => handleConfirmClick(item)}
          onRejectClick={(item) => handleRejectClick(item)}
          onUnrejectClick={(item) => handleUnrejectClick(item)}
        />
      )}
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
    },
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchUser: (api, userName) => dispatch(userActions.getUser(api, userName)),
    fetchFollowers: (api, userName, status) => dispatch(relationshipActions.getFollowers(api, userName, status)),
    createFollow: (api, userName) => dispatch(relationshipActions.createFollow(api, userName)),
    deleteFollow: (api, userName) => dispatch(relationshipActions.deleteFollow(api, userName)),
    acceptFollow: (api, userName) => dispatch(relationshipActions.acceptFollow(api, userName)),
    rejectFollow: (api, userName) => dispatch(relationshipActions.rejectFollow(api, userName)),
    unrejectFollow: (api, userName) => dispatch(relationshipActions.unrejectFollow(api, userName)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Followers);
