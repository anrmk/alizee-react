import React, { useState, useEffect } from "react";
import ScrollContainer from "react-indiana-drag-scroll";
import { List } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";

import CreateStoryItem from "./CreateStoryItem";
import PreviewStoriesListItem from "./PreviewStoriesListItem";
import useStyles from "./styles";

const PreviewStoriesList = React.memo(
  ({
    items,
    user,
    loading = false,

    onItemClick,
    onCreateStoryClick,
  }) => {
    const classes = useStyles({ loading });
    const [loadingFlag, setLoadingFlag] = useState(false);

    useEffect(() => {
      if (loading && !loadingFlag) {
        setLoadingFlag(true);
      }
    }, [loading]);

    const renderSkeletons = () =>
      [...Array(8)].map((_, index) => (
        <Skeleton
          key={`${index}-skeleton`}
          className={classes.previewStoryListItemSkeleton}
          variant="rect"
          animation="wave"
        />
      ));

    return (
      <List
        className={classes.previewStoryList}
        component={ScrollContainer}
        disablePadding>
        {loading || !loadingFlag ? (
          renderSkeletons()
        ) : (
          <>
            <CreateStoryItem
              previewUrl={user?.avatarUrl}
              onClick={onCreateStoryClick}
            />
            {items.length > 0 &&
              items.map((item) => (
                <PreviewStoriesListItem
                  key={`story_${item?.userName}`}
                  userName={item.userName}
                  name={item.name}
                  previewUrl={item.url}
                  avatarUrl={item.avatarUrl}
                  onClick={onItemClick}
                />
              ))}
          </>
        )}
      </List>
    );
  }
);

export default PreviewStoriesList;
