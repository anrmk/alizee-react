import React, { useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { Box, ListItem, Typography } from "@material-ui/core";
import clsx from "clsx";

import Avatar from "../../components/Avatar";
import { STORIES_ROUTE } from "../../constants/routes";
import useStyles from "./styles";

const PreviewStoryListItem = React.memo(
  ({
    userName,
    name,
    previewUrl,
    avatarUrl,
    me = false,
    storyIndex,
    isWatched,

    onClick,
  }) => {
    const classes = useStyles({
      previewUrl,
    });
    const location = useLocation();
    const additionalProps = me
      ? null
      : {
          to: {
            pathname: previewUrl ? STORIES_ROUTE(userName) : "#",
            state: { from: location.pathname, me, storyIndex },
          },
          component: Link,
        };

    const handleItemClick = useCallback(() => {
      onClick && onClick();
    }, []);

    const renderContent = () => (
      <Box className={classes.previewStoryItemUserInfo}>
        <Avatar
          className={classes.previewStoryListItemAvatar}
          borderColor="silver"
          size="small"
          src={avatarUrl}
        />
        <Typography
          className={classes.previewStoryListItemName}
          variant="caption"
          noWrap>
          {name}
        </Typography>
      </Box>
    );

    return (
      <ListItem
        button
        className={clsx(
          classes.previewStoryListItem,
          isWatched && classes.watchedStory
        )}
        {...additionalProps}
        onClick={handleItemClick}>
        {renderContent()}
      </ListItem>
    );
  }
);

export default PreviewStoryListItem;
