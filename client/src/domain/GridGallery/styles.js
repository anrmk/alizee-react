import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    overflow: "hidden !important",
  },

  defaultLabel: {
    textAlign: "center"
  },

  gridList: {
    overflow: "hidden",
    minWidth: 220,
  },

  userViewGridList: {
    margin: "0 !important",
  },

  gridListTile: {
    height: "auto !important",
    padding: theme.spacing(0.1, 0.5) + " !important",
  },

  gridListTileImage: {
    width: "100%",
    height: "auto !important"
  },

  gridListTileImageUserView: {
    overflow: "hidden",
    borderRadius: "50%",
  },

  gridListTileBar: {
    background: "none",
  },

  gridListTileBarTitle: {
    color: theme.palette.text.primary,
  },

  gridListTileBarUserView: {
    position: "relative",
  },

  gridListTileBarTitleUserView: {
    textAlign: "center",
    alignSelf: "start",
    marginTop: theme.spacing(0.5),
  },

  icon: {
    color: "white",
  },
}));

export default useStyles;
