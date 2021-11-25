import React, { useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { Divider, Typography, Box } from "@material-ui/core";
import { POST_ID_ROUTE } from "../constants/routes";

import GridGallery from "../components/GridGallery";
import useSearch from "../hooks/useSearch";
import { SEARCH_TAG_TYPE } from "../constants/search";
import { POSTS_LENGTH } from "../constants/feed";

import ApiContext from "../context/ApiContext";
import * as postActions from "../store/actions/post";

import { NoResult } from "../components/Search";

function Explore() {
  const history = useHistory();
  const dispatch = useDispatch();
  const apiClient = useContext(ApiContext);

  const search = useSearch({ type: SEARCH_TAG_TYPE });

  const { suggestedPosts } = useSelector((state) => ({
    suggestedPosts: {
      data: state.suggestedPosts.data,
      isFetching: state.suggestedPosts.isFetching,
      hasMore: state.suggestedPosts.hasMore,
    },
  }));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (suggestedPosts.data.length > 0) {
      return;
    }
    (async () => {
      await dispatch(
        postActions.getSuggestedPosts(apiClient, { length: POSTS_LENGTH })
      );
    })();
  }, []);

  const handleFetchMorePosts = async () => {
    //   TODO: func calls while we scroll searched posts.
    if (!suggestedPosts.isFetching && search) {
      await dispatch(
        postActions.getSuggestedPosts(apiClient, { length: POSTS_LENGTH })
      );
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
        items={suggestedPosts.data}
        hasMore={suggestedPosts.hasMore}
        onFetchMore={handleFetchMorePosts}
        onItemClick={onItemClick}
      />
    </>
  );
}

export default Explore;
