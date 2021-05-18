import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import InputMask from "react-input-mask";
import {Card, CardHeader, CardContent, Grid, Button, FormGroup, TextField } from "@material-ui/core";

import Avatar from "../../components/Avatar";
import ChipsInput from "../../components/ChipsInput";
import { SITE_REGEX, PHONE_REGEX } from "../../constants/regexs";
import { USER_RANKING } from "../../constants/user";
import { EMPTY_VALUE_ERROR, BIRTHDAY_LESS_200_ERROR, BIRTHDAY_GREATER_18_ERROR, VALUE_MIN_LENGTH, VALUE_MAX_LENGTH} from "../../constants/form_validations";

import { getYearFromCurrentDate } from "../../helpers/functions";
import { getDate } from "../../helpers/functions";
import useStyles from "./styles";
import Cover from "../../components/Cover";

const FULL_NAME_INPUT_ID = "name";
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
  [FULL_NAME_INPUT_ID]: yup.string().required(EMPTY_VALUE_ERROR).min(2, VALUE_MIN_LENGTH(2)).max(49, VALUE_MAX_LENGTH(49)),
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
  coverUrl,
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
      coverUrl,
      [FULL_NAME_INPUT_ID]: name || "",
      userName,
      email,
      [BIO_INPUT_ID]: bio || "",
      phoneNumber,
      [BIRTHDAY_INPUT_ID]: getDate(birthday),
      sites
    },
  });

  useEffect(() => {
    register({ name: "avatarUrl" });
    register({ name: "avatarFile" });
    register({ name: "coverUrl" });
    register({ name: "coverFile" });
    register({ name: "sites" });
  }, []);

  const watcherAvatarUrl = watch("avatarUrl", avatarUrl);
  const watcherCoverUrl = watch("coverUrl", coverUrl);

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
      if (watcherCoverUrl) {
        URL.revokeObjectURL(watcherCoverUrl);
      }
    },
    [watcherAvatarUrl, avatarUrl, watcherCoverUrl, coverUrl]
  );

  useEffect(() => {
    setValue("avatarUrl", avatarUrl);
  }, [avatarUrl]);

  useEffect(() => {
    setValue("coverUrl", coverUrl);
  }, [coverUrl]);

  const handleAvatarImageChange = (file) => {
    const url = URL.createObjectURL(file);
    setValue("avatarFile", file);
    setValue("avatarUrl", url);
  };

  const handleCoverImageChange = (file) => {
    const url = URL.createObjectURL(file);
    setValue("coverFile", file);
    setValue("coverUrl", url);
  };

  const handleDeleteAvatarImageClick = () => {
    URL.revokeObjectURL(watcherAvatarUrl);
    setValue("avatarUrl", null);
    setValue("avatarFile", null);
  };

  const handleDeleteCoverImageClick = () => {
    URL.revokeObjectURL(watcherCoverUrl);
    setValue("coverUrl", null);
    setValue("coverFile", null);
  };

  const handleSitesChange = (data) => {
    setValue("sites", data);
  };

  return (
    <Card>
      <CardHeader title="Personal Info"></CardHeader>
      <CardContent><Grid container direction="column" spacing={4} alignItems="center">
      <Grid className={classes.header} item>
        <Cover
          rootClassName={classes.cover}
          showControls
          src={watcherCoverUrl}
          onFileInputChange={handleCoverImageChange}
          onDeleteImageClick={handleDeleteCoverImageClick}>
          <Avatar
            className={classes.avatar}
            src={watcherAvatarUrl}
            showControls
            size="huge"
            borderColor={USER_RANKING[ranking]}
            onFileInputChange={handleAvatarImageChange}
            onDeleteImageClick={handleDeleteAvatarImageClick} />
        </Cover>
      </Grid>

      <Grid item component="form" onSubmit={handleSubmit(onSubmit)} >
        <Controller
          name={FULL_NAME_INPUT_ID}
          control={control}
          render={({ onChange, onBlur, value }) => (
            <TextField
              className={classes.formElementIndent}
              variant="outlined"
              fullWidth
              id={FULL_NAME_INPUT_ID}
              label="Full Name"
              type="text"
              value={value}
              error={!!errors[FULL_NAME_INPUT_ID]}
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
    </Grid></CardContent>
      </Card>
    
  );
}

export default EditProfileForm;
