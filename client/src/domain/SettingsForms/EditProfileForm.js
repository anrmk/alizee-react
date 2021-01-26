import React, { useEffect, useRef } from 'react';
import clsx from 'clsx';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import InputMask from "react-input-mask";
import {
  Box,
  Button,
  FormGroup,
  TextField,
  Typography
} from "@material-ui/core";

import Avatar from "../../components/Avatar";
import ChipsInput from "../../components/ChipsInput";
import { SITE_REGEX, PHONE_REGEX } from "../../constants/regexs";
import { getYearFromCurrentDate } from "../../helpers/functions";
import { getDate } from "../../helpers/functions";
import useStyles from "./styles";

const FULL_NAME_ID = "fullName";
const USERNAME_INPUT_ID = "username";
const SITES_INPUT_ID = "sites";
const BIO_INPUT_ID = "bio";
const BIRTHDAY_INPUT_ID = "birthday";
const PHONE_INPUT_ID = "phone";
const GENDER_INPUT_ID = "gender";

const EMPTY_VALUE_ERROR = "It is a required filed";
const BIRTHDAY_LESS_200_ERROR = "Must be +18 years";
const BIRTHDAY_GREATER_18_ERROR = "Guinness world record is 200 years";
const VALUE_MIN_LENGTH = (min) => `Must be at least ${min} characters`;
const VALUE_MAX_LENGTH = (max) => `Must be at most ${max} characters`;

const schema = yup.object().shape({
  [FULL_NAME_ID]: yup
    .string()
    .required(EMPTY_VALUE_ERROR)
    .min(2, VALUE_MIN_LENGTH(2)).max(49, VALUE_MAX_LENGTH(49)),
  [USERNAME_INPUT_ID]: yup
    .string()
    .required(EMPTY_VALUE_ERROR)
    .min(3, VALUE_MIN_LENGTH(3)).max(32, VALUE_MAX_LENGTH(32)),
  [SITES_INPUT_ID]: yup
    .array()
    .nullable()
    .notRequired(),
  [BIO_INPUT_ID]: yup
    .string()
    .nullable()
    .notRequired(),
  [BIRTHDAY_INPUT_ID]: yup
    .date()
    .nullable()
    .notRequired()
    .min(new Date(getYearFromCurrentDate(200), 0, 1), BIRTHDAY_GREATER_18_ERROR)
    .max(new Date(getYearFromCurrentDate(18), 0, 1), BIRTHDAY_LESS_200_ERROR),
  [PHONE_INPUT_ID]: yup
    .string()
    .nullable()
    .notRequired(),
  [GENDER_INPUT_ID]: yup
    .string()
    .notRequired()
});

