import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  mediaInputField: {
    display: "none",
  },
  gridContainer: {
    flexWrap: "nowrap",
  },
  gridList: {
    flexWrap: "nowrap",
  },
  gridListItem: {
    width: "120px !important",
    height: "120px !important",
    padding: "0 !important",
    margin: theme.spacing(1),
  },
  image: {
    left: "50%",
    height: "100%",
    position: "relative",
    transform: "translateX(-50%)"
  },
  video: {
    width: "120px !important",
    height: "120px !important",
    background: theme.palette.common.black,
  },
  gridListPreviewItem: {
    marginRight: "auto",
    marginLeft: "auto",
    height: "350px",
    maxWidth: "300px",
    overflow: "hidden",
    marginBottom: theme.spacing(2),
  },
  imagePreview: {
    objectFit: "contain",
    width: "100%",
    height: "100%"
  },
  videoPreview: {
    height: "100% !important",
    width: "100% !important",
    background: theme.palette.common.black,
  },
}));

export default useStyles;
