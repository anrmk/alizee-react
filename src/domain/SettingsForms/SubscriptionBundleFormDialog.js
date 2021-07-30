import React from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";

import { Grid, TextField, CardContent, MenuItem } from "@material-ui/core";

import * as yup from "yup";

const DISCOUNT_INPUT_ID = "discount";
const DURATION_INPUT_ID = "duration";

const MAX_DISCOUNT_VALUE = 50;
const MIN_DISCOUNT_VALUE = 5;

const MAX_DURATION_VALUE = 12;
const MIN_DURATION_VALUE = 3;

const discountItemsValues = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50];
const durationItemsValue = [3, 6, 12];

const schema = yup.object().shape({
  [DISCOUNT_INPUT_ID]: yup
    .number()
    .required()
    .max(MAX_DISCOUNT_VALUE)
    .min(MIN_DISCOUNT_VALUE),
  [DURATION_INPUT_ID]: yup
    .number()
    .required()
    .max(MAX_DURATION_VALUE)
    .min(MIN_DURATION_VALUE),
});

function SubscriptionBundleFormDialog({
  formId,

  onSubmit,
}) {
  const { t } = useTranslation();
  const { errors, register, setValue, watch, control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      [DISCOUNT_INPUT_ID]: MIN_DISCOUNT_VALUE,
      [DURATION_INPUT_ID]: MIN_DURATION_VALUE,
    },
  });

  const handleFormSubmit = (data) => {
    onSubmit && onSubmit({ data });
  };

  return (
    <>
      <CardContent>
        <Grid
          id={formId}
          container
          component="form"
          justify="flex-end"
          spacing={1}
          onSubmit={handleSubmit(handleFormSubmit)}>
          <Grid item sm={6} xs={12}>
            <Controller
              name={DISCOUNT_INPUT_ID}
              control={control}
              render={({ onChange, onBlur, value }) => (
                <TextField
                  id={DISCOUNT_INPUT_ID}
                  label={t("Discount Percent")}
                  fullWidth
                  variant="outlined"
                  select
                  value={value}
                  error={!!errors[DISCOUNT_INPUT_ID]}
                  helperText={errors[DISCOUNT_INPUT_ID]?.message}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onBlur={onBlur}
                  onChange={(e) => onChange(e.target.value)}>
                  {discountItemsValues.map((item) => (
                    <MenuItem value={item} key={item}>
                      {item}% discount
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Grid>
          <Grid item sm={6} xs={12}>
            <Controller
              name={DURATION_INPUT_ID}
              control={control}
              render={({ onChange, onBlur, value }) => (
                <TextField
                  id={DURATION_INPUT_ID}
                  label={t("Duration")}
                  fullWidth
                  variant="outlined"
                  select
                  value={value}
                  error={!!errors[DURATION_INPUT_ID]}
                  helperText={errors[DURATION_INPUT_ID]?.message}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onBlur={onBlur}
                  onChange={(e) => onChange(e.target.value)}>
                  {durationItemsValue.map((item) => (
                    <MenuItem value={item} key={item}>
                      {item} months
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Grid>
        </Grid>
      </CardContent>
    </>
  );
}

export default SubscriptionBundleFormDialog;
