import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Box, Divider, Button, FormGroup, TextField, Typography } from "@material-ui/core";

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
    .max(MAX_VALUE, MAX_AMOUNT(MAX_VALUE))
});

function EditSubscriptionForm({
  price = 0,

  onSubmit
}) {
  const classes = useStyles();
  const { errors, setValue, control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      [SUBSCRIPTION_PRICE_INPUT_ID]: price
    },
  });

  useEffect(() => {
    setValue(SUBSCRIPTION_PRICE_INPUT_ID, price);
  }, [price]);

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <FormGroup className={classes.formElementIndent}>
        <Controller
          name={SUBSCRIPTION_PRICE_INPUT_ID}
          control={control}
          render={({ onChange, onBlur, value }) => (
            <TextField
              fullWidth
              id={SUBSCRIPTION_PRICE_INPUT_ID}
              name={SUBSCRIPTION_PRICE_INPUT_ID}
              className={classes.formElementIndent}
              variant="outlined"
              label="Price per month"
              type="number"
              value={value}
              error={!!errors[SUBSCRIPTION_PRICE_INPUT_ID]}
              helperText={!!errors[SUBSCRIPTION_PRICE_INPUT_ID] ? errors[SUBSCRIPTION_PRICE_INPUT_ID].message : SUBSCRIPTION_INPUT_HELPER}
              onBlur={onBlur}
              onChange={(e) => onChange(e.target.value)}
            />
          )}
        />
        <Button
          disableElevation
          variant="contained"
          color="primary"
          size="large"
          disabled={!!errors[SUBSCRIPTION_PRICE_INPUT_ID]}
          type="submit">
          Save
        </Button>
      </FormGroup>

      <FormGroup className={classes.formElementIndent}>
        <Typography variant="h6">Profile promotion campaign</Typography>
        <Typography variant="caption" color="textSecondary">Offer a free trial or a discounted subscription on your profile for a limited number of new or already expired subscribers</Typography>
        <Button disableElevation size="large" variant="outlined" color="primary">
          Start Campaign
        </Button>
      </FormGroup>

      <FormGroup className={classes.formElementIndent}>
        <Typography variant="h6">Following bundles</Typography>
        <Typography variant="caption" color="textSecondary">Offer several months of subscription as a discounted bundle</Typography>
        <Button disableElevation size="large" variant="outlined" color="primary">
          Create Bundle
        </Button>
      </FormGroup>
    </Box>
  );
}

export default EditSubscriptionForm;