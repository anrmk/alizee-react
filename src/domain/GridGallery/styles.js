import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    overflow: "hidden !important",
    minHeight: "100px"
  },

  defaultLabel: {
    textAlign: "center"
  },

  gridList: {
    overflow: "hidden",
   // minWidth: 220,
  },

  userViewGridList: {
    margin: "0 !important",
  },

  tile: {
    height: "auto !important",
   // padding: theme.spacing(0.5) + " !important",
    cursor: "pointer",
    // [theme.breakpoints.down("sm")]: {
    //   padding: theme.spacing(0.1)+ " !important"
    // }
  },

  image: {
    width: "100%",
    height: "100%", //"auto !important",
    overflow: "hidden"
  },

  userImage: {
    overflow: "hidden",
    borderRadius: "50%",
  },

  tileBar: {
    background: "none",
  },

  userTileBar: {
    position: "absolute",
    //bottom: "0"
    margin: 0
    //olor: theme.
  },

  icon: {
    color: "white",
    marginRight: theme.spacing(0.5)
  },

  // gridListTileBarTitle: {
  //   color: theme.palette.text.primary,
  // },

  gridListTileBarUserView: {
    position: "relative",
  },

  gridListUserViewBorder: {
    border: "2px solid " + theme.palette.background.paper
  },

  gridListTileBarTitleUserView: {
    textAlign: "center",
    alignSelf: "start",
    marginTop: theme.spacing(0.5),
  },

  
}));

export default useStyles;
