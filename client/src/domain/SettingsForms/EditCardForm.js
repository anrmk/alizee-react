import React from "react";
import InputMask from "react-input-mask";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import { getDate } from "../../helpers/functions";
import { Card, CardHeader, CardContent, Grid, TextField, Button, Typography, Switch } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

import { VALUE_MIN_LENGTH, VALUE_MAX_LENGTH } from "../../constants/form_validations";

import CreditCards from "../../components/CreditCards";

const COUNTRY_INPUT_ID = "country";
const ADDRESS_INPUT_ID = "address";
const CITY_INPUT_ID = "city";
const STATE_INPUT_ID = "state";
const POSTAL_INPUT_ID = "postal";

const EMAIL_INPUT_ID = "email";
const NAME_INPUT_ID = "name";
const NUMBER_INPUT_ID = "number";
const EXPDATE_INPUT_ID = "expDate";
const LEGALAGE_INPUT_ID = "isLegalAgeVerified";

const CARD_MASK = [
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  "-",
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  "-",
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  "-",
  /\d/,
  /\d/,
  /\d/,
  /\d/,
];

const schema = yup.object().shape({
  [COUNTRY_INPUT_ID]: yup.string().max(16, VALUE_MAX_LENGTH(16)).required(),
  [CITY_INPUT_ID]: yup.string().required().max(32, VALUE_MAX_LENGTH(32)).required(),
  [STATE_INPUT_ID]: yup.string().required().max(16, VALUE_MAX_LENGTH(16)).required(),
  [EMAIL_INPUT_ID]: yup.string().email().required(),
  [NUMBER_INPUT_ID]: yup.string().min(16, VALUE_MIN_LENGTH(16)).max(18, VALUE_MAX_LENGTH(18)).required(),
  [NAME_INPUT_ID]: yup.string().min(2, VALUE_MIN_LENGTH(2)).max(64, VALUE_MAX_LENGTH(64)).required(),
  [EXPDATE_INPUT_ID]: yup.date().required(),
  [LEGALAGE_INPUT_ID]: yup.bool().oneOf([true], "Should be true").required(),
});

