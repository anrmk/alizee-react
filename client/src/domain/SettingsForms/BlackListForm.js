import React from "react";
import { useTranslation } from "react-i18next";
import { Box, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Typography } from "@material-ui/core";
import {formatDate} from "../../helpers/functions"

import { Avatar, Button } from "@material-ui/core";

import useStyles from "./styles";

function BlackListForm({
  items,

  onDelete,
}) {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <Box>
      <Typography>{t("SettingFormsBlackListFormTitle")}</Typography>
      <Typography>
        They won't be able to find your profile, posts or story. System won't let them know you blocked them.
      </Typography>

      <List dense={true}>
        {items &&
          items.map((item) => (
            <ListItem alignItems="flex-start" key={`blf_${item.userName}`}>
              <ListItemAvatar>
                <Avatar src={item.avatarUrl} />
              </ListItemAvatar>
              <ListItemText primary={item.name} secondary={`${item.userName} - ${formatDate(item.createdDate)}`} />
              <ListItemSecondaryAction>
                <Button onClick={() => onDelete(item.userName)}>Unblock</Button>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
      </List>
    </Box>
  );
}

export default BlackListForm;
