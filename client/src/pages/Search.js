import React from "react";
import { useHistory } from "react-router-dom";

import { Box, Container } from "@material-ui/core";

import { PROFILE_USERNAME_ROUTE } from "../constants/routes";

import useSearch from "../hooks/useSearch";

import GridGallery from "../domain/GridGallery";
import SearchInput from "../domain/Search";
import { SEARCH_USER_TYPE } from "../constants/search";

function Search() {
  const history = useHistory();
  const search = useSearch({ type: SEARCH_USER_TYPE });

  const onItemClick = (id) => {
    history.push(PROFILE_USERNAME_ROUTE(id));
  };

  return (
    <Container>
      <Box my={4}>
        <SearchInput onSendQuery={search.onSearch} />
        <GridGallery isUserView={true} items={search.posts} hasMore={search.hasMore} onFetchMore={search.onFetchMore} onItemClick={onItemClick} />
      </Box>
    </Container>
  );
}

export default Search;
