import { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";

import ApiContext from "../context/ApiContext";
import * as relationshipActions from "../store/actions/relationship";
import { isSpecialCharacter } from "../helpers/functions";

export default function useUsersSearch(onUsersSearch, username, status) {
  const apiClient = useContext(ApiContext);
  const [currentQuery, setCurrentQuery] = useState("");

  const dispatch = useDispatch();
  const { search } = useSelector((state) => ({
    search: {
      isFetching: state.users.isFetching,
      query: state.users.query,
    },
  }));

  useEffect(
    () => () => {
      dispatch(relationshipActions.resetRelationship());
    },
    []
  );

  const handleFetchMore = async () => {
    if (!search.isFetching) {
      await onUsersSearch(apiClient, username, currentQuery, status);
    }
  };

  const handleSearch = async (query) => {
    if (query.length > 2) {
      if (!isSpecialCharacter(query)) {
        await onUsersSearch(apiClient, username, query, status);
      }
    }
    if (!query) {
      await onUsersSearch(apiClient, username);
    }
    setCurrentQuery(query);
  };

  const handleClearInput = async () => {
    dispatch(relationshipActions.resetRelationship());
    setCurrentQuery("");
    await onUsersSearch(apiClient, username, "", status);
  };

  return {
    onFetchMore: handleFetchMore,
    onSearch: handleSearch,
    onClearInput: handleClearInput,
    query: currentQuery,
  };
}
