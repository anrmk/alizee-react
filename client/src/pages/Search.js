import React from "react";
import { useHistory } from "react-router-dom";

import { Container, Avatar, Chip, Grid } from "@material-ui/core";

import { PROFILE_USERNAME_ROUTE, EXPLORE_ROUTE } from "../constants/routes";
import { SEARCH_USER_TYPE } from "../constants/search";

import useSearch from "../hooks/useSearch";

import GridGallery from "../domain/GridGallery";
import SearchInput from "../domain/Search";

function Search() {
  const history = useHistory();
  const search = useSearch({ type: SEARCH_USER_TYPE });

  const onItemClick = (id) => {
    history.push(PROFILE_USERNAME_ROUTE(id));
  };

  const handleClick = (tag) => {
    history.push({
      pathname: EXPLORE_ROUTE,
      search: search.lastQuery && "?tags=" + tag.replaceAll("#", ""),
    });
  };

  return (
    <Container>
      <Grid container direction="column" justify="flex-start" alignItems="stretch" spacing={2}>
        <Grid item>
          <SearchInput onSendQuery={search.onSearch} />
        </Grid>
        {search.tags.length > 0 && (<Grid item>
          {search.tags.map((item) => (
            <Chip
              avatar={<Avatar>#</Avatar>}
              onClick={() => handleClick(item.name)}
              label={item.name}
              key={item.id}
              marginRight={0.5}
              color="primary"
              size="small"
            />
          ))}
        </Grid>)}
        <Grid item>
          <GridGallery
            isUserView={true}
            items={search.posts}
            hasMore={search.hasMore}
            onFetchMore={search.onFetchMore}
            onItemClick={onItemClick}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Search;
