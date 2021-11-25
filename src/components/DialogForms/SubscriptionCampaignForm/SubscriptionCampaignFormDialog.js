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
  FormControlLabel,
  Chip,
  Divider,
  FormControl,
  Typography,
} from "@material-ui/core";

import * as yup from "yup";

import { calcDiscount } from "../../../helpers/functions";
import {
  NEW_SUBSCRIBERS_RADIO_ID,
  EXPIRED_SUBSCRIBERS_RADIO_ID,
  BOTH_SUBSCRIBERS_RADIO_ID,
  DISCOUNT_MONTH_TYPE_RADIO_ID,
  FREE_TYPE_RADIO_ID,
} from "../../../constants/campaign";

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

const SUBSCRIBERS_TYPE_RADIO_GROUP_ID = "subscribersType";

const CAMPAIGN_TYPE_RADIO_GROUP_ID = "type";

const OFFER_LIMIT_INPUT_ID = "limit";
const OFFER_EXPIRATION_INPUT_ID = "expiration";

const DISCOUNT_INPUT_ID = "discount";
const DURATION_ID = "duration";
const MESSAGE_ID = "message";

const DEFAULT_OFFER_EXPIRATION_VALUE = "No expiration";
const DEFAULT_OFFER_LIMIT_VALUE = "No limits";

const MAX_DISCOUNT_VALUE = 85;
const MIN_DISCOUNT_VALUE = 5;

const MAX_DURATION_VALUE = 30;
const MIN_DURATION_VALUE = 1;

const schema = yup.object().shape({
  [SUBSCRIBERS_TYPE_RADIO_GROUP_ID]: yup
    .number()
    .required()
    .oneOf([
      NEW_SUBSCRIBERS_RADIO_ID,
      EXPIRED_SUBSCRIBERS_RADIO_ID,
      BOTH_SUBSCRIBERS_RADIO_ID,
    ]),

  [DISCOUNT_INPUT_ID]: yup
    .number()
    .max(MAX_DISCOUNT_VALUE)
    .min(MIN_DISCOUNT_VALUE),
  [DURATION_ID]: yup
    .number()
    .default(MAX_DURATION_VALUE)
    .required()
    .max(MAX_DURATION_VALUE)
    .min(MIN_DURATION_VALUE),

  [CAMPAIGN_TYPE_RADIO_GROUP_ID]: yup
    .number()
    .required()
    .oneOf([DISCOUNT_MONTH_TYPE_RADIO_ID, FREE_TYPE_RADIO_ID]),
  [OFFER_LIMIT_INPUT_ID]: yup.mixed().notRequired(),

  [OFFER_EXPIRATION_INPUT_ID]: yup.mixed().notRequired(),
  [MESSAGE_ID]: yup.string().max(256, "Must be no more than 256 characters"),
});

function SubscriptionCampaignFormDialog({
  formId,

  discount = 5,
  duration = 7,
  campaignType = 0,
  offerLimit = 10,
  offerExpiration = 7,
  description = "",
  subscribersType = 0,

  onSubmit,
}) {
  const { price } = useSelector((state) => state.settings.data);

  const [isFreeTrial, setIsFreeTrial] = useState(false);

  const { t } = useTranslation();
  const { errors, register, setValue, watch, control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      [SUBSCRIBERS_TYPE_RADIO_GROUP_ID]: subscribersType,
      [DISCOUNT_INPUT_ID]: discount,
      [DURATION_ID]: duration,
      [CAMPAIGN_TYPE_RADIO_GROUP_ID]: campaignType,
      [OFFER_LIMIT_INPUT_ID]: offerLimit,
      [OFFER_EXPIRATION_INPUT_ID]: offerExpiration,
      [MESSAGE_ID]: description,
    },
  });

  const handleFormSubmit = (data) => {
    if (data.limit === DEFAULT_OFFER_LIMIT_VALUE) {
      delete data.limit;
    }
    if (data.expiration === DEFAULT_OFFER_EXPIRATION_VALUE) {
      delete data.expiration;
    }

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
          <Grid item sm={12} xs={12}>
            <Controller
              name={SUBSCRIBERS_TYPE_RADIO_GROUP_ID}
              control={control}
              render={({ onChange, onBlur, value }) => (
                <RadioGroup
                  name={SUBSCRIBERS_TYPE_RADIO_GROUP_ID}
                  value={value}
                  onChange={onChange}
                  id={SUBSCRIBERS_TYPE_RADIO_GROUP_ID}>
                  <Grid
                    container
                    justifyContent="center"
                    direction="row"
                    spacing={2}>
                    <Grid item>
                      <FormControlLabel
                        value={NEW_SUBSCRIBERS_RADIO_ID}
                        id={NEW_SUBSCRIBERS_RADIO_ID}
                        control={<Radio style={{ display: "none" }} />}
                        label={
                          <Chip
                            color={
                              Number(value) === NEW_SUBSCRIBERS_RADIO_ID
                                ? "secondary"
                                : "default"
                            }
                            clickable
                            label="New subscribers"
                          />
                        }
                      />
                    </Grid>

                    <Grid item>
                      <FormControlLabel
                        value={EXPIRED_SUBSCRIBERS_RADIO_ID}
                        id={EXPIRED_SUBSCRIBERS_RADIO_ID}
                        control={<Radio style={{ display: "none" }} />}
                        label={
                          <Chip
                            clickable
                            label="Expired subscribers"
                            color={
                              Number(value) === EXPIRED_SUBSCRIBERS_RADIO_ID
                                ? "secondary"
                                : "default"
                            }
                          />
                        }
                      />
                    </Grid>
                    <Grid item>
                      <FormControlLabel
                        value={BOTH_SUBSCRIBERS_RADIO_ID}
                        id={BOTH_SUBSCRIBERS_RADIO_ID}
                        control={<Radio style={{ display: "none" }} />}
                        label={
                          <Chip
                            clickable
                            label="Both new and expired"
                            color={
                              Number(value) === BOTH_SUBSCRIBERS_RADIO_ID
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
                    setIsFreeTrial(
                      Number(e.target.value) === FREE_TYPE_RADIO_ID
                    );
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
                              Number(value) === DISCOUNT_MONTH_TYPE_RADIO_ID
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
                              Number(value) === FREE_TYPE_RADIO_ID
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
                name={DURATION_ID}
                control={control}
                render={({ onChange, onBlur, value }) => (
                  <>
                    <TextField
                      id={DURATION_ID}
                      label={t("Free trial duration")}
                      fullWidth
                      variant="outlined"
                      select
                      value={value}
                      error={!!errors[DURATION_ID]}
                      helperText={errors[DURATION_ID]?.message}
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

export default SubscriptionCampaignFormDialog;
