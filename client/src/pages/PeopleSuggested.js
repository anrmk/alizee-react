import React, { useContext, useEffect } from "react";
import { connect } from "react-redux";

import ApiContext from "../context/ApiContext";

import {Container, Box, Typography, Divider} from "@material-ui/core";

import { RelationshipList } from "../components/RelationshipList";
import * as actionSuggestion from "../store/actions/suggestion";

function PeopleSuggested(props) {
  const apiClient = useContext(ApiContext);
  const { peopleSuggestions, getPeopleSuggestions, followPeopleSuggestions, unfollowPeopleSuggestions } = props;

  useEffect(() => {
    getPeopleSuggestions(apiClient);
  }, []);

  const handleFollowPeople = (id, userId, isLoading) => {
    if(!isLoading) {
      var follower = peopleSuggestions.data.find(u => u.id === id);
      if(follower) {
        follower.isFollowing ? unfollowPeopleSuggestions(apiClient, id) : followPeopleSuggestions(apiClient, id);
      }
    }
  }

  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="subtitle1" >Suggestions For You</Typography>
        <Divider />
        <RelationshipList items={peopleSuggestions.data} onFollowClick={(id, userId) => handleFollowPeople(id, userId, peopleSuggestions.isFetching)} />
      </Box>
    </Container>
  );
}

function mapStateToProps(state) {
  return {
    peopleSuggestions: {
      isFetching: state.suggestion.isFetching,
      data: state.suggestion?.people,
      errorMessage: state.suggestion.errorMessage,
    },
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getPeopleSuggestions: (api) => dispatch(actionSuggestion.getPeopleSuggestions(api)),
    followPeopleSuggestions: (api, id) => dispatch(actionSuggestion.followPeopleSuggestions(api, id)),
    unfollowPeopleSuggestions: (api, id) => dispatch(actionSuggestion.unfollowPeopleSuggestions(api, id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PeopleSuggested);
