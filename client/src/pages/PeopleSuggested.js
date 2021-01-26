import React, { useContext, useEffect } from "react";
import { connect } from "react-redux";

import ApiContext from "../context/ApiContext";

import { Container, Box, Typography, Divider } from "@material-ui/core";

import { RelationshipList } from "../components/RelationshipList";
import * as actionSuggestion from "../store/actions/suggestion";
import * as relationshipActions from "../store/actions/relationship";

function PeopleSuggested(props) {
  const apiClient = useContext(ApiContext);

  const { people, isFetching, getPeople, createFollow, deleteFollow } = props;

  useEffect(() => {
    (async () =>  await getPeople(apiClient))();
  }, []);

  const handleFollowPeople = (item, isLoading) => {
    if(isLoading) {
      return;
    }

    item.isFollow ? deleteFollow(apiClient, item.userName) : createFollow(apiClient, item.userName);
  };

  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="subtitle1">Suggestions For You</Typography>
        <Divider />
        <RelationshipList items={people} onFollowClick={(item) => handleFollowPeople(item, isFetching)} />
      </Box>
    </Container>
  );
}

function mapStateToProps(state) {
  return {
    isFetching: state.users.isFetching,
    people: state.users.data,
    errorMessage: state.users.errorMessage,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getPeople: (api) => dispatch(actionSuggestion.getPeople(api)),
    createFollow: (api, userName) => dispatch(relationshipActions.createFollow(api, userName)),
    deleteFollow: (api, userName) => dispatch(relationshipActions.deleteFollow(api, userName)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PeopleSuggested);
