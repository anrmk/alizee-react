import React, { useContext, useEffect } from "react";
import { connect } from "react-redux";

import ApiContext from "../context/ApiContext";

import { Container, Box, Typography, Divider } from "@material-ui/core";

import { RelationshipList } from "../components/RelationshipList";
import * as actionSuggestion from "../store/actions/suggestion";

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

    item.isFollow ? deleteFollow(apiClient, item.id) : createFollow(apiClient, item.id);
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
    isFetching: state.suggestion.people.isFetching,
    people: state.suggestion.people.data,
    errorMessage: state.suggestion.errorMessage,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getPeople: (api) => dispatch(actionSuggestion.getPeople(api)),
    createFollow: (api, userId) => dispatch(actionSuggestion.createFollow(api, userId)),
    deleteFollow: (api, userId) => dispatch(actionSuggestion.deleteFollow(api, userId)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PeopleSuggested);
