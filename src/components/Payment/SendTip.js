import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { formatCurrency } from "../../helpers/functions";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Card, CardHeader, CardContent, Box, TextField, InputAdornment, FormHelperText } from "@material-ui/core";

import Avatar from "../Avatar";
import { TAX_PERCENTAGE } from "../../constants/payment";

const AMOUNT_INPUT_ID = "amount";
const MESSAGE_INPUT_ID = "message";
const USER_ID = "userName";
const EMPTY_VALUE_ERROR = "It is a required filed";
const INVALID_AMOUNT_MAX_ERROR = "Maximum $200 USD";

const schema = yup.object().shape({
  [AMOUNT_INPUT_ID]: yup.number().required(EMPTY_VALUE_ERROR),
  [MESSAGE_INPUT_ID]: yup.string(),
  [USER_ID]: yup.string(),
});

function SendTip({
  formId,
  user,

  onSubmit,
}) {
  const { errors, control, register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      [AMOUNT_INPUT_ID]: "",
      [MESSAGE_INPUT_ID]: "",
      [USER_ID]: user?.userName,
    },
  });

  useEffect(() => {
    register({ name: USER_ID });
  }, []);

  return (
    <Card variant="outlined">
      <CardHeader avatar={<Avatar src={user.avatarUrl} />} title={user.name} subheader={user.userName} />
      <CardContent component="form" id={formId} onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <Controller
          name={AMOUNT_INPUT_ID}
          control={control}
          render={({ onChange, onBlur, value }) => (
            <>
              <TextField
                id={AMOUNT_INPUT_ID}
                name={AMOUNT_INPUT_ID}
                fullWidth
                variant="outlined"
                label="Amount"
                type="number"
                value={value}
                error={!!errors[AMOUNT_INPUT_ID]}
                helperText={errors[AMOUNT_INPUT_ID]?.message}
                onBlur={onBlur}
                onChange={onChange}
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  endAdornment: (
                    <InputAdornment position="end">+ {value && formatCurrency(value * TAX_PERCENTAGE)} (GTS)</InputAdornment>
                  ),
                }}
              />
              <Box display="flex" alignItems="between">
                <Box flexGrow={1}>
                  <FormHelperText>{INVALID_AMOUNT_MAX_ERROR}</FormHelperText>
                </Box>
                <Box>
                  <FormHelperText>Total: {value && formatCurrency(value * 1 + value * TAX_PERCENTAGE)}</FormHelperText>
                </Box>
              </Box>
            </>
          )}
        />

        <Controller
          name={MESSAGE_INPUT_ID}
          control={control}
          render={({ onChange, onBlur, value }) => (
            <TextField
              variant="outlined"
              fullWidth
              id={MESSAGE_INPUT_ID}
              name={MESSAGE_INPUT_ID}
              label="Message"
              type="text"
              value={value}
              error={!!errors[MESSAGE_INPUT_ID]}
              helperText={errors[MESSAGE_INPUT_ID]?.message}
              onBlur={onBlur}
              onChange={(e) => onChange(e.target.value)}
            />
          )}
        />
      </CardContent>
    </Card>
  );
}

export default SendTip;
