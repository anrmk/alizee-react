import React from "react";
import { useHistory } from "react-router-dom";

import { Container, Avatar, Chip, Grid, Divider, withWidth, GridList, GridListTile } from "@material-ui/core";

import { EXPLORE_ROUTE } from "../constants/routes";
import { SEARCH_USER_TYPE } from "../constants/search";

import useSearch from "../hooks/useSearch";

import SearchInput from "../domain/Search";
import ProfileCard from "../components/ProfileCard/ProfileCard";

function Search({ width }) {
  const history = useHistory();
  const search = useSearch({ type: SEARCH_USER_TYPE });

  const handleChangeBreakpoint = () => {
    switch (width) {
      case "xs":
        return 1;
      case "sm":
	  case "md":
        return 2;

      default:
        return 3;
    }
  };

  const handleClick = (tag) => {
    history.push({
      pathname: EXPLORE_ROUTE,
      search: search.lastQuery && "?tags=" + tag.replaceAll("#", ""),
    });
  };

  return (
    <Container>
      <Grid container direction="column" spacing={2} style={{ flexGrow: 1 }}>
        <Grid item>
          <SearchInput onSendQuery={search.onSearch} />
        </Grid>
        <Divider component="div" />

        {search.tags.length > 0 && (
          <Grid item>
            {search.tags.map((item) => (
              <Chip
                avatar={<Avatar>#</Avatar>}
                onClick={() => handleClick(item.name)}
                label={item.name}
                key={item.id}
                color="primary"
                size="small"
              />
            ))}
          </Grid>
        )}
        {(search.suggestionPeople.length > 0 || search.posts.length > 0) && (
          <Grid item>
            <GridList cols={handleChangeBreakpoint()} cellHeight="auto">
              {!search.currentQuery &&
                search.suggestionPeople.map((item) => (
                  <GridListTile key={item.id}>
                    <ProfileCard {...item} />
                  </GridListTile>
                ))}
              {search.posts.map((item) => (
                <GridListTile key={item.id}>
                  <ProfileCard {...item} />
                </GridListTile>
              ))}
            </GridList>
          </Grid>
        )}
      </Grid>
    </Container>
  );
}

export default withWidth()(Search);
