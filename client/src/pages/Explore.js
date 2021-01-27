import React, { useContext, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import { Container, Box, Typography } from "@material-ui/core";

import { POSTS_LENGTH } from "../constants/feed";
import { POST_ID_ROUTE } from "../constants/routes";

import * as actionSuggestion from "../store/actions/suggestion";
import ApiContext from "../context/ApiContext";

import GridGallery from "../domain/GridGallery";

function Explore(props) {
  const history = useHistory();
  const apiClient = useContext(ApiContext);

  const { posts, getPosts, getPeople } = props;

  useEffect(() => {
    (async () => {
      await getPosts(apiClient, { length: POSTS_LENGTH });
      await getPeople(apiClient);
    })();
  }, []);

  const onFetchMore = (isLoading) => {
    if (!isLoading) {
      (async () => await getPosts(apiClient, { length: POSTS_LENGTH }))();
    }
  };

  const onItemClick = (id) => {
    history.push(POST_ID_ROUTE(id));
  };

  return (
    <Container>
      <Box my={4}>
        <GridGallery items={posts.data} hasMore={posts.hasMore} onFetchMore={onFetchMore} onItemClick={onItemClick}></GridGallery>
      </Box>
    </Container>
  );
}

function mapStateToProps(state) {
  return {
    posts: state.posts,
    people: state.users.data
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getPeople: (api, count) => dispatch(actionSuggestion.getPeople(api, count)),
    getPosts: (api, opts) => dispatch(actionSuggestion.getPosts(api, opts)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Explore);
