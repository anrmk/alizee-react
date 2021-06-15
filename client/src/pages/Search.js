import React from "react";
import { useHistory } from "react-router-dom";

import { Box, Container, Avatar, Chip } from "@material-ui/core";

import { PROFILE_USERNAME_ROUTE, EXPLORE_ROUTE } from "../constants/routes";

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

  const handleClick = () => {
    history.push({
      pathname: EXPLORE_ROUTE,
      search: search.lastQuery && "?tags=" + search.lastQuery.replaceAll("#", ""),
    });
  };

  return (
    <Container>
      <Box my={4}>
        <SearchInput onSendQuery={search.onSearch} />
        <Box marginBottom={3}>
          {search.tags.map((item) => (
            <Chip
              avatar={<Avatar>#</Avatar>}
              onClick={handleClick}
              label={item.name}
              key={item.id}
              component={Box}
              marginRight={0.5}
            />
          ))}
        </Box>
        <GridGallery
          isUserView={true}
          items={search.posts}
          hasMore={search.hasMore}
          onFetchMore={search.onFetchMore}
          onItemClick={onItemClick}
        />
      </Box>
    </Container>
  );
}

export default Search;
