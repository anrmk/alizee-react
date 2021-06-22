import React, { useContext, useEffect } from "react";
import { connect } from "react-redux";

import ApiContext from "../context/ApiContext";

import { Container, Box, Typography, Divider } from "@material-ui/core";

import { RelationshipList } from "../components/RelationshipList";
import * as actionSuggestion from "../store/actions/suggestion";
// import * as relationshipActions from "../store/actions/relationship";
import { useFollowDialog } from "../hooks/payment";

function PeopleSuggested({ people, getPeople }) {
  const apiClient = useContext(ApiContext);
  const followDialog = useFollowDialog();

  useEffect(() => {
    (async () => await getPeople(apiClient))();
  }, []);

  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="subtitle1">Suggestions For You</Typography>
        <Divider />
        <RelationshipList items={people} onSubscribeClick={followDialog.toggle} />
      </Box>
    </Container>
  );
}

function mapStateToProps(state) {
  return {
    isFetching: state.suggestionPeople.isFetching,
    people: state.suggestionPeople.data,
    errorMessage: state.suggestionPeople.errorMessage,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getPeople: (api) => dispatch(actionSuggestion.getPeople(api)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PeopleSuggested);
