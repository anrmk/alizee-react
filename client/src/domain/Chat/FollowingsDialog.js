import React from "react";
import { useTranslation } from "react-i18next";
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography
} from "@material-ui/core/";

import Search from "../../components/Search";

function FollowingDialog({
  items,

  onSearchChange,
  onItemClick,
}) {
  const { t } = useTranslation();

  return (
    <>
      <Search placeholder={t("ChatFollowingDialogSearchInputLabel")} onChange={onSearchChange} />
      <List >
        {items && items.length ? items.map((follower) => (
          <ListItem button key={follower.id} onClick={() => onItemClick(follower.userName)}>
            <ListItemAvatar>
              <Avatar src={follower.avatarUrl} />
            </ListItemAvatar>
            <ListItemText primary={follower.name} />
          </ListItem>
        )) : (
          <Typography
            variant="body1"
            color="textSecondary"
            align="center">
            Nobody found
          </Typography>
        )}
      </List>
    </>
  )
}

export default FollowingDialog;
