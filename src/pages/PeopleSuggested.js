import React, { useContext, useEffect } from "react";
import { connect } from "react-redux";

import { Container, Box, Typography, Divider } from "@material-ui/core";
import ApiContext from "../context/ApiContext";

import RelationshipList from "../components/RelationshipList";
import * as actionRelationship from "../store/actions/relationship";
import { useFollowDialog } from "../hooks/payment";

function PeopleSuggested({
  isFetching,
  people,
  fetchRecommended,
  resetPeople,
}) {
  const apiClient = useContext(ApiContext);
  const followDialog = useFollowDialog();

  useEffect(() => {
    fetchRecommended(apiClient);

    return () => {
      resetPeople();
    };
  }, []);

  const handleFetchMore = async () => {
    console.log("IsFetching", isFetching);
    if (!isFetching) {
      await fetchRecommended(apiClient);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="subtitle1">Suggestions For You</Typography>
        <Divider />
        <RelationshipList
          items={people}
          onSubscribeClick={followDialog.toggle}
          onFetchMore={handleFetchMore}
        />
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
    fetchRecommended: (api) => dispatch(actionRelationship.getRecommended(api)),
    resetPeople: () => dispatch(actionRelationship.resetRecommended()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PeopleSuggested);
