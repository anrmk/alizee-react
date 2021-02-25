import React from "react";
import {formatCurrency} from "../../helpers/functions";

import {Box, Card, CardHeader, CardContent, CardActions, IconButton, Typography, Link } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVertOutlined";

import useStyles from "./styles";

function Wallet({ deposit }) {
  const classes = useStyles();
  return (
    <Box p={1} >
      <Card className={classes.root}>
        <CardHeader
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={<Typography variant="h6">Wallet balance</Typography>}
        ></CardHeader>
        <CardContent className={classes.content}>
          <Typography variant="h4">{formatCurrency(deposit || 0)}</Typography>
          <Typography variant="subtitle2">Available</Typography>
        </CardContent>
        <CardActions>
          <Link href="#" color="secondary" >
            Transfer to your bank
          </Link>
        </CardActions>
      </Card>
    </Box>
  );
}

export default Wallet;
