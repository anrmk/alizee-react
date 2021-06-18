import React, { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import clsx from "clsx";

import { GridList, GridListTile, GridListTileBar, Typography, withWidth } from "@material-ui/core";

import AvatarIcon from "../../assets/img/avatar.png";

import useStyle from "./styles";

function GridGalleryUserList(props) {
  const { items, width } = props;
  const { onItemClick } = props;

  const classes = useStyle();
  const [isLoading, setLoading] = useState(true);

  return (
    <GridList
      spacing={12}
      cols={["xs", "sm"].includes(width) ? 3 : 6}
      className={clsx(classes.gridList, classes.userViewGridList)}
    >
      {items &&
        items.map((item, index) => (
          <GridListTile
            key={item.id + index}
            onClick={() => onItemClick(item.userName)}
            className={classes.gridListTile}
          >
            <LazyLoadImage
              width={"100%"}
              className={clsx(
                classes.gridListTileImage,
                classes.gridListTileImageUserView,
                !item.avatarUrl && classes.gridListUserViewBorder
              )}
              effect={item && "blur"}
              src={item.avatarUrl ? item.avatarUrl : AvatarIcon}
              alt={item.userName}
              afterLoad={() => setLoading(false)}
            />

            {!isLoading && (
              <GridListTileBar
                titlePosition="top"
                actionPosition="right"
                classes={{
                  root: clsx(classes.gridListTileBar, item.userName && classes.gridListTileBarUserView),
                  titleWrap: classes.gridListTileBarTitleUserView,
                }}
                title={
                  <Typography className={classes.gridListTileBarTitle} noWrap variant="body1">
                    {item.userName}
                  </Typography>
                }
              />
            )}
          </GridListTile>
        ))}
    </GridList>
  );
}

export default withWidth()(GridGalleryUserList);
