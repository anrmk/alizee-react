import React from "react";

import { ImageList, ImageListItem } from "@material-ui/core";

import MediaContent from "../Post/Create/MediaContent";

// import useStyles from "./styles";

export default function GridGalleryHorizontal({
  items,
  cellHeight = 120,
  listCols = 4,
  tileCols = 1,
  spacing = 1,
  tileRows = 1,
}) {
  // const classes = useStyles();

  return (
    items.length > 0 && (
      <ImageList rowHeight={cellHeight} cols={listCols} gap={spacing}>
        {items.map((item) => (
          <ImageListItem key={item.name} cols={tileCols} rows={tileRows}>
            <MediaContent type={item.type} url={item.previewURL} />
          </ImageListItem>
        ))}
      </ImageList>
    )
  );
}
