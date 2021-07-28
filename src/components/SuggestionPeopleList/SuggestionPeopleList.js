import React, { memo, useEffect, useState } from "react";
import isEqual from "react-fast-compare";
import { Link } from "react-router-dom";
import clsx from "clsx";
import {
  Box,
  Link as MUILink,
  Typography,
  IconButton,
} from "@material-ui/core";

import RefreshIcon from "@material-ui/icons/AutorenewRounded";

import { SUGESTED_PEOPLE } from "../../constants/routes";
import SuggestionPeopleItem from "./SuggestionPeopleItem";

import useStyles from "./styles";

function SuggestionPeopleList({
  items = [],
  limit,
  isLoading,
  withTopbar,
  onRefresh,
}) {
  const classes = useStyles();
  const [localItems, setLocalItems] = useState([]);

  useEffect(() => {
    if (limit && items) {
      setLocalItems(items.slice(0, limit));
    }
  }, [items, limit]);

  return (
    <Box width="100%">
      {localItems && localItems.length > 0 && (
        <Box mb={1}>
          {withTopbar && (
            <Box
              display="flex"
              flexWrap="wrap"
              alignItems="center"
              justifyContent="space-between">
              <Typography variant="h6">Suggestions</Typography>
              <Box display="flex" alignItems="center">
                <MUILink
                  variant="caption"
                  to={SUGESTED_PEOPLE}
                  component={Link}>
                  See All
                </MUILink>
                {onRefresh && (
                  <Box display="flex" justifyContent="flex-end">
                    <IconButton onClick={onRefresh}>
                      <RefreshIcon
                        className={clsx(isLoading && classes.loadingBtn)}
                        fontSize="small"
                      />
                    </IconButton>
                  </Box>
                )}
              </Box>
            </Box>
          )}
          <Box className={classes.rootList}>
            {localItems.map((item) => (
              <SuggestionPeopleItem
                key={`suggestion-${item.userName}`}
                {...item}
              />
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default memo(SuggestionPeopleList, isEqual);
