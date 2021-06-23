import React from "react";
import { Link } from "react-router-dom";

import { SUGESTED_PEOPLE } from "../../constants/routes";

import ProfileCard from "../../components/ProfileCard/ProfileCard";

import { Box, GridList, GridListTile, Typography, Link as MUILink } from "@material-ui/core";

function FeedSuggestionUsers({ list }) {
  return (
    list &&
    list.length > 0 && (
      <Box mb={1}>
        <Box display="flex" flexWrap="wrap" alignItems="center" justifyContent="space-between">
          <Typography variant="h6">Suggestions</Typography>
          <MUILink variant="caption" to={SUGESTED_PEOPLE} component={Link}>
            See All
          </MUILink>
        </Box>
        <GridList cellHeight="auto" cols={1}>
          {list.map((item) => (
            <GridListTile key={`suggestion_${item.userName}`}>
              <ProfileCard {...item} />
            </GridListTile>
          ))}
        </GridList>
      </Box>
    )
  );
}

export default FeedSuggestionUsers;
