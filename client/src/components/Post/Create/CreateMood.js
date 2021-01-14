import React, { useState } from "react";

import { FormControl, TextField } from "@material-ui/core";

import { POST_TYPE } from "../../../constants/feed";

import useStyles from "./styles";

function CreateMood({
  id,
  user,

  onSubmit
}) {
  const classes = useStyles();
  const defaultFormData = {
    text: "",
    type: POST_TYPE.MOOD,
  };
  const [formData, setFormData] = useState(defaultFormData);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (formData.text?.trim().length === 0) return;

    onSubmit && onSubmit(formData, []);
    setFormData(defaultFormData);
  };

  const handleFormDataChange = (e) => {
    var target = e.currentTarget;
    setFormData({ ...formData, [target.name]: target.value });
  };

  return (
    <form id={id} className={classes.root} onSubmit={handleFormSubmit} autoComplete="off">
      <FormControl variant="filled" fullWidth>
        <TextField
          required
          autoFocus
          multiline
          name="text"
          variant="filled"
          placeholder={`What's on your mind, ${user.name}?`}
          rows={3}
          onChange={handleFormDataChange}
          value={formData.text}
          helperText={`Characters entered ${formData.text.length} out of 128`}
          inputProps={{ maxLength: 128 }}
          margin="dense"
        />
      </FormControl>
    </form>
  );
}

export default CreateMood;
