import { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";

import ApiContext from "../context/ApiContext";
import * as searchActions from "../store/actions/search";
import * as actionSuggestion from "../store/actions/suggestion";
import * as actionPost from "../store/actions/post";
import { SEARCH_USER_TYPE, isUserType } from "../constants/search";
import { POSTS_LENGTH } from "../constants/feed";
import search from "../store/reducers/search";

export default function useSearch({ type = SEARCH_USER_TYPE }) {
  const apiClient = useContext(ApiContext);
  const location = useLocation();
  const history = useHistory();
  const [currentQuery, setCurrentQuery] = useState("");
  const [localPosts, setLocalPosts] = useState([]);
  const [localHasMore, setLocalHasMore] = useState(false);

  const dispatch = useDispatch();
  const { searchedPosts, suggestionPosts } = useSelector((state) => ({
    searchedPosts: {
      data: state.search.data,
      isFetching: state.search.isFetching,
      hasMore: state.search.hasMore,
    },
    suggestionPosts: {
      data: state.posts.data,
      isFetching: state.posts.isFetching,
      hasMore: state.posts.hasMore,
    },
  }));

  const tags = useSelector((state) => state.search.tags);

  useEffect(() => {
    const currentTags = new URLSearchParams(location.search).get("tags");

    if (!isUserType(type) && !currentTags?.length) {
      dispatch(actionSuggestion.getPosts(apiClient, { length: POSTS_LENGTH }));
    }
  }, [type]);

  useEffect(() => {
    let currentTags = location.search && new URLSearchParams(location.search).get("tags");
    if (currentTags) {
      currentTags = currentTags
        .split(" ")
        .map((tag) => "#" + tag)
        .join(" ");
    }

    if (currentTags) {
      (async () => {
        await dispatch(searchActions.getUsersByQuery(apiClient, { query: currentTags, type }));
      })();
      setCurrentQuery(currentTags);
    }

    return () => {
      dispatch(actionPost.resetPosts());
    };
  }, []);

  useEffect(() => {
    setLocalHasMore(searchedPosts.hasMore);
  }, [searchedPosts.hasMore]);

  useEffect(() => {
    setLocalHasMore(suggestionPosts.hasMore);
  }, [suggestionPosts.hasMore]);

  useEffect(() => {
    if (searchedPosts.data.length) {
      setLocalPosts(searchedPosts.data);
      setLocalHasMore(searchedPosts.hasMore);
    } else {
      setLocalPosts([]);
      setLocalHasMore(false);
    }
  }, [searchedPosts.data]);

  useEffect(() => {
    if (suggestionPosts.data.length) {
      setLocalPosts(suggestionPosts.data);
      setLocalHasMore(suggestionPosts.hasMore);
    } else {
      setLocalPosts([]);
      setLocalHasMore(false);
    }
  }, [suggestionPosts.data]);

  const handleFetchMore = async () => {
    if (!searchedPosts.isFetching && !suggestionPosts.isFetching) {
      if (!currentQuery && !isUserType(type)) {
        await dispatch(actionSuggestion.getPosts(apiClient, { length: POSTS_LENGTH }));
      } else {
        await dispatch(searchActions.getUsersByQuery(apiClient, { query: currentQuery, type }));
      }
    }
  };

  const handleSearch = async (query) => {
    if (query.length > 2) {
      await dispatch(searchActions.getUsersByQuery(apiClient, { query: query, type }));
    } else {
      dispatch(searchActions.resetSearch());
      !isUserType(type) && (await dispatch(actionSuggestion.getPosts(apiClient, { length: POSTS_LENGTH })));
    }
    !isUserType(type) &&
      history.push({ pathname: history.pathname, search: query && "?tags=" + query.replaceAll("#", "") });
    setCurrentQuery(query);
  };

  return {
    lastQuery: currentQuery,
    posts: localPosts,
    hasMore: localHasMore,
    onFetchMore: handleFetchMore,
    onSearch: handleSearch,
    tags,
  };
}
