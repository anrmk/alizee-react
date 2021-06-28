import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Box, List, ListItem, ListItemText, ListItemAvatar, Avatar, Typography } from "@material-ui/core/";

import Search from "../Search";

function NewChatDialog({
  items,

  onSearchChange,
  onItemClick,
  resetQuery,
}) {
  const { t } = useTranslation();

  useEffect(() => {
    return () => {
      resetQuery();
    };
  }, []);

  return (
    <Box display="flex" flexDirection="column">
      <Search placeholder={t("ChatFollowingDialogSearchInputLabel")} onSendQuery={onSearchChange} />
      <List>
        {items && items.length ? (
          items.map((follower) => (
            <ListItem button key={follower.id} onClick={() => onItemClick(follower.userName)}>
              <ListItemAvatar>
                <Avatar src={follower.avatarUrl} />
              </ListItemAvatar>
              <ListItemText primary={follower.name} />
            </ListItem>
          ))
        ) : (
          <Typography variant="body1" color="textSecondary" align="center">
            Nobody found
          </Typography>
        )}
      </List>
    </Box>
  );
}

export default NewChatDialog;
