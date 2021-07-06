import { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";

import ApiContext from "../context/ApiContext";
import * as searchActions from "../store/actions/search";
import * as relationshipActions from "../store/actions/relationship";
import { SEARCH_USER_TYPE, isUserType } from "../constants/search";

export default function useSearch({ type = SEARCH_USER_TYPE }) {
  const apiClient = useContext(ApiContext);
  const location = useLocation();
  const history = useHistory();
  const [currentQuery, setCurrentQuery] = useState("");

  const dispatch = useDispatch();
  const { search } = useSelector((state) => ({
    search: {
      data: state.search.data,
      isFetching: state.search.isFetching,
      hasMore: state.search.hasMore,
      query: state.search.query,
    },
  }));

  const tags = useSelector((state) => state.search.tags);
  const { data: suggestionPeople } = useSelector((state) => state.users);

  useEffect(() => {
    if (suggestionPeople.length > 0 || SEARCH_USER_TYPE !== type) {
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
        await dispatch(searchActions.getDataByQuery(apiClient, { query: currentTags, type }));
      })();
      setCurrentQuery(currentTags);
    }
  }, []);

  useEffect(
    () => () => {
      dispatch(searchActions.resetSearch());
    },
    []
  );

  const handleFetchMore = async () => {
    //  TODO: func calls one more time when we firstly go to search page => find chip with many posts => explore + #tag => feed page => explore page.
    if (!search.isFetching) {
      await dispatch(searchActions.getDataByQuery(apiClient, { query: currentQuery, type }));
    }
  };

  const handleSearch = async (query) => {
    if (query.length > 2) {
      await dispatch(searchActions.getDataByQuery(apiClient, { query: query, type }));
    } else {
      dispatch(searchActions.resetSearch());
    }
    !isUserType(type) &&
      history.push({ pathname: history.pathname, search: query && "?tags=" + query.replaceAll("#", "") });
    setCurrentQuery(query);
  };

  return {
    lastQuery: currentQuery,
    data: search.data,
    hasMore: search.hasMore,
    onFetchMore: handleFetchMore,
    onSearch: handleSearch,
    tags,
    suggestionPeople,
    currentQuery,
  };
}
