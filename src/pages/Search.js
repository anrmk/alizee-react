import React from "react";
import { useHistory } from "react-router-dom";

import {
  Container,
  Avatar,
  Chip,
  Grid,
  Divider,
  withWidth,
  ImageList,
  ImageListItem,
  Typography,
} from "@material-ui/core";

import { EXPLORE_ROUTE } from "../constants/routes";
import { SEARCH_USER_TYPE } from "../constants/search";

import useSearch from "../hooks/useSearch";

import SearchInput from "../components/SearchInput";
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
    const ttag = tag.replaceAll("#", "");
    if (ttag?.length > 0) {
      history.push({
        pathname: EXPLORE_ROUTE,
        search: search.currentQuery && `?tags=${ttag}`,
      });
    }
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
              />
            ))}
          </Grid>
        )}

        {search.data.length > 0 && (
          <>
            <Grid item>
              <ImageList cols={handleChangeBreakpoint()} rowHeight="auto">
                {search.data.map((item, idx) => (
                  <ImageListItem key={idx}>
                    <ProfileCard {...item} />
                  </ImageListItem>
                ))}
              </ImageList>
            </Grid>
            <Divider />
          </>
        )}
        {search.suggestionPeople?.length > 0 && (
          <Grid item>
            <Typography component="h6" color="textSecondary">
              Suggestions
            </Typography>

            <ImageList cols={handleChangeBreakpoint()} rowHeight="auto">
              {search.suggestionPeople.map((item, idx) => (
                <ImageListItem key={idx}>
                  <ProfileCard {...item} />
                </ImageListItem>
              ))}
            </ImageList>
          </Grid>
        )}
      </Grid>
    </Container>
  );
}

export default withWidth()(Search);
