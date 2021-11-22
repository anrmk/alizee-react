import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Box,
  Button,
  FormControlLabel,
  Checkbox,
  Card,
  CardContent,
  CardHeader,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import useStyles from "./styles";

const WITHDRAW_FUNDS_INPUT_ID = "withdrawFunds";
const WITHDRAW_AUTOMATICALLY_INPUT_ID = "withdrawAutomatically";

const schema = yup.object().shape({
  [WITHDRAW_FUNDS_INPUT_ID]: yup.number().required().min(20).max(100000),
  [WITHDRAW_AUTOMATICALLY_INPUT_ID]: yup.boolean().notRequired(),
});

export default function WithdrawFundsForm({
  name = "",
  accountNumber = "",
  deposit,
  verifyStatus,
  isFetching,
  className,
  onSubmit,
}) {
  const classes = useStyles();
  const [isUpdate, setIsUpdate] = useState(false);
  const { errors, control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      [WITHDRAW_FUNDS_INPUT_ID]: 20,
      [WITHDRAW_AUTOMATICALLY_INPUT_ID]: false,
    },
  });

  const isVerificationPending = verifyStatus === 1;

  return (
    <Grid container className={className} spacing={2}>
      <Grid item sm={12} lg={4}>
        <Typography variant="subtitle1">Selected Payout System</Typography>
        <Card className={classes.withdrawFundsCardRoot}>
          <CardHeader
            className={classes.withdrawFundsCardHeader}
            title={
              <Typography
                className={classes.withdrawFundsCardSubTitle}
                variant="subtitle1">
                Bank Transfer (ACH)
              </Typography>
            }
          />
          <CardContent>
            <Box mb={1}>
              <Typography
                className={classes.withdrawFundsCardSubTitle}
                variant="subtitle2">
                Minimum Withdrawal
              </Typography>
              <Typography variant="button">$20.00</Typography>
            </Box>
            <Box>
              <Typography
                className={classes.withdrawFundsCardSubTitle}
                variant="subtitle2">
                Processing Time
              </Typography>
              <Typography variant="button">2-3 business days</Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <Grid item sm={12} lg={8}>
        <Box mb={2}>
          <Alert icon={false} severity="info">
            <Typography variant="body2">
              To edit W9 form <Link to="sf">Click here</Link>
            </Typography>
          </Alert>
        </Box>

        <Box mb={2}>
          <Typography variant="subtitle1">Your Bank Account Data</Typography>
          <Alert
            className={classes.withdrawFundsAlertRoot}
            icon={false}
            severity="info">
            <Box
              display="flex"
              flexWrap="wrap"
              alignItems="center"
              justifyContent="space-between">
              <Box>
                <Typography variant="body2">
                  {isVerificationPending
                    ? "Bank is verifing your bank account"
                    : `Bank Connected(${accountNumber})`}
                </Typography>
                {!isVerificationPending && (
                  <Typography variant="body2">{name}</Typography>
                )}
              </Box>
            </Box>
          </Alert>
        </Box>

        {!isUpdate && !isVerificationPending && (
          <>
            <Grid
              container
              alignItems="center"
              spacing={2}
              component="form"
              onSubmit={handleSubmit(onSubmit)}>
              <Grid item xs={8}>
                <Controller
                  name={WITHDRAW_FUNDS_INPUT_ID}
                  control={control}
                  render={({ onChange, onBlur, value }) => (
                    <TextField
                      fullWidth
                      variant="outlined"
                      type="number"
                      size="small"
                      label="Amount"
                      id={WITHDRAW_FUNDS_INPUT_ID}
                      disabled={deposit < 20}
                      value={value}
                      error={!!errors[WITHDRAW_FUNDS_INPUT_ID]}
                      endadornment={
                        <InputAdornment position="start">$</InputAdornment>
                      }
                      onBlur={onBlur}
                      onChange={(e) => onChange(e.target.value)}
                      InputProps={{
                        inputProps: {
                          min: 5,
                          max: 20,
                        },
                      }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={4}>
                <Box display="flex">
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={deposit < 20}
                    disableElevation>
                    Withdraw
                  </Button>
                </Box>
              </Grid>
            </Grid>
            <Controller
              name={WITHDRAW_AUTOMATICALLY_INPUT_ID}
              control={control}
              render={({ onChange, onBlur, value }) => (
                <FormControlLabel
                  label="Auto withdraw"
                  control={
                    <Checkbox
                      id={WITHDRAW_AUTOMATICALLY_INPUT_ID}
                      disabled={deposit < 20}
                      onBlur={onBlur}
                      onChange={(e) => onChange(e.target.checked)}
                      checked={value}
                    />
                  }
                />
              )}
            />
          </>
        )}
      </Grid>
    </Grid>
  );
}
