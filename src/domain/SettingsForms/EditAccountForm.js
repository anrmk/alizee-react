import React from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InputMask from "react-input-mask";
import * as yup from "yup";
import {
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  Divider,
} from "@material-ui/core";
import { PHONE_REGEX } from "../../constants/regexs";
import SettingsHeader from "./SettingsHeader";

import {
  EMPTY_VALUE_ERROR,
  VALUE_MIN_LENGTH,
  VALUE_MAX_LENGTH,
} from "../../constants/form_validations";

const USERNAME_INPUT_ID = "userName";
const EMAIL_INPUT_ID = "email";
const PHONE_INPUT_ID = "phoneNumber";

const schema = yup.object().shape({
  [USERNAME_INPUT_ID]: yup
    .string()
    .required(EMPTY_VALUE_ERROR)
    .min(3, VALUE_MIN_LENGTH(3))
    .max(32, VALUE_MAX_LENGTH(32)),
  [EMAIL_INPUT_ID]: yup.string().email().required(),
  [PHONE_INPUT_ID]: yup.string().nullable().notRequired(),
});

function EditAccountForm({
  userName,
  email,
  phoneNumber,

  onSubmit,
  onBackClick,
}) {
  const { errors, register, setValue, watch, control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      [USERNAME_INPUT_ID]: userName || "",
      [EMAIL_INPUT_ID]: email || "",
      [PHONE_INPUT_ID]: phoneNumber || "",
    },
  });

  return (
    <Card>
      <SettingsHeader onBackClick={onBackClick} title="Account" />
      <Divider />
      <CardContent>
        <Grid
          container
          component="form"
          direction="column"
          spacing={2}
          onSubmit={handleSubmit(onSubmit)}>
          <Grid item>
            <Controller
              name={USERNAME_INPUT_ID}
              control={control}
              render={({ onChange, onBlur, value }) => (
                <TextField
                  fullWidth
                  id={USERNAME_INPUT_ID}
                  name={USERNAME_INPUT_ID}
                  variant="outlined"
                  label="Username"
                  type="text"
                  value={value}
                  error={!!errors[USERNAME_INPUT_ID]}
                  helperText={`https://themembers.com/${value}`}
                  onBlur={onBlur}
                  onChange={(e) => onChange(e.target.value)}
                />
              )}
            />
          </Grid>

          <Grid item>
            <Controller
              name={EMAIL_INPUT_ID}
              control={control}
              render={({ onChange, onBlur, value }) => (
                <TextField
                  fullWidth
                  id={EMAIL_INPUT_ID}
                  name={EMAIL_INPUT_ID}
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
          </Grid>

          <Grid item>
            <Controller
              name={PHONE_INPUT_ID}
              control={control}
              render={({ onChange, onBlur, value }) => (
                <InputMask
                  mask={PHONE_REGEX}
                  value={value || ""}
                  onBlur={onBlur}
                  onChange={(e) =>
                    onChange(e.target.value.replace(/\D+/g, ""))
                  }>
                  <TextField
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
          </Grid>

          <Grid item>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disableElevation>
              Update
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default EditAccountForm;
