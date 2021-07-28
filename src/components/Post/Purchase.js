import React from "react";

import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  Grid,
} from "@material-ui/core";
import { formatDate, formatCurrency } from "../../helpers/functions";
import Avatar from "../Avatar";

import useStyles from "./styles";

function Purchase({ purchases }) {
  const classes = useStyles();

  return (
    <List className={classes.receipt} dense>
      {purchases &&
        purchases.length &&
        purchases.map((item) => (
          <ListItem key={item.id}>
            <ListItemAvatar>
              <Avatar src={item.avatarUrl} />
            </ListItemAvatar>
            <ListItemText
              primary={
                <Grid container justify="space-between">
                  <Grid item>
                    <Typography component="span">{item.name}</Typography>
                  </Grid>
                  <Grid item>
                    <Typography component="span" variant="body2">
                      {formatDate(item.createdDate)}
                    </Typography>
                  </Grid>
                </Grid>
              }
              secondary={
                <>
                  <Typography
                    component="span"
                    color="textPrimary"
                    variant="body2">
                    {formatCurrency(item.amount)}
                  </Typography>{" "}
                  - {item.description}
                </>
              }
            />
          </ListItem>
        ))}
    </List>
  );
}

export default Purchase;
