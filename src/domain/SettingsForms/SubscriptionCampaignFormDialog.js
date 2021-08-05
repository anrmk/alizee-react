import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";

import {
  Grid,
  TextField,
  CardContent,
  MenuItem,
  RadioGroup,
  Radio,
  Checkbox,
  FormControlLabel,
  Chip,
  Divider,
  FormControl,
  Typography,
} from "@material-ui/core";

import * as yup from "yup";

import { calcDiscount } from "../../helpers/functions";

const offerLimitList = [
  "No limits",
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  20,
  30,
  40,
  50,
  60,
  70,
  80,
  90,
  100,
];
const offerExpirationList = [
  "No expiration",
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23,
  24,
  25,
  26,
  27,
  28,
  29,
  30,
];

const discountList = [
  5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85,
];

const durationList = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28, 29, 30,
];

const NEW_SUBSCRIBERS_CHECKBOX_ID = "newSubscribers";
const EXPIRED_SUBSCRIBERS_CHECKBOX_ID = "expiredSubscribers";

const CAMPAIGN_TYPE_RADIO_GROUP_ID = "campaignType";
const DISCOUNT_MONTH_TYPE_RADIO_ID = "discount";
const FREE_TYPE_RADIO_ID = "free";

const OFFER_LIMIT_INPUT_ID = "subscribeCounts";
const OFFER_EXPIRATION_INPUT_ID = "finishDays";

const DISCOUNT_INPUT_ID = "subscribeDiscount";
const SUBSCRIBE_DAYS_ID = "subscribeDays";
const MESSAGE_ID = "message";

const DEFAULT_OFFER_EXPIRATION_VALUE = "No expiration";
const DEFAULT_OFFER_LIMIT_VALUE = "No limits";

const MAX_DISCOUNT_VALUE = 85;
const MIN_DISCOUNT_VALUE = 0;

const MAX_DURATION_VALUE = 30;
const MIN_DURATION_VALUE = 0;

const MAX_OFFER_LIMIT_VALUE = 100;
const MIN_OFFER_LIMIT_VALUE = 0;

const MAX_OFFER_EXPIRATION_VALUE = 30;
const MIN_OFFER_EXPIRATION_VALUE = 0;

const schema = yup.object().shape({
  [NEW_SUBSCRIBERS_CHECKBOX_ID]: yup.bool().default(false).required(),
  [EXPIRED_SUBSCRIBERS_CHECKBOX_ID]: yup.bool().default(false).required(),

  [DISCOUNT_INPUT_ID]: yup
    .number()
    .default(MIN_DISCOUNT_VALUE)
    .required()
    .max(MAX_DISCOUNT_VALUE)
    .min(MIN_DISCOUNT_VALUE),
  [SUBSCRIBE_DAYS_ID]: yup
    .number()
    .default(MAX_DURATION_VALUE)
    .required()
    .max(MAX_DURATION_VALUE)
    .min(MIN_DURATION_VALUE),

  [CAMPAIGN_TYPE_RADIO_GROUP_ID]: yup
    .string()
    .required()
    .oneOf([DISCOUNT_MONTH_TYPE_RADIO_ID, FREE_TYPE_RADIO_ID]),
  [OFFER_LIMIT_INPUT_ID]: yup
    .number()
    .transform((value, originalValue) =>
      originalValue === DEFAULT_OFFER_LIMIT_VALUE ? 0 : value
    )
    .required()
    .max(MAX_OFFER_LIMIT_VALUE)
    .min(MIN_OFFER_LIMIT_VALUE),
  [OFFER_EXPIRATION_INPUT_ID]: yup
    .number()
    .transform((value, originalValue) =>
      originalValue === DEFAULT_OFFER_EXPIRATION_VALUE ? 0 : value
    )
    .required()
    .max(MAX_OFFER_EXPIRATION_VALUE)
    .min(MIN_OFFER_EXPIRATION_VALUE),
  [MESSAGE_ID]: yup.string().max(500, "Must be no more than 500 characters"),
});

