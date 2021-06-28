import { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";

import ApiContext from "../context/ApiContext";
import * as searchActions from "../store/actions/search";
import * as suggestionActions from "../store/actions/suggestion";
import * as relationshipActions from "../store/actions/relationship";
// import * as actionPost from "../store/actions/post";
import { SEARCH_USER_TYPE, isUserType } from "../constants/search";
import { POSTS_LENGTH } from "../constants/feed";
//import search from "../store/reducers/search";

export default function useSearch({ type = SEARCH_USER_TYPE }) {
  const apiClient = useContext(ApiContext);
  const location = useLocation();
  const history = useHistory();
  const [currentQuery, setCurrentQuery] = useState("");

  const dispatch = useDispatch();
  const { searchedUsers, suggestionPosts } = useSelector((state) => ({
    searchedUsers: {
      data: state.search.data,
      isFetching: state.search.isFetching,
      hasMore: state.search.hasMore,
      query: state.search.query,
    },
    suggestionPosts: {
      data: state.suggestionPosts.data,
      isFetching: state.suggestionPosts.isFetching,
      hasMore: state.suggestionPosts.hasMore,
    },
  }));

  const tags = useSelector((state) => state.search.tags);
  const { data: suggestionPeople } = useSelector((state) => state.users);

  useEffect(() => {
    if (suggestionPeople.length > 0) {
      return;
    }
    //TODO: need paggination
    dispatch(relationshipActions.getSuggestionPeople(apiClient));
  }, []);

  useEffect(() => {
    let currentTags = location.search && new URLSearchParams(location.search).get("tags");
    if (currentTags) {
      currentTags = currentTags
        .split(" ")
        .map((tag) => "#" + tag)
        .join(" ");
    }

    // TODO: change currentTag on backend from #tag to tag.
    if (currentTags) {
      (async () => {
        await dispatch(searchActions.getUsersByQuery(apiClient, { query: currentTags, type }));
      })();
      setCurrentQuery(currentTags);
    }

    return () => {
      dispatch(suggestionActions.resetPosts());
      dispatch(searchActions.resetSearch());
    };
  }, []);

  useEffect(() => {
    const currentTags = new URLSearchParams(location.search).get("tags");

    if (!isUserType(type) && !currentTags?.length) {
      dispatch(suggestionActions.getPosts(apiClient, { length: POSTS_LENGTH }));
    }
  }, [type]);

  const handleFetchMore = async () => {
    if (!searchedUsers.isFetching && !suggestionPosts.isFetching) {
      if (!currentQuery && !isUserType(type)) {
        await dispatch(suggestionActions.getPosts(apiClient, { length: POSTS_LENGTH }));
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
      !isUserType(type) && (await dispatch(suggestionActions.getPosts(apiClient, { length: POSTS_LENGTH })));
    }
    !isUserType(type) &&
      history.push({ pathname: history.pathname, search: query && "?tags=" + query.replaceAll("#", "") });
    setCurrentQuery(query);
  };

  return {
    lastQuery: currentQuery,
    data: isUserType(type) || searchedUsers.query ? searchedUsers.data : suggestionPosts.data,
    hasMore: isUserType(type) || searchedUsers.query ? searchedUsers.hasMore : suggestionPosts.hasMore,
    onFetchMore: handleFetchMore,
    onSearch: handleSearch,
    tags,
    suggestionPeople,
    currentQuery,
  };
}
