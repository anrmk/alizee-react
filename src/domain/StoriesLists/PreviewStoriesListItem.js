/* eslint-disable no-debugger */
import React, { useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { Box, ListItem, Typography } from "@material-ui/core";

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
            state: { from: location.pathname, me },
          },
          component: Link,
        };

    const handleItemClick = useCallback(() => {
      debugger;
      onClick && onClick(userName);
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
        className={classes.previewStoryListItem}
        {...additionalProps}
        onClick={handleItemClick}>
        {renderContent()}
      </ListItem>
    );
  }
);

export default PreviewStoryListItem;
