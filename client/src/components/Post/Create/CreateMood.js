import React from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { FormControl, TextField } from "@material-ui/core";

import useStyles from "./styles";

const MOOD_ID = "mood";

const schema = yup.object().shape({
  [MOOD_ID]: yup.string().max(128, "Must be no more than 128 characters").required("Is required field"),
});

function CreateMood({
  formId,
  userName,
  defaultValue = "",

  onSubmit,
}) {
  const classes = useStyles();
  const { errors, control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      [MOOD_ID]: defaultValue || "",
    },
  });

  const handleFormSubmit = (data) => {
    onSubmit && onSubmit(data);
  };

  return (
    <form id={formId} className={classes.root} onSubmit={handleSubmit(handleFormSubmit)} autoComplete="off">
      <FormControl variant="filled" fullWidth>
        <Controller
          name={MOOD_ID}
          control={control}
          render={({ onChange, onBlur, value }) => (
            <TextField
              autoFocus
              multiline
              variant="filled"
              placeholder={`What's on your mind, ${userName}?`}
              rows={3}
              onBlur={onBlur}
              onChange={onChange}
              value={value}
              error={!!errors[MOOD_ID]}
              helperText={errors[MOOD_ID]?.message}
              inputProps={{ maxLength: 128 }}
              margin="dense"
            />
          )}
        />
      </FormControl>
    </form>
  );
}

export default CreateMood;
