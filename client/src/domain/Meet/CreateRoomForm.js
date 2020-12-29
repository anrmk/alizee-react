import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Chip, Button, FormGroup, Grid, MenuItem, TextField, Typography } from "@material-ui/core";

import FileCopyOutlined from "@material-ui/icons/FileCopyOutlined";

import ChipsInput from "../../components/ChipsInput";
import useStyles from "./styles"

const TITLE_ID = "title";
const DESCRIPTION_ID = "description";
const TAGS_ID = "tags";
const ROOM_TYPE_ID = "roomType";
const TICKET_PRICE_ID = "ticketPrice";

const VALUE_MIN_LENGTH_TICKET_PRICE = 0;
const VALUE_MAX_LENGTH_TITLE = 128;
const VALUE_MAX_LENGTH_DESCRIPTION = 255;

const EMPTY_VALUE_ERROR = "It is a required filed";
const VALUE_MIN_LENGTH_ERROR = (min) => `Must be at least ${min} characters`;
const VALUE_MAX_LENGTH_ERROR = (max) => `Must be at most ${max} characters`;

const HELPER_TEXT_DESCRIPTION = (length) => `Characters entered ${length ? length : 0} out of ${VALUE_MAX_LENGTH_DESCRIPTION} characters`;

const COPY_LINK_ROOM_ALERT_SUCCESS_TEXT = "Copying link room successfully";
const COPY_LINK_ROOM_ALERT_ERROR_TEXT = "Copying link room failed";

const schema = yup.object().shape({
  [TITLE_ID]: yup
    .string()
    .required(EMPTY_VALUE_ERROR)
    .max(VALUE_MAX_LENGTH_TITLE, VALUE_MAX_LENGTH_ERROR(VALUE_MAX_LENGTH_TITLE)),
  [DESCRIPTION_ID]: yup
    .string()
    .notRequired()
    .max(VALUE_MAX_LENGTH_DESCRIPTION, VALUE_MAX_LENGTH_ERROR(VALUE_MAX_LENGTH_DESCRIPTION)),
  [TAGS_ID]: yup
    .array()
    .nullable()
    .notRequired(),
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
  stream,

  onCopyLinkRoom,
  onSubmit
}) {
  const { t } = useTranslation();
  const classes = useStyles();
  const videoRef = useRef(null);

  useEffect(() => {
    videoRef.current.srcObject = stream;
  }, [stream]);

  const handleCopyClick = (chip) => {
    navigator.clipboard.writeText(chip)
      .then(() => onCopyLinkRoom(COPY_LINK_ROOM_ALERT_SUCCESS_TEXT))
      .catch(() => onCopyLinkRoom(COPY_LINK_ROOM_ALERT_ERROR_TEXT));
  }

  const { control, errors, handleSubmit, register, setValue } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      ticketPrice: 0
    }
  });

  useEffect(() => {
    register({ name: TAGS_ID });
  }, [])

  const handleTagsChange = (data) => {
    setValue(TAGS_ID, data);
  }

  return (
    <Grid container direction="row" spacing={2}>

      <Grid item className={classes.createRoomItem} xs={12} md={8}>
        <video className={classes.createRoomItemVideo}
          ref={videoRef}
          muted
          autoPlay
          playsInline
          allowFullScreen
          controls
        />
      </Grid>

      <Grid item className={classes.createRoomItem} xs={12} md={4}>
        <Typography variant="h4" gutterBottom align="center">
          {t("MeetCreateRoomFormTitle")}
        </Typography>
        <Chip
          key={roomId}
          className={classes.createRoomChip}
          label={`https://meet.com/${roomId}`}
          onDelete={() => handleCopyClick(roomId)}
          deleteIcon={<FileCopyOutlined />} />

        <form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup className={classes.formElementIndent}>
            <Controller
              name={TITLE_ID}
              control={control}
              render={({ onChange, onBlur, value }) => (
                <TextField
                  inputProps={{ maxLength: VALUE_MAX_LENGTH_TITLE }}
                  variant="outlined"
                  fullWidth
                  id={TITLE_ID}
                  label={t("MeetCreateRoomFormTitleInputLabel")}
                  type="text"
                  value={value}
                  error={!!errors[TITLE_ID]}
                  helperText={errors[TITLE_ID]?.message}
                  onBlur={onBlur}
                  onChange={e => onChange(e.target.value.trim())} />
              )} />
          </FormGroup>

          <FormGroup>
            <Controller
              name={DESCRIPTION_ID}
              control={control}
              render={({ onChange, onBlur, value }) => (
                <TextField
                  inputProps={{ maxLength: VALUE_MAX_LENGTH_DESCRIPTION }}
                  variant="outlined"
                  fullWidth
                  id={DESCRIPTION_ID}
                  label={t("MeetCreateRoomFormDescriptionInputLabel")}
                  type="text"
                  multiline
                  rows={4}
                  value={value}
                  error={!!errors[DESCRIPTION_ID]}
                  helperText={
                    errors[DESCRIPTION_ID]?.message ||
                    HELPER_TEXT_DESCRIPTION(value?.length)
                  }
                  onBlur={onBlur}
                  onChange={e => onChange(e.target.value.trim())} />
              )} />
          </FormGroup>

          <FormGroup>
            <ChipsInput
              classChipName={classes.createRoomChip}
              label={t("MeetCreateRoomFormTagsInputLabel")}
              id={TAGS_ID}
              name={TAGS_ID}
              max={4}
              onChange={handleTagsChange} />
          </FormGroup>

          <FormGroup className={classes.formElementIndent}>
            <Controller
              name={ROOM_TYPE_ID}
              control={control}
              render={({ onChange, onBlur, value }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  select
                  id={ROOM_TYPE_ID}
                  label={t("MeetCreateRoomFormTypeInputLabel")}
                  value={value}
                  error={!!errors[ROOM_TYPE_ID]}
                  helperText={errors[ROOM_TYPE_ID]?.message}
                  onBlur={onBlur}
                  onChange={e => onChange(e.target.value)}>
                  <MenuItem value={0}>Private</MenuItem>
                  <MenuItem value={1}>Public</MenuItem>
                  <MenuItem value={2}>Cam2Cam</MenuItem>
                </TextField>
              )} />
          </FormGroup>

          <FormGroup className={classes.formElementIndent}>
            <Controller
              name={TICKET_PRICE_ID}
              control={control}
              render={({ onChange, onBlur, value }) => (
                <TextField
                  inputProps={{ min: VALUE_MIN_LENGTH_TICKET_PRICE }}
                  variant="outlined"
                  fullWidth
                  id={TICKET_PRICE_ID}
                  label={t("MeetCreateRoomFormTicketPriceInputLabel")}
                  type="number"
                  value={value}
                  error={!!errors[TICKET_PRICE_ID]}
                  helperText={errors[TICKET_PRICE_ID]?.message}
                  onBlur={onBlur}
                  onChange={e => onChange(e.target.value.trim())} />
              )} />
          </FormGroup>

          <FormGroup className={classes.formElementIndent}>
            <Button size="medium"
              variant="contained"
              type="submit">
              {t("MeetCreateRoomFormJoinButtonLabel")}
            </Button>
          </FormGroup>
        </form>
      </Grid>

    </Grid>
  );
}

export default CreateRoomForm;
