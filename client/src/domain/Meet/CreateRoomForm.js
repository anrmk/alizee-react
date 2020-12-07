import React from "react";
import { useTranslation } from "react-i18next";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Select, Button, FormControl, FormGroup, FormHelperText, Grid, MenuItem, Typography } from "@material-ui/core";

import CustomInput from "../../components/CustomInput";
import useStyles from "./styles"

const TITLE_ID = "title";
const DESCRIPTION_ID = "description";
const ROOM_TYPE_ID = "roomType";
const TICKET_PRICE_ID = "ticketPrice";

const VALUE_MIN_LENGTH_TICKET_PRICE = 0;
const VALUE_MAX_LENGTH_TITLE = 50;
const VALUE_MAX_LENGTH_DESCRIPTION = 150;

const EMPTY_VALUE_ERROR = "It is a required filed";
const VALUE_MIN_LENGTH_ERROR = (min) => `Must be at least ${min} characters`;
const VALUE_MAX_LENGTH_ERROR = (max) => `Must be at most ${max} characters`;

const schema = yup.object().shape({
  [TITLE_ID]: yup
    .string()
    .required(EMPTY_VALUE_ERROR)
    .max(VALUE_MAX_LENGTH_TITLE, VALUE_MAX_LENGTH_ERROR(VALUE_MAX_LENGTH_TITLE)),
  [DESCRIPTION_ID]: yup
    .string()
    .required(EMPTY_VALUE_ERROR)
    .max(VALUE_MAX_LENGTH_DESCRIPTION, VALUE_MAX_LENGTH_ERROR(VALUE_MAX_LENGTH_DESCRIPTION)),
  [ROOM_TYPE_ID]: yup
    .number()
    .required(EMPTY_VALUE_ERROR),
  [TICKET_PRICE_ID]: yup
    .number()
    .min(VALUE_MIN_LENGTH_TICKET_PRICE, VALUE_MIN_LENGTH_ERROR(VALUE_MIN_LENGTH_TICKET_PRICE))
    .required(EMPTY_VALUE_ERROR),
});

function CreateRoomForm({
  roomId,
  userVideo,

  onSubmit
}) {
  const { t } = useTranslation();
  const classes = useStyles();

  const { errors, control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      ticketPrice: 0
    }
  });

  return (
    <Grid container direction="row" spacing={8}>

      <Grid item className={classes.createRoomItem} xs={12} md={8}>
        <video className={classes.createRoomItemVideo}
          ref={userVideo}
          muted
          autoPlay
          playsInline
          allowFullScreen
          controls
        />
      </Grid>

      <Grid item className={classes.createRoomItem} xs={12} md={4}>
        <Typography variant="h4" className={classes.createRoomTitle}>
          {t("CreateRoomStreamingTitle")}
        </Typography>
        <Typography variant="body1" className={classes.createRoomDescription}>
          https://meet.com/{roomId}
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup className={classes.formGroup}>
            <Controller
              name={TITLE_ID}
              control={control}
              render={({ onChange, onBlur, value }) => (
                <CustomInput
                  inputProps={{ maxLength: VALUE_MAX_LENGTH_TITLE }}
                  id={TITLE_ID}
                  label={t("CreateRoomTitle")}
                  type="text"
                  disableUnderline
                  value={value}
                  error={!!errors[TITLE_ID]}
                  helperText={errors[TITLE_ID]?.message}
                  onBlur={onBlur}
                  onChange={e => onChange(e.target.value.trim())}
                />
              )} />
          </FormGroup>

          <FormGroup className={classes.formGroup}>
            <Controller
              name={DESCRIPTION_ID}
              control={control}
              render={({ onChange, onBlur, value }) => (
                <CustomInput
                  inputProps={{ maxLength: VALUE_MAX_LENGTH_DESCRIPTION }}
                  id={DESCRIPTION_ID}
                  label={t("CreateRoomDescription")}
                  type="text"
                  disableUnderline
                  multiline
                  rows={4}
                  value={value}
                  error={!!errors[DESCRIPTION_ID]}
                  helperText={errors[DESCRIPTION_ID]?.message}
                  onBlur={onBlur}
                  onChange={e => onChange(e.target.value.trim())}
                />
              )} />
          </FormGroup>

          <FormGroup className={classes.formGroup}>
            <Controller
              name={ROOM_TYPE_ID}
              control={control}
              render={({ onChange, onBlur, value }) => (
                <FormControl variant="outlined">
                  <Select
                    id={ROOM_TYPE_ID}
                    value={value}
                    error={!!errors[ROOM_TYPE_ID]}
                    input={<CustomInput disableUnderline label={t("CreateRoomType")} />}
                    onBlur={onBlur}
                    onChange={e => onChange(e.target.value)}
                  >
                    <MenuItem value={0}>Private</MenuItem>
                    <MenuItem value={1}>Public</MenuItem>
                    <MenuItem value={2}>Cam2Cam</MenuItem>
                  </Select>
                  {!!errors[ROOM_TYPE_ID] &&
                    <FormHelperText
                      className={classes.selectErrorHelperMessage}>
                      {errors[DESCRIPTION_ID]?.message}
                    </FormHelperText>}
                </FormControl>
              )} />
          </FormGroup>

          <FormGroup className={classes.formGroup}>
            <Controller
              name={TICKET_PRICE_ID}
              control={control}
              render={({ onChange, onBlur, value }) => (
                <CustomInput
                  inputProps={{ min: VALUE_MIN_LENGTH_TICKET_PRICE }}
                  id={TICKET_PRICE_ID}
                  label={t("CreateRoomTicketPrice")}
                  type="number"
                  disableUnderline
                  value={value}
                  error={!!errors[TICKET_PRICE_ID]}
                  helperText={errors[TICKET_PRICE_ID]?.message}
                  onBlur={onBlur}
                  onChange={e => onChange(e.target.value.trim())}
                />
              )} />
          </FormGroup>

          <FormGroup className={classes.formGroup}>
            <Button size="medium"
              variant="contained"
              type="submit">
              {t("CreateRoomJoinButton")}
            </Button>
          </FormGroup>
        </form>
      </Grid>

    </Grid>
  );
}

export default CreateRoomForm;
