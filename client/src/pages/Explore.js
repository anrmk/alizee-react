import React, { useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { POST_ID_ROUTE } from "../constants/routes";

import GridGallery from "../domain/GridGallery";
import useSearch from "../hooks/useSearch";
import { SEARCH_TAG_TYPE } from "../constants/search";
import { POSTS_LENGTH } from "../constants/feed";

import ApiContext from "../context/ApiContext";
import * as suggestionActions from "../store/actions/suggestion";

import { Divider, Typography, Box } from "@material-ui/core";
import { NoResult } from "../components/Search";

function Explore() {
  const history = useHistory();
  const dispatch = useDispatch();
  const apiClient = useContext(ApiContext);

  const search = useSearch({ type: SEARCH_TAG_TYPE });

  const { suggestionPosts } = useSelector((state) => ({
    suggestionPosts: {
      data: state.suggestionPosts.data,
      isFetching: state.suggestionPosts.isFetching,
      hasMore: state.suggestionPosts.hasMore,
    },
  }));

  useEffect(() => {
    if (suggestionPosts.data.length > 0) {
      return;
    }
    (async () => {
      await dispatch(suggestionActions.getPosts(apiClient, { length: POSTS_LENGTH }));
    })();
  }, []);

  const handleFetchMorePosts = async () => {
	//   TODO: func calls while we scroll searched posts.
    if (!suggestionPosts.isFetching && search) {
      await dispatch(suggestionActions.getPosts(apiClient, { length: POSTS_LENGTH }));
    }
  };

  const onItemClick = (id) => {
    history.push(POST_ID_ROUTE(id));
  };

  return (
    <>
      <Box marginBottom={1}>
        {search.data?.length === 0 && search.currentQuery ? (
          <NoResult />
        ) : (
          <GridGallery
            items={search.data}
            hasMore={search.hasMore}
            onFetchMore={search.onFetchMore}
            onItemClick={onItemClick}
          />
        )}
      </Box>

      {search.currentQuery && (
        <Box marginTop={1}>
          <Divider component="div" />
          <Typography variant="h6" gutterBottom>
            Recommended posts
          </Typography>
        </Box>
      )}
      
      <GridGallery
        items={suggestionPosts.data}
        hasMore={suggestionPosts.hasMore}
        onFetchMore={handleFetchMorePosts}
        onItemClick={onItemClick}
      />
    </>
  );
}

export default Explore;
