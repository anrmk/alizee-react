import React, { useEffect, useState } from "react";
import ScrollContainer from "react-indiana-drag-scroll";
import PropTypes from "prop-types";
import { Grid, GridList, GridListTile, GridListTileBar, IconButton, Typography } from "@material-ui/core";

import HighlightOffOutlinedIcon from "@material-ui/icons/HighlightOffOutlined";

import {
  MAX_SIZE_VIDEO_MEDIA_FILE,
  MAX_SIZE_IMAGE_MEDIA_FILE,
  MEDIA_GROUP_TYPE,
  MEDIA_TYPE,
} from "../../constants/media_types";
import MediaPreview from "./MediaPreview";

import useStyles from "./styles";

function MediaEditorPreview({
  mediaFiles,

  onChangeMediaFiles,
}) {
  const classes = useStyles();
  const [selectedMediaFile, setSelectedMediaFile] = useState(mediaFiles[0]);
  const [changedMediaFiles, setChangedMediaFiles] = useState(mediaFiles);

  useEffect(() => {
    onChangeMediaFiles && onChangeMediaFiles(changedMediaFiles);
    if (!changedMediaFiles.some((file) => file.name === selectedMediaFile.name)) {
      setSelectedMediaFile(changedMediaFiles[0]);
    }
  }, [changedMediaFiles]);

  const handleSelectedMediaItem = (url) => {
    if (selectedMediaFile !== url) {
      setSelectedMediaFile(url);
    }
  };

  const handleDeleteMediaFile = (fileName) => (e) => {
    e.stopPropagation();
    setChangedMediaFiles(changedMediaFiles.filter((file) => file.name !== fileName));
  };

  const mediaTypeToKind = (type) => {
    let localType;
    if (MEDIA_TYPE[type] === MEDIA_GROUP_TYPE.IMAGE) {
      localType = 2;
    } else if (MEDIA_TYPE[type] === MEDIA_GROUP_TYPE.VIDEO) {
      localType = 1;
    }
    return localType;
  }

  const renderError = (file) => {
    if (
      (MEDIA_TYPE[file.type] === MEDIA_GROUP_TYPE.IMAGE && file.size > MAX_SIZE_IMAGE_MEDIA_FILE) ||
      (MEDIA_TYPE[file.type] === MEDIA_GROUP_TYPE.VIDEO && file.size > MAX_SIZE_VIDEO_MEDIA_FILE)
    ) {
      return (
        <Typography color="error" variant="caption">
          Size error
        </Typography>
      );
    } else {
      return;
    }
  };

  return (
    <>
      <Grid container direction="column" className={classes.gridContainer}>
        <Grid item className={classes.gridListPreviewItem}>
          <MediaPreview type={mediaTypeToKind(selectedMediaFile.type)} url={selectedMediaFile.previewURL} fullWidth={true} />
        </Grid>
        <GridList spacing={12} className={classes.gridList} component={ScrollContainer}>
          {mediaFiles.length > 0 &&
            mediaFiles.map((file) => {
              return (
                <GridListTile
                  key={file.name}
                  onClick={() => handleSelectedMediaItem(file)}
                  classes={{
                    root: classes.gridListItem,
                  }}
                >
                  <MediaPreview type={mediaTypeToKind(file.type)} url={file.previewURL} />
                  <GridListTileBar
                    title={renderError(file)}
                    titlePosition="top"
                    className={classes.titleBar}
                    actionIcon={
                      <IconButton onClick={handleDeleteMediaFile(file.name)}>
                        <HighlightOffOutlinedIcon />
                      </IconButton>
                    }
                    actionPosition="right"
                  />
                </GridListTile>
              );
            })}
        </GridList>
      </Grid>
    </>
  );
}

MediaEditorPreview.propTypes = {
  mediaFiles: PropTypes.array,

  onChangeMediaFiles: PropTypes.func,
};

MediaEditorPreview.defaultProps = {
  mediaFiles: [],

  onChangeMediaFiles: undefined,
};
export default MediaEditorPreview;
