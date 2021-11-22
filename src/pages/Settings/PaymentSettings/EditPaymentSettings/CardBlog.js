import React from "react";

import { Grid, Typography, Button } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

import CreditCards from "../../../../components/CreditCards";
import CardItem from "./CardItem";

const dateOptions = {
  year: "2-digit",
  month: "2-digit",
};

function CardBlog({
  data,

  onClick,
  onDialogOpen,
  onDelete,
  onVerifyClick,
}) {
  return (
    <Grid
      container
      spacing={2}
      justifyContent="space-between"
      alignItems="center">
      <Grid item xs={6}>
        <Typography variant="h6">Cards</Typography>
      </Grid>
      <Grid item>
        <Button
          fullWidth
          disableElevation
          variant="contained"
          color="primary"
          onClick={onDialogOpen}>
          Add card
        </Button>
      </Grid>
      {data?.length > 0 ? (
        <Grid item xs={12}>
          <Typography variant="body2">
            Choose your main card to pay for purchases or top up your wallet.
          </Typography>
        </Grid>
      ) : (
        <>
          <Grid item xs={12}>
            <Alert icon={false} severity="error">
              Please add a new card to subscribe to other users or recharge your
              wallet.
            </Alert>
          </Grid>
        </>
      )}

      {data?.length > 0 &&
        data.map((item) => (
          <Grid item xs={12} sm={6} md={10} lg={6} key={item.id}>
            <CardItem
              onClick={onClick}
              {...item}
              onDelete={onDelete}
              onVerifyClick={onVerifyClick}
              dateOptions={dateOptions}
            />
          </Grid>
        ))}

      <Grid item xs={12}>
        <>
          <Typography
            variant="subtitle2"
            gutterBottom
            component="p"
            color="textSecondary">
            We are fully compliant with Payment Card Industry Data Security
            Standards.
          </Typography>
          <Alert icon={false} severity="info">
            The charges on your credit card statement will appear as The Members
          </Alert>
        </>
      </Grid>
      <Grid item xs={12}>
        <CreditCards />
      </Grid>
    </Grid>
  );
}

export default CardBlog;
