import React, { useContext, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";

import { Box, Chip, Container } from "@material-ui/core";

import { PROFILE_USERNAME_ROUTE, EXPLORE_BY_TAG_ROUTE } from "../constants/routes";

import * as action from "../store/actions/search";
import ApiContext from "../context/ApiContext";

import GridGallery from "../domain/GridGallery";
import SearchInput from "../domain/Search";

function Search(props) {
  const history = useHistory();
  const apiClient = useContext(ApiContext);
  const [query, setQuery] = useState("")

  const { users, getUsersByQuery, hasMore, resetSearch } = props;

  useEffect(() => {
    if (query.length) {
      (async () => {
        await getUsersByQuery(apiClient, { query });
      })();
    } else {
      resetSearch();
    }
    return () => {
      resetSearch();
    };
  }, [query]);

  const onFetchMore = (isLoading) => {
    if (!isLoading) {
      (async () => getUsersByQuery(apiClient, { query }))();
    }
  };

  const onItemClick = (id) => {
    history.push(PROFILE_USERNAME_ROUTE(id));
  };

  const onSendQuery = (query) => {
    setQuery(query);
  };

  return (
    <Container>
      <Box my={4}>
        <SearchInput onSendQuery={onSendQuery} />
        <Box mb={2} display="flex" justifyContent="center">
          <Chip label="Search by tag" variant="outlined" to={EXPLORE_BY_TAG_ROUTE(query)} component={Link} clickable />
        </Box>
        <GridGallery isUserView={true} items={users} hasMore={hasMore} onFetchMore={onFetchMore} onItemClick={onItemClick}></GridGallery>
      </Box>
    </Container>
  );
}

function mapStateToProps(state) {
  return {
    users: state.search.data,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getUsersByQuery: (api, opts) => dispatch(action.getUsersByQuery(api, opts)),
    resetSearch: () => dispatch(action.resetSearch()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
