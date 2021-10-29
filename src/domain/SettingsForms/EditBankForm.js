import React from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";

import { Grid, TextField, Button, MenuItem } from "@material-ui/core";
import * as yup from "yup";

const ACCOUNT_NUMBER_INPUT_ID = "accountNumber";
const ROUTING_NUMBER_INPUT_ID = "routingNumber";
const TYPE_INPUT_ID = "type";

const schema = yup.object().shape({
  [ACCOUNT_NUMBER_INPUT_ID]: yup.string().min(8).max(12).required(),
  [ROUTING_NUMBER_INPUT_ID]: yup.string().min(8).max(12).required(),
  [TYPE_INPUT_ID]: yup.number().required(),
});

function EditBankForm({
  accountNumber = "",
  routingNumber = "",
  type = 0,
  verifyStatus,

  isFetching,
  onSubmit,
  onReset,
}) {
  const { t } = useTranslation();
  const { errors, control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      [ACCOUNT_NUMBER_INPUT_ID]: accountNumber,
      [ROUTING_NUMBER_INPUT_ID]: routingNumber,
      [TYPE_INPUT_ID]: type || 0,
    },
  });
  const isDisabled = isFetching || verifyStatus !== 0;

  const handleResetForm = (e) => {
    e.preventDefault();
    onReset && onReset();
  };

  return (
    <Grid
      container
      component="form"
      spacing={2}
      direction="column"
      onSubmit={handleSubmit(onSubmit)}>
      <Grid item>
        <Controller
          name={ACCOUNT_NUMBER_INPUT_ID}
          control={control}
          render={({ onChange, onBlur, value }) => (
            <TextField
              id={ACCOUNT_NUMBER_INPUT_ID}
              label={t("AccountNumber")}
              fullWidth
              variant="outlined"
              disabled={isFetching || verifyStatus !== 0}
              value={value}
              error={!!errors[ACCOUNT_NUMBER_INPUT_ID]}
              helperText={errors[ACCOUNT_NUMBER_INPUT_ID]?.message}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                minLength: 8,
                maxLength: 12,
              }}
              onBlur={onBlur}
              onChange={(e) => onChange(e.target.value)}
            />
          )}
        />
      </Grid>
      <Grid item>
        <Controller
          name={ROUTING_NUMBER_INPUT_ID}
          control={control}
          render={({ onChange, onBlur, value }) => (
            <TextField
              id={ROUTING_NUMBER_INPUT_ID}
              label={t("RoutingNumber")}
              fullWidth
              variant="outlined"
              disabled={isFetching || verifyStatus !== 0}
              value={value}
              error={!!errors[ROUTING_NUMBER_INPUT_ID]}
              helperText={errors[ROUTING_NUMBER_INPUT_ID]?.message}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                minLength: 8,
                maxLength: 12,
              }}
              onBlur={onBlur}
              onChange={(e) => onChange(e.target.value)}
            />
          )}
        />
      </Grid>
      <Grid item>
        <Controller
          name={TYPE_INPUT_ID}
          control={control}
          render={({ onChange, onBlur, value }) => (
            <TextField
              id={TYPE_INPUT_ID}
              label={t("BankAccountType")}
              fullWidth
              variant="outlined"
              disabled={verifyStatus !== 0}
              select
              value={value}
              error={!!errors[TYPE_INPUT_ID]}
              helperText={errors[TYPE_INPUT_ID]?.message}
              InputLabelProps={{
                shrink: true,
              }}
              onBlur={onBlur}
              onChange={(e) => onChange(e.target.value)}>
              <MenuItem value={0}>Checking</MenuItem>
              <MenuItem value={1}>Saving</MenuItem>
            </TextField>
          )}
        />
      </Grid>
      <Grid item>
        <Grid container spacing={2} justifyContent="space-between">
          <Grid item>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disableElevation
              disabled={isDisabled}>
              Update
            </Button>
          </Grid>
          <Grid item>
            {verifyStatus !== 0 && (
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disableElevation
                onClick={handleResetForm}>
                Change
              </Button>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default EditBankForm;
