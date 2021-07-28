import React, { useState, useEffect } from "react";
import ScrollContainer from "react-indiana-drag-scroll";
import { List } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";

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
            <PreviewStoriesListItem
              me
              id={user?.userId}
              username={user?.userName}
              name={user?.name}
              previewUrl={user?.avatarUrl}
              onCreateStoryClick={onCreateStoryClick}
            />
            {items.length > 0 &&
              items.map((item) => (
                <PreviewStoriesListItem
                  key={item?.userId}
                  id={item?.userId}
                  username={item?.user?.userName}
                  name={item?.user?.name}
                  previewUrl={item?.thumbnailUrl}
                  avatarUrl={item?.user?.avatarUrl}
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
