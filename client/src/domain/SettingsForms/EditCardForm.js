import React, { useEffect } from "react";
import InputMask from "react-input-mask";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";

import { getDate } from "../../helpers/functions";

import { Grid, TextField, Box, Button } from "@material-ui/core";

import * as yup from "yup";

import { EMPTY_VALUE_ERROR, VALUE_MIN_LENGTH, VALUE_MAX_LENGTH } from "../../constants/form_validations";
import { CARD_REGEX } from "../../constants/regexs";

const NAME_INPUT_ID = "name";
const NUMBER_INPUT_ID = "number";
const EXPDATE_INPUT_ID = "expDate";

const schema = yup.object().shape({
  [NUMBER_INPUT_ID]: yup
    .string()
    .required(EMPTY_VALUE_ERROR)
    .min(16, VALUE_MIN_LENGTH(16))
    .max(19, VALUE_MAX_LENGTH(16)),

  [NAME_INPUT_ID]: yup.string().required(EMPTY_VALUE_ERROR).min(2, VALUE_MIN_LENGTH(2)).max(49, VALUE_MAX_LENGTH(49)),
  [EXPDATE_INPUT_ID]: yup.date().required(EMPTY_VALUE_ERROR),
});

function EditCardForm({
  name = "",
  number,
  expDate,
  isVerified,

  isFetching,
  onSubmit,
}) {
  const { t } = useTranslation();
  const { errors, register, setValue, watch, control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      [NAME_INPUT_ID]: name,
      [NUMBER_INPUT_ID]: number,
      [EXPDATE_INPUT_ID]: getDate(expDate),
    },
  });

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Box mb={3}>
        <Grid container spacing={2}>
          <Grid item sm={12}>
            <Controller
              name={NUMBER_INPUT_ID}
              control={control}
              render={({ onChange, onBlur, value }) => (
                <InputMask
                  mask={[
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
                  ]}
                  disabled={false}
                  value={value || ""}
                  onBlur={onBlur}
                  onChange={(e) => onChange(e.target.value.replace(/\D+/g, ""))}
                >
                  <TextField
                    id={NUMBER_INPUT_ID}
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
          <Grid item sm={12}>
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
                    maxLength: 49,
                  }}
                  onBlur={onBlur}
                  onChange={(e) => onChange(e.target.value)}
                />
              )}
            />
          </Grid>
          <Grid item sm={12}>
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
        </Grid>
      </Box>

      {!isVerified && (
        <Button type="submit" disableElevation disabled={isFetching}>
          Verify
        </Button>
      )}

      <Button type="submit" variant="contained" color="primary" disableElevation disabled={isFetching}>
        Update
      </Button>
    </Box>
  );
}

export default EditCardForm;