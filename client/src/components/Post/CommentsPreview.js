import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography
} from "@material-ui/core";

import { PROFILE_USERNAME_ROUTE } from "../../constants/routes";
import { formatDate } from "../../helpers/functions";

import useStyles from "./styles";

export default function CommentsPreview({
  items = []
}) {
  const classes = useStyles();

  return (
    <Box className={classes.commentsPreviewRoot}>
      <List dense className={classes.commentsPreviewList}>
        {items.length > 0 && items.map(item => item?.userName && item?.text && (
            <ListItem className={classes.commentsPreviewItem} disableGutters key={item.id}>
              <ListItemText
                primary={(
                  <Box display="flex">
                    <Link className={classes.commentsPreviewUsername} to={PROFILE_USERNAME_ROUTE(item.userName)}>{item.userName.toLowerCase()}</Link>
                    <Typography className={classes.commentsPreviewText} variant="body2">{item.text}</Typography>
                  </Box>
                )}
              />
            </ListItem>
          )
        )}
      </List>
      {items.length > 0 && <Typography className={classes.commentsPreviewDate} variant="caption">{formatDate(items[items.length-1].createdDate)}</Typography>}
    </Box>
  );
}
