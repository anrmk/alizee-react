import React from "react";
import { List, CircularProgress } from "@material-ui/core";
import ScrollContainer from "react-indiana-drag-scroll";

import PreviewStoriesListItem from "./PreviewStoriesListItem";
import useStyles from "./styles";
import { isEmptyObject } from "../../helpers/functions";

export default function PreviewStoryList({
  items,
  userStory,
  loading = false,

  onItemClick
}) {
  const classes = useStyles({ loading });

  return (
    <List className={classes.previewStoryList} component={ScrollContainer}>
      {loading ? <CircularProgress className={classes.previewStoryListProgress} />
       : (
         <>
          {!isEmptyObject(userStory) && (
            <PreviewStoriesListItem
              key={userStory?.userId}
              id={userStory?.userId}
              username={userStory?.user?.userName}
              name={userStory?.user?.name}
              previewUrl={userStory?.thumbnailUrl}
              avatarUrl={userStory?.user?.avatarUrl}
              onClick={onItemClick} />
          )}
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
  )
};
