import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Card,
  CardContent,
  Grid,
  Button,
  FormGroup,
  TextField,
  InputAdornment,
  Divider,
} from "@material-ui/core";

import Avatar from "../../components/Avatar";
import ChipsInput from "../../components/ChipsInput";
import { SITE_REGEX } from "../../constants/regexs";

import {
  EMPTY_VALUE_ERROR,
  VALUE_MIN_LENGTH,
  VALUE_MAX_LENGTH,
  FULL_NAME_HELPER,
} from "../../constants/form_validations";

import useStyles from "./styles";
import Cover from "../../components/Cover";
import SettingsHeader from "./SettingsHeader";

const DISPLAY_NAME_INPUT_ID = "name";
const USERNAME_INPUT_ID = "userName";
const BIO_INPUT_ID = "bio";
const LOCATION_INPUT_ID = "location";
const SITES_INPUT_ID = "sites";
const WISHLIST_INPUT_ID = "wishList";

const schema = yup.object().shape({
  [DISPLAY_NAME_INPUT_ID]: yup
    .string()
    .required(EMPTY_VALUE_ERROR)
    .min(2, VALUE_MIN_LENGTH(2))
    .max(49, VALUE_MAX_LENGTH(49)),
  [USERNAME_INPUT_ID]: yup
    .string()
    .required(EMPTY_VALUE_ERROR)
    .min(3, VALUE_MIN_LENGTH(3))
    .max(32, VALUE_MAX_LENGTH(32)),
  [SITES_INPUT_ID]: yup.array().nullable().notRequired(),
  [BIO_INPUT_ID]: yup.string().nullable().notRequired(),
  [LOCATION_INPUT_ID]: yup.string().nullable().notRequired(),
  [WISHLIST_INPUT_ID]: yup.string().url().nullable().notRequired(),
});

function EditProfileForm({
  avatarUrl,
  coverUrl,
  name,
  userName,
  bio,
  sites,
  location,
  wishList,
  isFetching,

  onSubmit,
  onBackClick,
}) {
  const classes = useStyles();
  const { errors, register, setValue, watch, control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      avatarUrl,
      coverUrl,
      [DISPLAY_NAME_INPUT_ID]: name || "",
      [USERNAME_INPUT_ID]: userName || "",
      [BIO_INPUT_ID]: bio || "",
      [LOCATION_INPUT_ID]: location || "",
      sites,
      [WISHLIST_INPUT_ID]: wishList || "",
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
    (val) => (!SITE_REGEX.test(val) ? `${val} is not a valid address.` : false),
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
      <SettingsHeader onBackClick={onBackClick} title="Edit Profile" />

      <Divider />
      <CardContent>
        <Grid container direction="column" spacing={2} alignItems="center">
          <Grid item className={classes.header}>
            <Cover
              rootClassName={classes.cover}
              showControls
              src={watcherCoverUrl}
              onFileInputChange={handleCoverImageChange}
              onDeleteImageClick={handleDeleteCoverImageClick}>
              <Avatar
                src={watcherAvatarUrl}
                showControls
                size="huge"
                borderColor="silver"
                onFileInputChange={handleAvatarImageChange}
                onDeleteImageClick={handleDeleteAvatarImageClick}
              />
            </Cover>
          </Grid>

          <Grid
            container
            item
            component="form"
            direction="column"
            spacing={2}
            onSubmit={handleSubmit(onSubmit)}>
            <Grid item>
              <Controller
                name={DISPLAY_NAME_INPUT_ID}
                control={control}
                render={({ onChange, onBlur, value }) => (
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="text"
                    id={DISPLAY_NAME_INPUT_ID}
                    label="Display Name"
                    value={value}
                    error={!!errors[DISPLAY_NAME_INPUT_ID]}
                    helperText={FULL_NAME_HELPER}
                    onBlur={onBlur}
                    onChange={(e) => onChange(e.target.value)}
                  />
                )}
              />
            </Grid>

            <Grid item>
              <Controller
                name={USERNAME_INPUT_ID}
                control={control}
                render={({ onChange, onBlur, value }) => (
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="text"
                    disabled
                    id={USERNAME_INPUT_ID}
                    name={USERNAME_INPUT_ID}
                    label="Username"
                    value={value}
                    error={!!errors[USERNAME_INPUT_ID]}
                    helperText={`https://themembers.com/${value}`}
                    onBlur={onBlur}
                    onChange={(e) => onChange(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">@</InputAdornment>
                      ),
                    }}
                  />
                )}
              />
            </Grid>

            <Grid item>
              <Controller
                name={BIO_INPUT_ID}
                control={control}
                render={({ onChange, onBlur, value }) => (
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="text"
                    id={BIO_INPUT_ID}
                    label="Bio"
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
            </Grid>

            <Grid item>
              <Controller
                name={LOCATION_INPUT_ID}
                control={control}
                render={({ onChange, onBlur, value }) => (
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="text"
                    id={LOCATION_INPUT_ID}
                    label="Location"
                    value={value}
                    error={!!errors[LOCATION_INPUT_ID]}
                    helperText={errors[LOCATION_INPUT_ID]?.message}
                    onBlur={onBlur}
                    onChange={(e) => onChange(e.target.value)}
                  />
                )}
              />
            </Grid>

            <Grid item>
              <FormGroup>
                <ChipsInput
                  label="Wibsites URL"
                  placeholder="https://"
                  id={SITES_INPUT_ID}
                  name={SITES_INPUT_ID}
                  max={4}
                  items={sites}
                  filters={chipsInputFilters}
                  onChange={handleSitesChange}
                />
              </FormGroup>
            </Grid>

            <Grid item>
              <Controller
                name={WISHLIST_INPUT_ID}
                control={control}
                render={({ onChange, onBlur, value }) => (
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="text"
                    id={WISHLIST_INPUT_ID}
                    label="Amazon Wishlisth"
                    placeholder="https://"
                    value={value}
                    error={!!errors[WISHLIST_INPUT_ID]}
                    helperText={errors[WISHLIST_INPUT_ID]?.message}
                    onBlur={onBlur}
                    onChange={(e) => onChange(e.target.value)}
                  />
                )}
              />
            </Grid>
            <Grid item>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disableElevation
                disabled={isFetching}>
                Update
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default EditProfileForm;
