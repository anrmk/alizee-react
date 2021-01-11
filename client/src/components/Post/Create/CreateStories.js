import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Grid, GridList, GridListTile, FormControl, TextField } from "@material-ui/core";

import { CreateTools } from "../../../components/Post";
import { POST_TYPE } from "../../../constants/feed";

import useStyles from "./styles";

const LINK_ID = "link";
const MEDIA_ID = "medias";

const schema = yup.object().shape({
  [LINK_ID]: yup
    .string()
    .url()
    .nullable()
    .notRequired(),
  [MEDIA_ID]: yup
    .array()
    .min(1)
    .required()
});

export default function CreateStories({ id, onSubmit }) {
  const classes = useStyles();
  const { errors, register, setValue, watch, control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      [LINK_ID]: "",
      [MEDIA_ID]: [],
    }
  });

  useEffect(() => {
    register({ name: MEDIA_ID });

    return () => {
      mediaWatcher.forEach(file => URL.revokeObjectURL(file.previewUrl));
      setValue(LINK_ID, "");
      setValue(MEDIA_ID, []);
    }
  }, [])

  const mediaWatcher = watch(MEDIA_ID, []);

  const handleFormSubmit = (data) => {
    if (data[LINK_ID].length === 0 && data[MEDIA_ID].length === 0) return;

    onSubmit && onSubmit({ link: data.link, type: POST_TYPE.STORY }, data[MEDIA_ID]);
  };

  const handleMediaChange = (e) => {
    const files = e.currentTarget.files;

    if (files.length > 0) {
      const mediaFiles = [...files];
      mediaFiles.forEach((file) => (file.previewURL = URL.createObjectURL(file)));
      setValue(MEDIA_ID, mediaFiles);
    }
  }

  return (
    <form id={id} className={classes.root} onSubmit={handleSubmit(handleFormSubmit)} autoComplete="off">
      <Grid container direction="row" justify="space-between" alignItems="center">
        <Grid item></Grid>
        <Grid item>
          <CreateTools
            className={classes.tools}
            onlyMedia
            multiple={false}
            onChange={handleMediaChange}
          />
        </Grid>
      </Grid>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <FormControl fullWidth>
            <Controller
              name={LINK_ID}
              control={control}
              render={({ onChange, onBlur, value }) => (
                <TextField
                  autoFocus
                  variant="standard"
                  placeholder="External link"
                  onBlur={onBlur}
                  onChange={onChange}
                  value={value}
                  error={!!errors[LINK_ID] || !!errors[MEDIA_ID]}
                  helperText={errors[LINK_ID]?.message || errors[MEDIA_ID]?.message}
                  inputProps={{ maxLength: 2048 }}
                />
              )} />
          </FormControl>
        </Grid>
        <Grid item>
          <GridList cellHeight={120} cols={4} spacing={1}>
            {mediaWatcher.map((item) => (
              <GridListTile key={item.name} cols={1} rows={1}>
                <img src={item.previewURL} alt={item.name} />
              </GridListTile>
            ))}
          </GridList>
        </Grid>
      </Grid>
    </form>
  );
}