function EditCardForm({
  email,
  name,
  number,
  expDate,
  isVerified,
  isLegalAgeVerified,

  country,
  address,
  city,
  state,
  postal,

  isFetching,
  onSubmit,
}) {
  const { t } = useTranslation();
  const { errors, control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      [COUNTRY_INPUT_ID]: country || "",
      [ADDRESS_INPUT_ID]: address || "",
      [CITY_INPUT_ID]: city || "",
      [STATE_INPUT_ID]: state || "",
      [POSTAL_INPUT_ID]: postal || "",

      [EMAIL_INPUT_ID]: email || "",
      [NAME_INPUT_ID]: name || "",
      [NUMBER_INPUT_ID]: number || "",
      [EXPDATE_INPUT_ID]: getDate(expDate),
      [LEGALAGE_INPUT_ID]: !!isLegalAgeVerified,
    },
  });

  return (
    <Card>
      <CardHeader title="Your Cards" />
      <CardContent>
        <Grid container component="form" spacing={2} onSubmit={handleSubmit(onSubmit)}>
          <Grid container item xs={12} sm={6} direction="column" spacing={2}>
            <Grid item>
              <Typography variant="h6">Billing Details</Typography>
            </Grid>
            <Grid item>
              <Controller
                name={COUNTRY_INPUT_ID}
                control={control}
                render={({ onChange, onBlur, value }) => (
                  <TextField
                    fullWidth
                    id={COUNTRY_INPUT_ID}
                    variant="outlined"
                    label="Country"
                    type="text"
                    value={value}
                    error={!!errors[COUNTRY_INPUT_ID]}
                    helperText={errors[COUNTRY_INPUT_ID]?.message}
                    onBlur={onBlur}
                    onChange={(e) => onChange(e.target.value)}
                  />
                )}
              />
            </Grid>
            <Grid item>
              <Controller
                name={STATE_INPUT_ID}
                control={control}
                render={({ onChange, onBlur, value }) => (
                  <TextField
                    fullWidth
                    id={STATE_INPUT_ID}
                    variant="outlined"
                    label="State / Province"
                    type="text"
                    value={value}
                    error={!!errors[STATE_INPUT_ID]}
                    helperText={errors[STATE_INPUT_ID]?.message}
                    onBlur={onBlur}
                    onChange={(e) => onChange(e.target.value)}
                  />
                )}
              />
            </Grid>
            <Grid item>
              <Controller
                name={ADDRESS_INPUT_ID}
                control={control}
                render={({ onChange, onBlur, value }) => (
                  <TextField
                    fullWidth
                    id={ADDRESS_INPUT_ID}
                    variant="outlined"
                    label="Address"
                    type="text"
                    value={value}
                    error={!!errors[ADDRESS_INPUT_ID]}
                    onBlur={onBlur}
                    onChange={(e) => onChange(e.target.value)}
                  />
                )}
              />
            </Grid>
            <Grid item>
              <Controller
                name={CITY_INPUT_ID}
                control={control}
                render={({ onChange, onBlur, value }) => (
                  <TextField
                    fullWidth
                    id={CITY_INPUT_ID}
                    variant="outlined"
                    label="City"
                    type="text"
                    value={value}
                    error={!!errors[CITY_INPUT_ID]}
                    helperText={errors[CITY_INPUT_ID]?.message}
                    onBlur={onBlur}
                    onChange={(e) => onChange(e.target.value)}
                  />
                )}
              />
            </Grid>
            <Grid item>
              <Controller
                name={POSTAL_INPUT_ID}
                control={control}
                render={({ onChange, onBlur, value }) => (
                  <TextField
                    fullWidth
                    id={POSTAL_INPUT_ID}
                    variant="outlined"
                    label="ZIP / Postal Code"
                    type="text"
                    value={value}
                    error={!!errors[POSTAL_INPUT_ID]}
                    onBlur={onBlur}
                    onChange={(e) => onChange(e.target.value)}
                  />
                )}
              />
            </Grid>
          </Grid>

          <Grid container item xs={12} sm={6} direction="column" spacing={2}>
            <Grid item>
              <Typography variant="h6">Card Details</Typography>
            </Grid>
            <Grid item>
              <Controller
                name={EMAIL_INPUT_ID}
                control={control}
                render={({ onChange, onBlur, value }) => (
                  <TextField
                    fullWidth
                    id={EMAIL_INPUT_ID}
                    name={EMAIL_INPUT_ID}
                    variant="outlined"
                    label="Email"
                    type="text"
                    value={value}
                    error={!!errors[EMAIL_INPUT_ID]}
                    helperText={errors[EMAIL_INPUT_ID]?.message}
                    onBlur={onBlur}
                    onChange={(e) => onChange(e.target.value)}
                  />
                )}
              />
            </Grid>
            <Grid item>
              <Controller
                name={NAME_INPUT_ID}
                control={control}
                render={({ onChange, onBlur, value }) => (
                  <TextField
                    id={NAME_INPUT_ID}
                    label={t("NameOnCard")}
                    fullWidth
                    variant="outlined"
                    value={value}
                    error={!!errors[NAME_INPUT_ID]}
                    helperText={errors[NAME_INPUT_ID]?.message}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      maxLength: 64,
                    }}
                    onBlur={onBlur}
                    onChange={(e) => onChange(e.target.value)}
                  />
                )}
              />
            </Grid>
            <Grid item>
              <Controller
                name={NUMBER_INPUT_ID}
                control={control}
                render={({ onChange, onBlur, value }) => (
                  <InputMask
                    mask={CARD_MASK}
                    disabled={false}
                    value={value || ""}
                    onBlur={onBlur}
                    onChange={(e) => onChange(e.target.value.replace(/\D+/g, ""))}
                  >
                    <TextField
                      id={NUMBER_INPUT_ID}
                      name={NUMBER_INPUT_ID}
                      label={t("CardNumber")}
                      fullWidth
                      variant="outlined"
                      type="text"
                      value={value}
                      error={!!errors[NUMBER_INPUT_ID]}
                      helperText={errors[NUMBER_INPUT_ID]?.message}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </InputMask>
                )}
              />
            </Grid>
            <Grid item>
              <Controller
                name={EXPDATE_INPUT_ID}
                control={control}
                render={({ onChange, onBlur, value }) => (
                  <TextField
                    id={EXPDATE_INPUT_ID}
                    label={t("ExpDate")}
                    fullWidth
                    variant="outlined"
                    type="date"
                    value={value}
                    error={!!errors[EXPDATE_INPUT_ID]}
                    helperText={errors[EXPDATE_INPUT_ID]?.message}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onBlur={onBlur}
                    onChange={(e) => onChange(e.target.value)}
                  />
                )}
              />
            </Grid>
            <Grid item>
              <Controller
                name={LEGALAGE_INPUT_ID}
                control={control}
                render={({ onChange, onBlur, value }) => (
                  <>
                    <Switch
                      checked={!!value}
                      id={LEGALAGE_INPUT_ID}
                      name={LEGALAGE_INPUT_ID}
                      onBlur={onBlur}
                      onChange={(e) => onChange(e.target.checked)}
                    />
                    <Typography component="span">
                      Tick here to confirm that you are at least 18 years old and the age of majority in your place of
                      residence
                    </Typography>
                    {!!errors[LEGALAGE_INPUT_ID] && (
                      <Typography variant="caption" color="error" display="block">
                        {errors[LEGALAGE_INPUT_ID]?.message}
                      </Typography>
                    )}
                  </>
                )}
              />
            </Grid>
          </Grid>

          <Button fullWidth type="submit" variant="contained" color="primary" disableElevation disabled={isFetching}>
            Update
          </Button>
        </Grid>
      </CardContent>
      <CardContent>
        <Alert variant="outlined" severity="success">
          Themembers will make a one-time charge of $0.10 when adding your payment card. The charges on your credit card
          statement will appear as "Themembers".
        </Alert>
        <CreditCards />
      </CardContent>
    </Card>
  );
}

export default EditCardForm;