function SubscriptionBundleFormDialog({
  formId,

  discount = 5,
  duration = 7,
  campaignType = "discount",
  offerLimit = 10,
  offerExpiration = 7,
  description = "",
  newSubscribers = true,
  expiredSubscribers = false,

  onSubmit,
}) {
  const { price } = useSelector((state) => state.settings.data);

  const [isFreeTrial, setIsFreeTrial] = useState(false);

  const { t } = useTranslation();
  const { errors, register, setValue, watch, control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      [NEW_SUBSCRIBERS_CHECKBOX_ID]: newSubscribers,
      [EXPIRED_SUBSCRIBERS_CHECKBOX_ID]: expiredSubscribers,
      [DISCOUNT_INPUT_ID]: discount,
      [SUBSCRIBE_DAYS_ID]: duration,
      [CAMPAIGN_TYPE_RADIO_GROUP_ID]: campaignType,
      [OFFER_LIMIT_INPUT_ID]: offerLimit,
      [OFFER_EXPIRATION_INPUT_ID]: offerExpiration,
      [MESSAGE_ID]: description,
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
          justifyContent="center"
          spacing={2}
          onSubmit={handleSubmit(handleFormSubmit)}>
          <Grid item>
            <Controller
              name={NEW_SUBSCRIBERS_CHECKBOX_ID}
              control={control}
              render={({ onChange, onBlur, value }) => (
                <FormControlLabel
                  name={NEW_SUBSCRIBERS_CHECKBOX_ID}
                  onChange={(e) => onChange(e.target.checked)}
                  value={NEW_SUBSCRIBERS_CHECKBOX_ID}
                  id={NEW_SUBSCRIBERS_CHECKBOX_ID}
                  control={
                    <Checkbox style={{ display: "none" }} defaultChecked />
                  }
                  label={
                    <Chip
                      color={value ? "secondary" : "default"}
                      clickable
                      label="New subscribers"
                    />
                  }
                />
              )}
            />
          </Grid>

          <Grid item>
            <Controller
              name={EXPIRED_SUBSCRIBERS_CHECKBOX_ID}
              control={control}
              render={({ onChange, onBlur, value }) => (
                <FormControlLabel
                  name={EXPIRED_SUBSCRIBERS_CHECKBOX_ID}
                  onChange={(e) => onChange(e.target.checked)}
                  value={EXPIRED_SUBSCRIBERS_CHECKBOX_ID}
                  id={EXPIRED_SUBSCRIBERS_CHECKBOX_ID}
                  control={<Checkbox style={{ display: "none" }} />}
                  label={
                    <Chip
                      clickable
                      label="Expired subscribers"
                      color={value ? "secondary" : "default"}
                    />
                  }
                />
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item sm={12} xs={12}>
            <Controller
              name={CAMPAIGN_TYPE_RADIO_GROUP_ID}
              control={control}
              render={({ onChange, onBlur, value }) => (
                <RadioGroup
                  name={CAMPAIGN_TYPE_RADIO_GROUP_ID}
                  value={value}
                  onChange={(e) => {
                    setIsFreeTrial(e.target.value === FREE_TYPE_RADIO_ID);
                    onChange(e.target.value);
                  }}
                  id={CAMPAIGN_TYPE_RADIO_GROUP_ID}>
                  <Grid
                    container
                    justifyContent="center"
                    direction="row"
                    spacing={2}>
                    <Grid item>
                      <FormControlLabel
                        value={DISCOUNT_MONTH_TYPE_RADIO_ID}
                        id={DISCOUNT_MONTH_TYPE_RADIO_ID}
                        control={<Radio style={{ display: "none" }} />}
                        label={
                          <Chip
                            color={
                              value === DISCOUNT_MONTH_TYPE_RADIO_ID
                                ? "secondary"
                                : "default"
                            }
                            clickable
                            label="First month discount"
                          />
                        }
                      />
                    </Grid>

                    <Grid item>
                      <FormControlLabel
                        value={FREE_TYPE_RADIO_ID}
                        id={FREE_TYPE_RADIO_ID}
                        control={<Radio style={{ display: "none" }} />}
                        label={
                          <Chip
                            clickable
                            label="Free trial"
                            color={
                              value === FREE_TYPE_RADIO_ID
                                ? "secondary"
                                : "default"
                            }
                          />
                        }
                      />
                    </Grid>
                  </Grid>
                </RadioGroup>
              )}
            />
          </Grid>

          <Grid item sm={6} xs={12}>
            <Controller
              name={OFFER_LIMIT_INPUT_ID}
              control={control}
              render={({ onChange, onBlur, value }) => (
                <TextField
                  id={OFFER_LIMIT_INPUT_ID}
                  label={t("Offer limit")}
                  fullWidth
                  variant="outlined"
                  select
                  value={value}
                  error={!!errors[OFFER_LIMIT_INPUT_ID]}
                  helperText={errors[OFFER_LIMIT_INPUT_ID]?.message}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onBlur={onBlur}
                  onChange={(e) => onChange(e.target.value)}>
                  {offerLimitList.map((item) => (
                    <MenuItem value={item} key={item}>
                      {item} subscribers
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Grid>

          <Grid item sm={6} xs={12}>
            <Controller
              name={OFFER_EXPIRATION_INPUT_ID}
              control={control}
              render={({ onChange, onBlur, value }) => (
                <TextField
                  id={OFFER_EXPIRATION_INPUT_ID}
                  label={t("Offer expiration")}
                  fullWidth
                  variant="outlined"
                  select
                  value={value}
                  error={!!errors[OFFER_EXPIRATION_INPUT_ID]}
                  helperText={errors[OFFER_EXPIRATION_INPUT_ID]?.message}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onBlur={onBlur}
                  onChange={(e) => onChange(e.target.value)}>
                  {offerExpirationList.map((item) => (
                    <MenuItem value={item} key={item}>
                      {item} days
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Grid>

          <Grid item xs={12}>
            {isFreeTrial ? (
              <Controller
                name={SUBSCRIBE_DAYS_ID}
                control={control}
                render={({ onChange, onBlur, value }) => (
                  <>
                    <TextField
                      id={SUBSCRIBE_DAYS_ID}
                      label={t("Free trial duration")}
                      fullWidth
                      variant="outlined"
                      select
                      value={value}
                      error={!!errors[SUBSCRIBE_DAYS_ID]}
                      helperText={errors[SUBSCRIBE_DAYS_ID]?.message}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onBlur={onBlur}
                      onChange={(e) => onChange(e.target.value)}>
                      {durationList.map((item) => (
                        <MenuItem value={item} key={item}>
                          {item} days
                        </MenuItem>
                      ))}
                    </TextField>
                    <Typography color="textSecondary" variant="caption">
                      {`Promotional subscription $0.00 USD for ${value} days`}
                    </Typography>
                    <Typography
                      color="textSecondary"
                      variant="caption"
                      component="div">
                      {`User will not be subscribed for $${price} automatically, only by choice`}
                    </Typography>
                  </>
                )}
              />
            ) : (
              <Controller
                name={DISCOUNT_INPUT_ID}
                control={control}
                render={({ onChange, onBlur, value }) => (
                  <>
                    <TextField
                      id={DISCOUNT_INPUT_ID}
                      label={t("Discount percent")}
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
                      {discountList.map((item) => (
                        <MenuItem value={item} key={item}>
                          {item}% discount
                        </MenuItem>
                      ))}
                    </TextField>
                    <Typography color="textSecondary" variant="caption">
                      {`Promotional subscription $${calcDiscount(
                        price,
                        value,
                        1
                      )} USD per month`}
                    </Typography>
                  </>
                )}
              />
            )}
          </Grid>
          <Grid item xs={12}>
            <FormControl variant="filled" fullWidth>
              <Controller
                name={MESSAGE_ID}
                control={control}
                render={({ onChange, onBlur, value }) => (
                  <TextField
                    autoFocus
                    variant="filled"
                    placeholder="Message (optional)"
                    multiline
                    rows={5}
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    error={!!errors[MESSAGE_ID]}
                    helperText={errors[MESSAGE_ID]?.message}
                    inputProps={{ maxLength: 500 }}
                  />
                )}
              />
            </FormControl>
          </Grid>
        </Grid>
      </CardContent>
    </>
  );
}

export default SubscriptionBundleFormDialog;
