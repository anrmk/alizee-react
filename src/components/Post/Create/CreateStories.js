import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Typography } from "@material-ui/core";

import GridGalleryHorizontal from "../../GridGalleryHorizontal/GridGalleryHorizontal";

import {
  TYPE_JPEG,
  TYPE_PJPEG,
  TYPE_GIF,
  TYPE_XPNG,
  TYPE_PNG,
  TYPE_MP4,
  TYPE_MOV,
  TYPE_WEBM,
  TYPE_OGG,
} from "../../../constants/media_types";

import useStyles from "./styles";

const MEDIA_ID = "medias";
const supportedInputMediaType = [
  TYPE_JPEG,
  TYPE_PJPEG,
  TYPE_GIF,
  TYPE_XPNG,
  TYPE_PNG,
  TYPE_MP4,
  TYPE_MOV,
  TYPE_WEBM,
  TYPE_OGG,
];

const schema = yup.object().shape({
  [MEDIA_ID]: yup.array().min(1).max(1).required(),
});

export default function CreateStories({
  formId,

  onSubmit,
}) {
  const classes = useStyles();
  const { errors, register, setValue, watch, handleSubmit } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      [MEDIA_ID]: [],
    },
  });
  const mediaWatcher = watch(MEDIA_ID, []);
  const mediaRef = useRef();

  useEffect(() => {
    register({ name: MEDIA_ID });

    mediaRef.current.click();
    return () => {
      mediaWatcher.forEach((file) => URL.revokeObjectURL(file.previewUrl));
      setValue(MEDIA_ID, []);
    };
  }, []);

  const handleFormSubmit = (data) => {
    onSubmit && onSubmit(data);
  };

  const handleMediaChange = (e) => {
    const { files } = e.currentTarget;

    if (files.length > 0) {
      const mediaFiles = [...files];
      mediaFiles.forEach((file) => {
        file.previewURL = URL.createObjectURL(file);
      });
      setValue(MEDIA_ID, mediaFiles);
    }
  };

  return (
    <form
      id={formId}
      className={classes.root}
      onSubmit={handleSubmit(handleFormSubmit)}
      autoComplete="off">
      <input
        type="file"
        multiple={false}
        id={MEDIA_ID}
        name={MEDIA_ID}
        ref={mediaRef}
        accept={supportedInputMediaType.join(", ")}
        style={{ display: mediaWatcher.length ? "none" : "block" }}
        onChange={handleMediaChange}
      />

      <Typography color="error">{errors[MEDIA_ID]?.message}</Typography>

      <GridGalleryHorizontal
        items={mediaWatcher}
        tileCols={4}
        cellHeight={500}
      />
    </form>
  );
}
