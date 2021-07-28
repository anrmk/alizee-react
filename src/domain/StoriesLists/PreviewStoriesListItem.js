import React, { useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { Box, IconButton, ListItem, Typography } from "@material-ui/core";

import AddIcon from "@material-ui/icons/AddRounded";

import Avatar from "../../components/Avatar";
import { STORIES_ROUTE } from "../../constants/routes";
import useStyles from "./styles";

const PreviewStoryListItem = React.memo(
  ({
    id,
    username,
    name,
    previewUrl,
    avatarUrl,
    me = false,

    onClick,
    onCreateStoryClick,
  }) => {
    const classes = useStyles({
      previewUrl,
    });
    const location = useLocation();
    const additionalProps = me
      ? null
      : {
          to: {
            pathname: previewUrl ? STORIES_ROUTE(username) : "#",
            state: { from: location.pathname, storyId: id, me },
          },
          component: Link,
        };

    const handleItemClick = useCallback(() => {
      onClick && onClick(id);
    }, []);

    const handleCreateStoryClick = (e) => {
      onCreateStoryClick && onCreateStoryClick();
    };

    const renderContent = (withButton = false) => (
      <Box className={classes.previewStoryItemUserInfo}>
        {!withButton && (
          <>
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
          </>
        )}
        {withButton && (
          <Box borderColor="grey.500" className={classes.bottomContainer}>
            <Box className={classes.createButton}>
              <IconButton>
                <AddIcon htmlColor="white" />
              </IconButton>
            </Box>
            <Typography className={classes.createButtonText}>
              Create Story
            </Typography>
          </Box>
        )}
      </Box>
    );

    return (
      <ListItem
        button
        className={classes.previewStoryListItem}
        {...additionalProps}
        onClick={me ? handleCreateStoryClick : handleItemClick}>
        {me ? renderContent(true) : renderContent()}
      </ListItem>
    );
  }
);

export default PreviewStoryListItem;
