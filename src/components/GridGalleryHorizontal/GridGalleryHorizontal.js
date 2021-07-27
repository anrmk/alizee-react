import React from "react";

import { GridList, GridListTile } from "@material-ui/core";

import MediaContent from "../Post/Create/MediaContent";

// import useStyles from "./styles";

export default function GridGalleryHorizontal({
  items,
  cellHeight = 120,
  listCols = 4,
  tileCols = 1,
  spacing = 1,
  tileRows = 1
}) {
  // const classes = useStyles();

  return items.length > 0 && (
    <GridList cellHeight={cellHeight} cols={listCols} spacing={spacing}>
      {items.map((item) => (
        <GridListTile key={item.name} cols={tileCols} rows={tileRows}>
          <MediaContent type={item.type} url={item.previewURL} />
        </GridListTile>
      ))}
    </GridList>
  );
}
