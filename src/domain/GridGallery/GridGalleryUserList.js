import React from "react";
import clsx from "clsx";

import {
  GridList,
  GridListTile,
  GridListTileBar,
  withWidth,
} from "@material-ui/core";
import AvatarIcon from "../../assets/img/avatar.png";

import useStyle from "./styles";

function GridGalleryUserList({ items, width, onItemClick }) {
  const classes = useStyle();

  return (
    <GridList
      spacing={12}
      cols={["xs", "sm"].includes(width) ? 3 : 6}
      className={clsx(classes.gridList, classes.userViewGridList)}>
      {items &&
        items.map((item, index) => (
          <GridListTile
            key={item.id + index}
            onClick={() => onItemClick(item.userName)}
            className={classes.tile}>
            <img
              className={clsx(classes.image, classes.userImage)}
              loading="lazy"
              src={item.avatarUrl ? item.avatarUrl : AvatarIcon}
              alt={item.userName}
            />

            <GridListTileBar
              titlePosition="bottom"
              className={clsx(classes.tileBar, classes.userTileBar)}
              // classes={{
              //   root: clsx(classes.gridListTileBar, item.userName && classes.gridListTileBarUserView),
              //   titleWrap: classes.gridListTileBarTitleUserView,
              // }}
              title={item.name}
              subtitle={`@${item.userName}`}
            />
          </GridListTile>
        ))}
    </GridList>
  );
}

export default withWidth()(GridGalleryUserList);
