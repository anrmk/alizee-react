import React, { useState } from "react";

import { Grid, FormControl, TextField } from "@material-ui/core";

import { POST_TYPE } from "../../../constants/feed";

import useStyles from "./styles";

function CreateFeeling({ id, user, onSubmit }) {
  const classes = useStyles();
  const defaultFormData = {
    description: "",
    commentable: true,
    private: false,
    amount: 0,
    type: POST_TYPE.FEELING,
  };
  const [formData, setFormData] = useState(defaultFormData);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (formData.description.trim().length === 0) return;

    onSubmit && onSubmit(formData, []);
    setFormData(defaultFormData);
  };

  const handleFormDataChange = (e) => {
    var target = e.currentTarget;
    setFormData({ ...formData, [target.name]: target.value });
  };

  return (
    <form id={id} className={classes.root} onSubmit={handleFormSubmit} autoComplete="off">
      <Grid container direction="row" justify="space-between" alignItems="center">
        <FormControl variant="filled" fullWidth>
          <TextField
            autoFocus
            name="description"
            variant="filled"
            placeholder={`What's on your mind, ${user.name}?`}
            multiline
            rows={3}
            required
            onChange={handleFormDataChange}
            value={formData.description}
            helperText={`Characters entered ${formData.description.length} out of 128`}
            inputProps={{ maxLength: 128 }}
          />
        </FormControl>
      </Grid>
    </form>
  );
}

export default CreateFeeling;
