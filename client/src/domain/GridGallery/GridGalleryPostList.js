import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { LazyLoadImage } from "react-lazy-load-image-component";

import { GridList, GridListTile, GridListTileBar, Hidden, Box} from "@material-ui/core";

import PlayArrowIcon from "@material-ui/icons/PlayArrowOutlined";
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibraryOutlined";

import useStyle from "./styles";
import { MEDIA_IMAGE, MEDIA_VIDEO } from "../../constants/media_types";

function GridGalleryPostList(props) {
  const { items } = props;
  const { onItemClick } = props;

  const classes = useStyle();

  const [lastPostIndex, setLastPostIndex] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [galleryItems, setGalleryItems] = useState([]);
  const [images, setImages] = useState([]);

  const imgNotLoaded = (img, item, reject) => {
    if (item) {
      reject({ status: "not_loaded", item });
    }

    img.removeEventListener("error", imgNotLoaded);
  };

  const imgLoaded = (img, item, resolve) => {
    if (item) {
      resolve({ status: "loaded", item });
    }

    img.removeEventListener("load", imgLoaded);
  };

  const promiseWrapper = (img, item) =>
    new Promise((resolve, reject) => {
      img.addEventListener("error", () => imgNotLoaded(img, item, reject));
      img.addEventListener("load", () => imgLoaded(img, item, resolve));
    });

  const itemsPromise = () => {
    const arr = [];
    const arrImg = [];

    for (let i = lastPostIndex; i < items.length; i++) {
      if (items[i].media.length > 0) {
        const img = new Image();
        img.src = items[i].media[0].thumbnailUrl;
        arr.push(promiseWrapper(img, items[i]));
        arrImg.push(img);
        if (i === items.length - 1) {
          setLastPostIndex(i+1);
          setImages((prev) => [...prev, ...arrImg]);
          return arr;
        }
      }
    }
    setImages((prev) => [...prev, ...arrImg]);
    return arr;
  };

  useEffect(() => {
    if (items.length > 0) {
      Promise.allSettled(itemsPromise())
        .then((data) => {
          return data.reduce((acc, data) => {
            if (data.value?.item) {
              return [...acc, data.value.item];
            }
            return acc;
          }, []);
        })
        .then((data) => {
          setGalleryItems((prev) => [...prev, ...data]);
        });
    }
  }, [items]);

  useEffect(() => {
    return () => {
      images.forEach((el) => {
        imgNotLoaded(el, null, null);
        imgLoaded(el, null, null);
      });
    };
  }, [images]);

  return (
    <GridList spacing={12} cols={3} className={classes.gridList}>
      {galleryItems.length > 0 &&
        galleryItems.map(
          (item, index) =>
            item.media.length > 0 && (
              <GridListTile
                key={item.id + index}
                onClick={() => onItemClick(item.id)}
                className={classes.gridListTile}
              >
                <img
                  className={classes.gridListTileImage}
                  loading="lazy"
                  src={item.media[0].thumbnailUrl}
                  alt={item.title}
                />
                {/* <LazyLoadImage
					className={classes.gridListTileImage}
					effect={item && "blur"}
					src={item.media[0].kind === MEDIA_VIDEO ? item.media[0].thumbnailUrl : item.media[0].url}
					alt={item.title}
					afterLoad={() => setLoading(false)} /> */}
                {!isLoading && (
                  <Hidden smDown>
                    <GridListTileBar
                      titlePosition="top"
                      actionPosition="right"
                      classes={{
                        root: classes.gridListTileBar,
                      }}
                      actionIcon={
                        <Box className={classes.icon}>
                          {item.media[0].kind === MEDIA_VIDEO && (
                            <PlayArrowIcon />
                          )}
                          {item.media.length > 1 &&
                            item.media[0].kind === MEDIA_IMAGE && (
                              <PhotoLibraryIcon />
                            )}
                        </Box>
                      }
                    />
                  </Hidden>
                )}
              </GridListTile>
            )
        )}
    </GridList>
  );
}

GridGalleryPostList.propTypes = {
  item: PropTypes.object,
  isUserView: PropTypes.bool,

  onItemClick: PropTypes.func,
};

GridGalleryPostList.defaultProps = {
  item: {},
  isUserView: false,

  onItemClick: undefined,
};

export default GridGalleryPostList;
