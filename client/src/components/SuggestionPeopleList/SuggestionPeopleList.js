import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { v4 as uuidv4 } from "uuid";
import { Box, GridList, GridListTile, Link as MUILink, Typography } from "@material-ui/core";

import RefreshIcon from "@material-ui/icons/AutorenewRounded";

import { SUGESTED_PEOPLE } from "../../constants/routes";

import ProfileCard from "../ProfileCard/ProfileCard";
import { IconButton } from "@material-ui/core";

import useStyles from "./styles";

export default function SuggestionPeopleList({
  items = [],
  limit,
  isLoading,
  onRefresh
}) {
  const classes = useStyles();
  const [localItems, setLocalItems] = useState([]);

  useEffect(() => {
    if (limit && items) {
      setLocalItems(items.slice(0, limit));
    }
  }, [items, limit]);

  return (
    <Box>
      {localItems && localItems.length > 0 && (
        <Box mb={1}>
          <Box display="flex" flexWrap="wrap" alignItems="center" justifyContent="space-between">
            <Typography variant="h6">Suggestions</Typography>
            <Box display="flex" alignItems="center">
              <MUILink variant="caption" to={SUGESTED_PEOPLE} component={Link}>
                See All
              </MUILink>
              {onRefresh && (
                <Box display="flex" justifyContent="flex-end">
                  <IconButton onClick={onRefresh}>
                    <RefreshIcon className={clsx(isLoading && classes.loadingBtn)} fontSize="small" />
                  </IconButton>
                </Box>
              )}
            </Box>
          </Box>
          <GridList cellHeight="auto" cols={1}>
            {localItems.map((item) => (
              <GridListTile key={`suggestion_${uuidv4()}`}>
                <ProfileCard {...item} />
              </GridListTile>
            ))}
          </GridList>
        </Box>
      )}
    </Box>
  )
}
