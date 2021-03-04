import React, { useEffect, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import InputMask from "react-input-mask";
import { Grid, Button, FormGroup, TextField, Typography } from "@material-ui/core";

import Avatar from "../../components/Avatar";
import ChipsInput from "../../components/ChipsInput";
import { SITE_REGEX, PHONE_REGEX } from "../../constants/regexs";
import { USER_RANKING } from "../../constants/user";
import { EMPTY_VALUE_ERROR, BIRTHDAY_LESS_200_ERROR, BIRTHDAY_GREATER_18_ERROR, VALUE_MIN_LENGTH, VALUE_MAX_LENGTH} from "../../constants/form_validations";

import { getYearFromCurrentDate } from "../../helpers/functions";
import { getDate } from "../../helpers/functions";
import useStyles from "./styles";

const FULL_NAME_ID = "fullName";
const USERNAME_INPUT_ID = "userName";
const EMAIL_INPUT_ID = "email";
const SITES_INPUT_ID = "sites";
const BIO_INPUT_ID = "bio";
const BIRTHDAY_INPUT_ID = "birthday";
const PHONE_INPUT_ID = "phoneNumber";

const USERNAME_INPUT_HELPER = "In most cases, you'll be able to change your username back for another 14 days.";

const FULL_NAME_HELPER =
  "Help people discover your account by using the name you're known by: either your full name, nickname, or business name. You can only change your name twice within 14 days.";

const schema = yup.object().shape({
  [FULL_NAME_ID]: yup.string().required(EMPTY_VALUE_ERROR).min(2, VALUE_MIN_LENGTH(2)).max(49, VALUE_MAX_LENGTH(49)),
  [USERNAME_INPUT_ID]: yup
    .string()
    .required(EMPTY_VALUE_ERROR)
    .min(3, VALUE_MIN_LENGTH(3))
    .max(32, VALUE_MAX_LENGTH(32)),
  [SITES_INPUT_ID]: yup.array().nullable().notRequired(),
  [BIO_INPUT_ID]: yup.string().nullable().notRequired(),
  [BIRTHDAY_INPUT_ID]: yup
    .date()
    .nullable()
    .notRequired()
    .min(new Date(getYearFromCurrentDate(200), 0, 1), BIRTHDAY_GREATER_18_ERROR)
    .max(new Date(getYearFromCurrentDate(18), 0, 1), BIRTHDAY_LESS_200_ERROR),
  [PHONE_INPUT_ID]: yup.string().nullable().notRequired()
});

function EditProfileForm({
  avatarUrl,
  name,
  userName,
  email,
  ranking,
  bio,
  phoneNumber,
  birthday,
  sites,
  isFetching,

  onSubmit,
}) {
  const classes = useStyles();
  const { errors, register, setValue, watch, control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      avatarUrl,
      fullName: name,
      userName,
      email,
      bio,
      phoneNumber,
      birthday: getDate(birthday),
      sites,
    },
  });

  useEffect(() => {
    register({ name: "avatarUrl" });
    register({ name: "avatarFile" });
    register({ name: "sites" });
  }, []);

  const watcherAvatarUrl = watch("avatarUrl", avatarUrl);
  const fileInputEl = useRef(null);
  const chipsInputFilters = [
    (val) => {
      return !SITE_REGEX.test(val) ? `${val} is not a valid address.` : false;
    },
  ];

  useEffect(
    () => () => {
      if (watcherAvatarUrl) {
        URL.revokeObjectURL(watcherAvatarUrl);
      }
    },
    [watcherAvatarUrl, avatarUrl]
  );

  useEffect(() => {
    setValue("avatarUrl", avatarUrl);
  }, [avatarUrl]);

  const handleAvatarUrlChange = () => {
    const files = fileInputEl.current.files;

    if (files.length === 1) {
      const fileURL = URL.createObjectURL(files[0]);
      setValue("avatarFile", files[0]);
      setValue("avatarUrl", fileURL);
    }
  };

  const handleSitesChange = (data) => {
    setValue("sites", data);
  };

  return (
    <Grid container direction="column" spacing={4} alignItems="center">
      <Grid item>
        <Avatar
          className={classes.avatar}
          src={watcherAvatarUrl}
          size="large"
          borderColor={USER_RANKING[ranking]}
        />
        <Typography component="label">
          Change Profile Photo
          <input hidden type="file" name="avatarUrl" ref={fileInputEl} onChange={handleAvatarUrlChange} />
        </Typography>
      </Grid>

      <Grid item component="form" onSubmit={handleSubmit(onSubmit)} >
        <Controller
          name={FULL_NAME_ID}
          control={control}
          render={({ onChange, onBlur, value }) => (
            <TextField
              className={classes.formElementIndent}
              variant="outlined"
              fullWidth
              id={FULL_NAME_ID}
              label="Full Name"
              type="text"
              value={value}
              error={!!errors[FULL_NAME_ID]}
              helperText={FULL_NAME_HELPER}
              onBlur={onBlur}
              onChange={(e) => onChange(e.target.value)}
            />
          )}
        />

        <Controller
          name={USERNAME_INPUT_ID}
          control={control}
          render={({ onChange, onBlur, value }) => (
            <TextField
              fullWidth
              id={USERNAME_INPUT_ID}
              name={USERNAME_INPUT_ID}
              className={classes.formElementIndent}
              variant="outlined"
              label="Username"
              type="text"
              value={value}
              error={!!errors[USERNAME_INPUT_ID]}
              helperText={USERNAME_INPUT_HELPER}
              onBlur={onBlur}
              onChange={(e) => onChange(e.target.value)}
            />
          )}
        />

        <FormGroup className={classes.formElementIndent}>
          <ChipsInput
            label="Sites"
            placeholder="Sites"
            id={SITES_INPUT_ID}
            name={SITES_INPUT_ID}
            max={4}
            items={sites}
            filters={chipsInputFilters}
            onChange={handleSitesChange}
          />
        </FormGroup>

        <Controller
          name={BIO_INPUT_ID}
          control={control}
          render={({ onChange, onBlur, value }) => (
            <TextField
              className={classes.formElementIndent}
              variant="outlined"
              fullWidth
              id={BIO_INPUT_ID}
              label="Bio"
              type="text"
              value={value}
              multiline
              rows={4}
              error={!!errors[BIO_INPUT_ID]}
              helperText={errors[BIO_INPUT_ID]?.message}
              onBlur={onBlur}
              onChange={(e) => onChange(e.target.value)}
            />
          )}
        />

        <Controller
          name={EMAIL_INPUT_ID}
          control={control}
          render={({ onChange, onBlur, value }) => (
            <TextField
              disabled
              fullWidth
              id={EMAIL_INPUT_ID}
              name={EMAIL_INPUT_ID}
              className={classes.formElementIndent}
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

        <Controller
          name={PHONE_INPUT_ID}
          control={control}
          render={({ onChange, onBlur, value }) => (
            <InputMask
              mask={PHONE_REGEX}
              disabled={false}
              value={value || ""}
              onBlur={onBlur}
              onChange={(e) => onChange(e.target.value.replace(/\D+/g, ""))}
            >
              <TextField
                className={classes.formElementIndent}
                variant="outlined"
                fullWidth
                id={PHONE_INPUT_ID}
                label="Phone Number"
                type="text"
                value={value}
                error={!!errors[PHONE_INPUT_ID]}
                helperText={errors[PHONE_INPUT_ID]?.message}
              />
            </InputMask>
          )}
        />

        <Button type="submit" variant="contained" color="primary" disableElevation disabled={isFetching} >
          Update
        </Button>
      </Grid>
    </Grid>
  );
}

export default EditProfileForm;
