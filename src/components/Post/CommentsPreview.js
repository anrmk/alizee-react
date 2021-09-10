import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  Link as MaterialLink,
} from "@material-ui/core";

import { PROFILE_USERNAME_ROUTE } from "../../constants/routes";
import { formatDate } from "../../helpers/functions";

import useStyles from "./styles";

export default function CommentsPreview({
  items = [],
  commentsCount,
  postId,
  onClick,
}) {
  const classes = useStyles();
  return (
    <Box className={classes.commentsPreviewRoot}>
      <List dense className={classes.commentsPreviewList}>
        {commentsCount > 3 && (
          <ListItem
            disableGutters
            className={classes.commentsPreviewItem}
            onClick={() => onClick(postId)}>
            <ListItemText
              primary={
                <MaterialLink variant="caption" color="textSecondary" href="#">
                  View all {commentsCount} comments
                </MaterialLink>
              }
            />
          </ListItem>
        )}

        {items.length > 0 &&
          items.map((item) => (
            <ListItem
              disableGutters
              key={`cp_${item.id}`}
              className={classes.commentsPreviewItem}>
              <ListItemText
                primary={
                  <Box display="flex">
                    <Link
                      className={classes.commentsPreviewUsername}
                      to={PROFILE_USERNAME_ROUTE(item.userName)}>
                      {item.name ?? `@${item.userName}`}
                    </Link>
                    <Typography
                      className={classes.commentsPreviewText}
                      variant="body2">
                      {item.text}
                    </Typography>
                  </Box>
                }
              />
            </ListItem>
          ))}
      </List>
      {items.length > 0 && (
        <Typography className={classes.commentsPreviewDate} variant="caption">
          {formatDate(items[items.length - 1].createdDate)}
        </Typography>
      )}
    </Box>
  );
}
