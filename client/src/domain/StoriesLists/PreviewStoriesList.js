import React, { useState, useEffect } from "react";
import ScrollContainer from "react-indiana-drag-scroll";
import { List } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";

import { isEmptyObject } from "../../helpers/functions";
import PreviewStoriesListItem from "./PreviewStoriesListItem";
import useStyles from "./styles";

const PreviewStoriesList = React.memo(({
  items,
  userStory,
  loading = false,

  onItemClick,
  onCreateStoryClick
}) => {
  const classes = useStyles({ loading });
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    if (loading && !flag) {
      setFlag(true);
    }
  }, [loading]);

  const renderSkeletons = () => [...Array(6)].map((_, index) => (
    <Skeleton key={`${index}-skeleton`} className={classes.previewStoryListItemSkeleton} variant="rect" animation="wave" />
  ));

  return (
    <List className={classes.previewStoryList} component={ScrollContainer}>
      {loading || !flag ? renderSkeletons() : (
        <>
          <PreviewStoriesListItem
            key={userStory?.userId}
            id={userStory?.userId}
            username={userStory?.user?.userName}
            name={userStory?.user?.name}
            previewUrl={userStory?.thumbnailUrl}
            avatarUrl={userStory?.user?.avatarUrl}
            empty={isEmptyObject(userStory)}
            onClick={isEmptyObject(userStory) ? onCreateStoryClick : onItemClick} />
          {items && items.map(item => (
            <PreviewStoriesListItem
              key={item?.userId}
              id={item?.userId}
              username={item?.user?.userName}
              name={item?.user?.name}
              previewUrl={item?.thumbnailUrl}
              avatarUrl={item?.user?.avatarUrl}
              onClick={onItemClick} />
          ))}
        </>
      )}
    </List>
  );
});

export default PreviewStoriesList;
