import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((_theme) => ({
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

  gridListTile: {
    height: "auto !important",
  },

  gridListTileImage: {
    width: "100%",
    height: "auto !important"
  },

  gridListTileBar: {
    background: "none",
  },

  icon: {
    color: "white",
  },
}));

export default useStyles;