function EditProfileForm({
  avatarUrl,
  name,
  username,
  bio,
  phone,
  birthday,
  gender = "",
  sites,
  loading,

  onSubmit
}) {
  const classes = useStyles();
  const { errors, register, setValue, watch, control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      avatarUrl,
      fullName: name,
      username,
      bio,
      phone,
      birthday: getDate(birthday),
      gender,
      sites
    }
  });

  useEffect(() => {
    register({ name: 'avatarUrl' });
    register({ name: 'avatarFile' });
    register({ name: 'sites' });
  }, [])

  const watcherAvatarUrl = watch("avatarUrl", avatarUrl);
  const fileInputEl = useRef(null);
  const chipsInputFilters = [
    val => {
      return !(SITE_REGEX.test(val)) ?
        `${val} is not a valid address.` :
        false;
    },
  ]

  useEffect(() => () => {
    if (watcherAvatarUrl) {
      URL.revokeObjectURL(watcherAvatarUrl);
    }
  }, [watcherAvatarUrl, avatarUrl])

  useEffect(() => {
    setValue("avatarUrl", avatarUrl);
  }, [avatarUrl])

  const handleAvatarUrlChange = () => {
    const files = fileInputEl.current.files;

    if (files.length === 1) {
      const fileURL = URL.createObjectURL(files[0]);
      setValue("avatarFile", files[0]);
      setValue("avatarUrl", fileURL);
    }
  }

  const handleSitesChange = data => {
    setValue("sites", data);
  }

  return (
    <Box>
      <Box className={clsx(classes.header, classes.formElementIndent)}>
        <Avatar className={classes.avatar} src={watcherAvatarUrl} />
        <Box>
          <Typography className={classes.username} variant="h4">{username}</Typography>
          <label>
            <Typography className={classes.uploadTextBtn} variant="h6" component="p">
              Change Profile Photo
            </Typography>
            <input
              className={classes.uploadBtn}
              type="file"
              name="avatarUrl"
              ref={fileInputEl}
              onChange={handleAvatarUrlChange} />
          </label>
        </Box>
      </Box>

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup className={classes.formElementIndent}>
          <Controller
            name={FULL_NAME_ID}
            control={control}
            render={({ onChange, onBlur, value }) => (
              <TextField
                variant="outlined"
                fullWidth
                id={FULL_NAME_ID}
                label="Full Name"
                type="text"
                value={value}
                error={!!errors[FULL_NAME_ID]}
                helperText={errors[FULL_NAME_ID]?.message}
                onBlur={onBlur}
                onChange={e => onChange(e.target.value)} />
            )} />
          <Typography className={classes.textMute} variant="caption">
            When your account is private, only people you
            approve can see your photos and videos on Instagram.
            Your existing followers won't affected.
          </Typography>
        </FormGroup>
        <FormGroup className={classes.formElementIndent}>
          <Controller
            name={USERNAME_INPUT_ID}
            control={control}
            render={({ onChange, onBlur, value }) => (
              <TextField
                variant="outlined"
                fullWidth
                id={USERNAME_INPUT_ID}
                label="Username"
                type="text"
                value={value}
                error={!!errors[USERNAME_INPUT_ID]}
                helperText={errors[USERNAME_INPUT_ID]?.message}
                onBlur={onBlur}
                onChange={e => onChange(e.target.value)} />
            )} />
        </FormGroup>
        <FormGroup className={classes.formElementIndent}>
          <ChipsInput
            label="Sites"
            placeholder="Sites"
            id={SITES_INPUT_ID}
            name={SITES_INPUT_ID}
            max={4}
            items={sites}
            filters={chipsInputFilters}
            onChange={handleSitesChange} />
        </FormGroup>
        <FormGroup className={classes.formElementIndent}>
          <Controller
            name={BIO_INPUT_ID}
            control={control}
            render={({ onChange, onBlur, value }) => (
              <TextField
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
                onChange={e => onChange(e.target.value)} />
            )} />
        </FormGroup>
        <FormGroup className={classes.formElementIndent}>
          <Controller
            name={BIRTHDAY_INPUT_ID}
            control={control}
            render={({ onChange, onBlur, value }) => (
              <TextField
                variant="outlined"
                fullWidth
                label="Birthday"
                id={BIRTHDAY_INPUT_ID}
                type="date"
                value={value || undefined}
                error={!!errors[BIRTHDAY_INPUT_ID]}
                helperText={errors[BIRTHDAY_INPUT_ID]?.message}
                InputLabelProps={{
                  shrink: true,
                }}
                onBlur={onBlur}
                onChange={e => onChange(e.target.value)} />
            )} />
        </FormGroup>
        <FormGroup className={classes.formElementIndent}>
          <Controller
            name={PHONE_INPUT_ID}
            control={control}
            render={({ onChange, onBlur, value }) => (
              <InputMask
                mask={PHONE_REGEX}
                disabled={false}
                value={value || ""}
                onBlur={onBlur}
                onChange={(e) => onChange(e.target.value.replace(/\D+/g, ""))}>
                <TextField
                  variant="outlined"
                  fullWidth
                  id={PHONE_INPUT_ID}
                  label="Phone Number"
                  type="text"
                  value={value}
                  error={!!errors[PHONE_INPUT_ID]}
                  helperText={errors[PHONE_INPUT_ID]?.message} />

              </InputMask>
            )} />
        </FormGroup>
        <FormGroup className={classes.formElementIndent}>
          <Controller
            name={GENDER_INPUT_ID}
            control={control}
            render={({ onChange, onBlur, value }) => (
              <TextField
                variant="outlined"
                fullWidth
                id={GENDER_INPUT_ID}
                label="Gender"
                type="text"
                value={value}
                error={!!errors[GENDER_INPUT_ID]}
                helperText={errors[GENDER_INPUT_ID]?.message}
                onBlur={onBlur}
                onChange={e => onChange(e.target.value)} />
            )} />
        </FormGroup>
        <FormGroup className={classes.formGroupBtn}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disableElevation
            disabled={loading}>
            Update
          </Button>
        </FormGroup>
      </form>
    </Box>
  );
}

export default EditProfileForm;
