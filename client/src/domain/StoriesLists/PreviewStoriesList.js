import React from "react";
import { List } from "@material-ui/core";
import ScrollContainer from "react-indiana-drag-scroll";

import PreviewStoriesListItem from "./PreviewStoriesListItem";
import useStyles from "./styles";

export default function PreviewStoryList({
  items,
  userStory,

  onItemClick
}) {
  const classes = useStyles();

  const handleItemClick = (id, stories) => {
    onItemClick && onItemClick(id, stories);
  }

  return (
    <List className={classes.previewStoryList} component={ScrollContainer}>
      <PreviewStoriesListItem
        key={userStory?.id}
        id={userStory?.id}
        userId={userStory?.user.id}
        name={userStory?.user.name}
        previewUrl={userStory?.media?.url}
        avatarUrl={userStory?.user?.avatarUrl}
        onClick={(id) => handleItemClick(id, userStory.story)} />
      {items && items.map(item => (
        <PreviewStoriesListItem
          key={item?.id}
          id={item?.id}
          userId={item?.userId}
          name={item?.name}
          previewUrl={item?.previewUrl}
          avatarUrl={item?.avatarUrl}
          onClick={(id) => handleItemClick(id, item)} />
      ))}
    </List>
  )
};
