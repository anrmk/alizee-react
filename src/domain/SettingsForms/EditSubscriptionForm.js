import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Grid,
  Divider,
  Button,
  FormGroup,
  TextField,
  Typography,
  Card,
  CardHeader,
  CardContent,
} from "@material-ui/core";

import { EMPTY_VALUE_ERROR, MIN_AMOUNT, MAX_AMOUNT } from "../../constants/form_validations";

import useStyles from "./styles";

const SUBSCRIPTION_PRICE_INPUT_ID = "price";
const MIN_VALUE = 0;
const MAX_VALUE = 100;
const SUBSCRIPTION_INPUT_HELPER = `Maximum ${MAX_VALUE}$ USD or free`;

const schema = yup.object().shape({
  [SUBSCRIPTION_PRICE_INPUT_ID]: yup
    .number()
    .required(EMPTY_VALUE_ERROR)
    .min(MIN_VALUE, MIN_AMOUNT(MIN_VALUE))
    .max(MAX_VALUE, MAX_AMOUNT(MAX_VALUE)),
});

function EditSubscriptionForm({
  price = 0,

  onSubmit,
}) {
  const classes = useStyles();
  const { errors, setValue, control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      [SUBSCRIPTION_PRICE_INPUT_ID]: price,
    },
  });

  useEffect(() => {
    setValue(SUBSCRIPTION_PRICE_INPUT_ID, price);
  }, [price]);

  return (
    <Card>
      <CardHeader title="Subscription" />
      <Divider />
      <CardContent>
        <Grid container component="form" direction="column" spacing={2} onSubmit={handleSubmit(onSubmit)}>
          <Grid item>
            <Typography variant="h6">Subscription price and bundles</Typography>
          </Grid>

          <Grid item>
            <Controller
              name={SUBSCRIPTION_PRICE_INPUT_ID}
              control={control}
              render={({ onChange, onBlur, value }) => (
                <TextField
                  fullWidth
                  id={SUBSCRIPTION_PRICE_INPUT_ID}
                  name={SUBSCRIPTION_PRICE_INPUT_ID}
                  variant="outlined"
                  label="Price per month"
                  type="number"
                  value={value}
                  error={!!errors[SUBSCRIPTION_PRICE_INPUT_ID]}
                  helperText={
                    !!errors[SUBSCRIPTION_PRICE_INPUT_ID]
                      ? errors[SUBSCRIPTION_PRICE_INPUT_ID].message
                      : SUBSCRIPTION_INPUT_HELPER
                  }
                  onBlur={onBlur}
                  onChange={(e) => onChange(e.target.value)}
                />
              )}
            />
          </Grid>

          <Grid item>
            <Button
              disableElevation
              variant="contained"
              color="primary"
              disabled={!!errors[SUBSCRIPTION_PRICE_INPUT_ID]}
              type="submit"
            >
              Update
            </Button>
          </Grid>
        </Grid>
      </CardContent>

      <Divider />

      <CardContent>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <Typography variant="h6">Profile promotion campaign</Typography>
            <Typography variant="body2">
              Offer a free trial or a discounted subscription on your profile for a limited number of new or already
              expired subscribers
            </Typography>
          </Grid>
          <Grid item>
            <Button disableElevation variant="outlined" color="primary">
              Start Campaign
            </Button>
          </Grid>
        </Grid>
      </CardContent>

      <Divider />

      <CardContent>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <Typography variant="h6">Following bundles</Typography>
            <Typography variant="caption" color="textSecondary">
              Offer several months of subscription as a discounted bundle
            </Typography>
          </Grid>

          <Grid item>
            <Button disableElevation variant="outlined" color="primary">
              Create Bundle
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default EditSubscriptionForm;
