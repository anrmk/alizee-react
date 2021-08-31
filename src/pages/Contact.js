import React, { useState } from "react";

import { useSelector } from "react-redux";

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import {
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
} from "@material-ui/core";

import {
  EMPTY_VALUE_ERROR,
  VALUE_MIN_LENGTH,
  VALUE_MAX_LENGTH,
} from "../constants/form_validations";

import { PublicLayout } from "../layouts";

const USERNAME_INPUT_ID = "userName";
const EMAIL_INPUT_ID = "email";
const SUBJECT_SELECT_ID = "subject";
const MESSAGE_INPUT_ID = "message";
const OTHER_SUBJECT_SELECT_ID = "otherSubjectMessage";

const schema = yup.object().shape({
  [USERNAME_INPUT_ID]: yup
    .string()
    .required(EMPTY_VALUE_ERROR)
    .min(3, VALUE_MIN_LENGTH(3))
    .max(32, VALUE_MAX_LENGTH(32)),
  [EMAIL_INPUT_ID]: yup.string().email().required(),
  [SUBJECT_SELECT_ID]: yup
    .string()
    .required()
    .min(3, VALUE_MIN_LENGTH(3))
    .max(80, VALUE_MAX_LENGTH(80)),
  [MESSAGE_INPUT_ID]: yup
    .string()
    .min(3, VALUE_MIN_LENGTH(3))
    .max(200, VALUE_MAX_LENGTH(200)),
  [OTHER_SUBJECT_SELECT_ID]: yup
    .string()
    .min(3, VALUE_MIN_LENGTH(3))
    .max(80, VALUE_MAX_LENGTH(80)),
});

function Contact() {
  const [isOtherSubject, setIsOtherSubject] = useState("");

  const user = useSelector((state) => state.signIn.userInfo);
  const { userName, email } = user;

  const { errors, register, setValue, watch, control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      [USERNAME_INPUT_ID]: userName || "",
      [EMAIL_INPUT_ID]: email || "",
      [SUBJECT_SELECT_ID]: "",
      [MESSAGE_INPUT_ID]: "",
      [OTHER_SUBJECT_SELECT_ID]: "",
    },
  });

  const handleContactSubmit = (data) => {};

  return (
    <PublicLayout>
      <Typography variant="subtitle1" align="center" gutterBottom>
        If you have any questions, please fill out the form below to contact us.
      </Typography>
      <Box
        margin="0 auto"
        display="flex"
        flexDirection="column"
        component="form"
        onSubmit={handleSubmit(handleContactSubmit)}
        width="100%"
        maxWidth="460px">
        <Box mr={2} mb={2} width="100%">
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
                helperText={errors[USERNAME_INPUT_ID]?.message}
                onBlur={onBlur}
                onChange={(e) => onChange(e.target.value)}
              />
            )}
          />
        </Box>
        <Box mr={2} mb={2} width="100%">
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
        </Box>

        <Box mr={2} mb={2} width="100%">
          <Controller
            name={SUBJECT_SELECT_ID}
            control={control}
            render={({ onChange, onBlur, value }) => (
              <TextField
                id={SUBJECT_SELECT_ID}
                label="Select subject"
                fullWidth
                variant="outlined"
                select
                value={value}
                error={!!errors[SUBJECT_SELECT_ID]}
                helperText={errors[SUBJECT_SELECT_ID]?.message}
                InputLabelProps={{
                  shrink: true,
                }}
                onBlur={onBlur}
                onChange={(e) => {
                  onChange(e.target.value);
                  setIsOtherSubject(e.target.value);
                }}>
                <MenuItem value="registration and verification">
                  Registration and Verification
                </MenuItem>
                <MenuItem value="profile access">Profile Access</MenuItem>
                <MenuItem value="credit card payments">
                  Credit Card Payments
                </MenuItem>
                <MenuItem value="payouts">Payouts</MenuItem>
                <MenuItem value="technical questions">
                  Technical Questions
                </MenuItem>
                <MenuItem value="reporting stolen content">
                  Reporting Stolen Content
                </MenuItem>
                <MenuItem value="law enforcement legal matter">
                  Law Enforcement / Legal Matter
                </MenuItem>
                <MenuItem value="report illegal material or behavior">
                  Report Illegal Material or Behavior
                </MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </TextField>
            )}
          />
        </Box>
        {isOtherSubject === "other" && (
          <Box mr={2} mb={2} width="100%">
            <Controller
              name={OTHER_SUBJECT_SELECT_ID}
              control={control}
              render={({ onChange, onBlur, value }) => (
                <TextField
                  fullWidth
                  id={OTHER_SUBJECT_SELECT_ID}
                  name={OTHER_SUBJECT_SELECT_ID}
                  variant="outlined"
                  label="Enter subject"
                  type="text"
                  value={value}
                  error={!!errors[OTHER_SUBJECT_SELECT_ID]}
                  helperText={errors[OTHER_SUBJECT_SELECT_ID]?.message}
                  onBlur={onBlur}
                  onChange={(e) => onChange(e.target.value)}
                />
              )}
            />
          </Box>
        )}
        <Box mr={2} mb={2} width="100%">
          <Controller
            name={MESSAGE_INPUT_ID}
            control={control}
            render={({ onChange, onBlur, value }) => (
              <TextField
                rows={4}
                fullWidth
                multiline
                id={MESSAGE_INPUT_ID}
                name={MESSAGE_INPUT_ID}
                variant="outlined"
                label="Enter your message"
                type="multiline"
                value={value}
                error={!!errors[MESSAGE_INPUT_ID]}
                helperText={errors[MESSAGE_INPUT_ID]?.message}
                onBlur={onBlur}
                onChange={(e) => onChange(e.target.value)}
              />
            )}
          />
        </Box>
        <Box alignSelf="flex-start">
          <Button type="submit" variant="contained" color="primary">
            Send
          </Button>
        </Box>
      </Box>
    </PublicLayout>
  );
}

export default Contact;
