import React from "react";
import PropTypes from "prop-types";
import {
  GridList,
  GridListTile,
  GridListTileBar,
  Box,
} from "@material-ui/core";

import PlayArrowIcon from "@material-ui/icons/PlayArrowOutlined";
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibraryOutlined";

import useStyle from "./styles";
import { MEDIA_IMAGE, MEDIA_VIDEO } from "../../constants/media_types";

function GridGalleryPostList({ items, onItemClick }) {
  const classes = useStyle();

  // const [lastPostIndex, setLastPostIndex] = useState(0);
  // const [isLoading, setLoading] = useState(true);
  // const [galleryItems, setGalleryItems] = useState([]);
  // const [images, setImages] = useState([]);

  // const imgNotLoaded = (img, item, reject) => {
  //   if (item) {
  //     reject({ status: "not_loaded", item });
  //   }

  //   img.removeEventListener("error", imgNotLoaded);
  // };

  // const imgLoaded = (img, item, resolve) => {
  //   if (item) {
  //     resolve({ status: "loaded", item });
  //   }

  //   img.removeEventListener("load", imgLoaded);
  // };

  // const promiseWrapper = (img, item) =>
  //   new Promise((resolve, reject) => {
  //     img.addEventListener("error", () => imgNotLoaded(img, item, reject));
  //     img.addEventListener("load", () => imgLoaded(img, item, resolve));
  //   });

  // const itemsPromise = () => {
  //   const arr = [];
  //   const arrImg = [];

  //   for (let i = lastPostIndex; i < items.length; i++) {
  //     if (items[i].media.length > 0) {
  //       const img = new Image();
  //       img.src = items[i].media[0].thumbnailUrl;
  //       arr.push(promiseWrapper(img, items[i]));
  //       arrImg.push(img);
  //       if (i === items.length - 1) {
  //         setLastPostIndex(i + 1);
  //         setImages((prev) => [...prev, ...arrImg]);
  //         return arr;
  //       }
  //     }
  //   }
  //   setImages((prev) => [...prev, ...arrImg]);
  //   return arr;
  // };

  // useEffect(() => {
  //   let isMounted = true;

  //   if (items.length > 0) {
  //     Promise.allSettled(itemsPromise())
  //       .then((data) => {
  //         return data.reduce((acc, data) => {
  //           if (data.value?.item) {
  //             return [...acc, data.value.item];
  //           }
  //           return acc;
  //         }, []);
  //       })
  //       .then((data) => {
  //         isMounted && setGalleryItems((prev) => [...prev, ...data]);
  //       });
  //   }

  //   return () => {
  //     isMounted = false;
  //   };
  // }, [items]);

  // useEffect(() => {
  //   return () => {
  //     images.forEach((el) => {
  //       imgNotLoaded(el, null, null);
  //       imgLoaded(el, null, null);
  //     });
  //   };
  // }, [images]);

  return (
    <GridList cols={3} className={classes.gridList}>
      {items?.length > 0 &&
        items.map(
          (item, index) =>
            item.media?.length > 0 && (
              <GridListTile
                key={item.id + index}
                onClick={() => onItemClick(item.id)}
                className={classes.tile}>
                <img
                  className={classes.image}
                  loading="lazy"
                  src={item.media[0].thumbnailUrl}
                  alt={item.title}
                />

                <GridListTileBar
                  titlePosition="top"
                  actionPosition="right"
                  className={classes.tileBar}
                  actionIcon={
                    <Box className={classes.icon}>
                      {item.media[0].kind === MEDIA_VIDEO && <PlayArrowIcon />}
                      {item.media.length > 1 &&
                        item.media[0].kind === MEDIA_IMAGE && (
                          <PhotoLibraryIcon />
                        )}
                    </Box>
                  }
                />
              </GridListTile>
            )
        )}
    </GridList>
  );
}

GridGalleryPostList.propTypes = {
  onItemClick: PropTypes.func,
};

GridGalleryPostList.defaultProps = {
  onItemClick: undefined,
};

export default GridGalleryPostList;
