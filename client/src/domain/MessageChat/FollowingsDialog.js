import React from "react";
import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography
} from "@material-ui/core/";

import Search from "../../components/Search";
import useStyles from "./styles";

function FollowingDialog({
  open,
  data,

  onSearchChange,
  onItemClick,
  onClose
}) {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Dialog
      aria-labelledby="follower-dialog-title"
      onClose={onClose}
      open={open}>
      <DialogTitle id="follower-dialog-title">{t("ChatFollowingDialogTitle")}</DialogTitle>
      <Search placeholder={t("ChatFollowingDialogSearchInputLabel")} onChange={onSearchChange} />
      <List className={classes.followersDialogList}>
        {data && data.length ? data.map((follower) => (
          <ListItem button key={follower.id} onClick={() => onItemClick(follower.userId)}>
            <ListItemAvatar>
              <Avatar src={follower.avatarUrl} />
            </ListItemAvatar>
            <ListItemText primary={follower.username} />
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
    </Dialog>
  )
}

export default FollowingDialog;
