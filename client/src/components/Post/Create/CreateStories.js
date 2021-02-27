import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { GridList, GridListTile, Typography } from "@material-ui/core";

import { CreateTools } from "../../../components/Post";

import useStyles from "./styles";

const MEDIA_ID = "medias";

const schema = yup.object().shape({
  [MEDIA_ID]: yup
    .array()
    .min(1)
    .max(1)
    .required()
});

export default function CreateStories({ 
  formId,

  onSubmit 
}) {
  const classes = useStyles();
  const { errors, register, setValue, watch, handleSubmit } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      [MEDIA_ID]: [],
    }
  });
  const mediaWatcher = watch(MEDIA_ID, []);

  useEffect(() => {
    register({ name: MEDIA_ID });

    return () => {
      mediaWatcher.forEach(file => URL.revokeObjectURL(file.previewUrl));
      setValue(MEDIA_ID, []);
    }
  }, [])

  const handleFormSubmit = (data) => {
    onSubmit && onSubmit(data);
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
    <form id={formId} className={classes.root} onSubmit={handleSubmit(handleFormSubmit)} autoComplete="off">
      <CreateTools
        onlyMedia
        multiple={false}
        onChange={handleMediaChange}
      />
      
      <Typography color="error">
        {errors[MEDIA_ID]?.message}
      </Typography>

      {mediaWatcher.length > 0 && (
        <GridList cellHeight={120} cols={4} spacing={1}>
          {mediaWatcher.map((item) => (
            <GridListTile key={item.name} cols={1} rows={1}>
              <img src={item.previewURL} alt={item.name} />
            </GridListTile>
          ))}
        </GridList>
      )}
    </form>
  );
}
