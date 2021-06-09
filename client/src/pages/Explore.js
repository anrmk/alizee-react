import React from "react";
import { useHistory } from "react-router-dom";

import { Box } from "@material-ui/core";

import { POST_ID_ROUTE } from "../constants/routes";

import GridGallery from "../domain/GridGallery";
import SearchInput from "../domain/Search";
import useSearch from "../hooks/useSearch";
import { SEARCH_TAG_TYPE } from "../constants/search";

function Explore() {
  const history = useHistory();
  const search = useSearch({ type: SEARCH_TAG_TYPE });

  const onItemClick = (id) => {
    history.push(POST_ID_ROUTE(id));
  };

  return (
    <Box my={4}>
      <SearchInput defaultValue={search.lastQuery} onSendQuery={search.onSearch} />
      <GridGallery items={search.posts} hasMore={search.hasMore} onFetchMore={search.onFetchMore} onItemClick={onItemClick} />
    </Box>
  );
}

export default Explore;
