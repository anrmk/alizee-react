import React, { useContext, useEffect } from "react";
import { connect } from "react-redux";

import ApiContext from "../context/ApiContext";

import { Container, Box, Typography, Divider } from "@material-ui/core";

import { RelationshipList } from "../components/RelationshipList";
import * as actionRelationship from "../store/actions/relationship";
import { useFollowDialog } from "../hooks/payment";

function PeopleSuggested({ people, getPeople, resetPeople }) {
  const apiClient = useContext(ApiContext);
  const followDialog = useFollowDialog();

  useEffect(() => {
    getPeople(apiClient);

    return () => {
      resetPeople();
    };
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
    isFetching: state.users.isFetching,
    people: state.users.data,
    errorMessage: state.users.errorMessage,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getPeople: (api) => dispatch(actionRelationship.getSuggestionPeople(api)),
    resetPeople: () => dispatch(actionRelationship.resetSuggestionPeople()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PeopleSuggested);
