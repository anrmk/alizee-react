import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { formatCurrency } from "../../helpers/functions";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import {
  Box,
  TextField,
  FilledInput,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Input,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
  FormControl,
  FormHelperText,
} from "@material-ui/core";
import Avatar from "../Avatar";

const AMOUNT_INPUT_ID = "amount";
const MESSAGE_INPUT_ID = "message";
const EMPTY_VALUE_ERROR = "It is a required filed";
const INVALID_AMOUNT_MAX_ERROR = "Maximum $200 USD";

const schema = yup.object().shape({
  [AMOUNT_INPUT_ID]: yup.number().required(EMPTY_VALUE_ERROR),
  [MESSAGE_INPUT_ID]: yup.string(),
});

function SendTip(props) {
  const { id, user } = props;
  const { onSubmit } = props;

  const { errors, control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      [AMOUNT_INPUT_ID]: "",
      [MESSAGE_INPUT_ID]: "",
    },
  });

  return (
    <Grid container direction="column" >
      <Grid item>
        <Box display="flex" flexWrap="nowrap" alignItems="center">
          <Box p={1}>
            <Avatar aria-label={user.userName} src={user.avatarUrl} size="large" />
          </Box>
          <Box p={1}>
            <Typography>{user.name}</Typography>
            <Typography>{user.userName}</Typography>
          </Box>
        </Box>
      </Grid>
      <Grid item>
        <Box component="form" id={id} onSubmit={handleSubmit(onSubmit)} autoComplete="off">
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
                onChange={(e) => onChange(e.target.value)}
                // InputProps={{
                //   max: 200,
                //   min: 5,
                //   minLength: 3,
                // }}
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  endAdornment: <InputAdornment position="end">+ {value && formatCurrency(value * 0.07)} (GTS)</InputAdornment>
                }}

                // inputProps={{max: 200, maxLength: 3}}
              />
              <Box display="flex" alignItems="between">
                <Box flexGrow={1}>
                  <FormHelperText>{INVALID_AMOUNT_MAX_ERROR}</FormHelperText>
                </Box>
                <Box>
                  <FormHelperText>Total: {value && formatCurrency(value*1 + value*0.07)}</FormHelperText>
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
        </Box>
      </Grid>
    </Grid>
  );
}

export default SendTip;
