import React from "react";
import { Grid, Box, Typography } from "@material-ui/core";
import { formatDate, formatCurrency } from "../../helpers/functions";

import Avatar from "../Avatar";

import useStyles from "./styles";

function Receipt({
  userName,
  name,
  avatarUrl,
  amount,
  description,
  createdDate,
}) {
  const classes = useStyles();

  return (
    <Grid
      container
      direction="column"
      justifyContent="space-around"
      alignItems="center"
      className={classes.receipt}>
      <Grid item>
        <Avatar src={avatarUrl} size="large" />
      </Grid>
      <Grid item>
        <Typography variant="h6">{name}</Typography>
        <Typography variant="body1">Payment to {userName}</Typography>
      </Grid>
      <Box m={3} />
      <Grid item>
        <Typography variant="h3">{formatCurrency(amount)}</Typography>
        <Typography>{description}</Typography>
        <Typography>{formatDate(createdDate)}</Typography>
      </Grid>
    </Grid>
  );
}

export default Receipt;
