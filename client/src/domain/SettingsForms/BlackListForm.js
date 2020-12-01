import React from "react";
import { useTranslation } from "react-i18next";
import {Box, Divider, List, ListItem, ListItemAvatar ,ListItemSecondaryAction, ListItemText } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";

import useStyles from "./styles";

function BlackListForm({
  items,

  onDelete
}) {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <Box className={classes.blackListRoot}>
      <Typography variant="h6" className={classes.blackListTitle}>
      {t("BlackListTitle")}
      </Typography>
      <List dense={true}>
        {items &&
          items.map((item) => (
            <>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar src={item.avatarUrl} />
                </ListItemAvatar>
                <ListItemText
                  primary={item.username}
                  secondary={item.createdDate}
                />
                <ListItemSecondaryAction>
                  <IconButton edge="end"
                    aria-label="delete"
                    onClick={() => onDelete(item.id)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
              <Divider variant="inset" component="li" />
            </>
          ))}
      </List>
    </Box>
  );
}

export default BlackListForm;
