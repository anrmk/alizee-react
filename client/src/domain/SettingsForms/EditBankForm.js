import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";

import { Grid, TextField, Box, Button, MenuItem } from "@material-ui/core";

import * as yup from "yup";

import { VALUE_MAX_LENGTH } from "../../constants/form_validations";

const ACCTOUNT_NUMBER_INPUT_ID = "accountNumber";
const ROUTING_NUMBER_INPUT_ID = "routingNumber";
const TYPE_INPUT_ID = "type";

const schema = yup.object().shape({
  [ACCTOUNT_NUMBER_INPUT_ID]: yup.string().max(16, VALUE_MAX_LENGTH(16)).required(),

  [ROUTING_NUMBER_INPUT_ID]: yup.string().max(16, VALUE_MAX_LENGTH(16)).required(),

  [TYPE_INPUT_ID]: yup.number().required(),
});

function EditBankForm({
  accountNumber = "",
  routingNumber = "",
  type = 0,
  isVerified,

  isFetching,
  onSubmit,
}) {
  const { t } = useTranslation();
  const { errors, register, setValue, watch, control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      [ACCTOUNT_NUMBER_INPUT_ID]: accountNumber,
      [ROUTING_NUMBER_INPUT_ID]: routingNumber,
      [TYPE_INPUT_ID]: type || 0,
    },
  });

  return (
    <Grid container component="form" spacing={2} direction="column" onSubmit={handleSubmit(onSubmit)}>
      <Grid item>
        <Controller
          name={ACCTOUNT_NUMBER_INPUT_ID}
          control={control}
          render={({ onChange, onBlur, value }) => (
            <TextField
              id={ACCTOUNT_NUMBER_INPUT_ID}
              label={t("AccountNumber")}
              fullWidth
              variant="outlined"
              value={value}
              error={!!errors[ACCTOUNT_NUMBER_INPUT_ID]}
              helperText={errors[ACCTOUNT_NUMBER_INPUT_ID]?.message}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                maxLength: 16,
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
              value={value}
              error={!!errors[ROUTING_NUMBER_INPUT_ID]}
              helperText={errors[ROUTING_NUMBER_INPUT_ID]?.message}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                maxLength: 16,
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
              select
              value={value}
              error={!!errors[TYPE_INPUT_ID]}
              helperText={errors[TYPE_INPUT_ID]?.message}
              InputLabelProps={{
                shrink: true,
              }}
              onBlur={onBlur}
              onChange={(e) => onChange(e.target.value)}
            >
              <MenuItem value={0}>Checking</MenuItem>
              <MenuItem value={1}>Saving</MenuItem>
            </TextField>
          )}
        />
      </Grid>
      <Grid item>
        <Button fullWidth type="submit" variant="contained" color="primary" disableElevation disabled={isFetching}>
          Update
        </Button>
      </Grid>
    </Grid>
  );
}

export default EditBankForm;
