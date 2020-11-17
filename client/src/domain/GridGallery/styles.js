import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width:"100%",
    display: "flex",
    flexWrap: "nowrap",
    justifyContent: "space-around",
    overflow: "hidden !important",
    backgroundColor: theme.palette.background.paper,
    padding: "12px"
    //maxHeight: "320px"
  },

  typography: {
    padding: theme.spacing(3, 2),
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
    background: 'linear-gradient(45deg, #c761f2 30%, #FF8E53 90%)',
  },

  gridList: {
    // width: 500,
    // height: 450,
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)",
  },

  gridListTile: {

  },

  gridListTileBar: {
    background:
      "linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, " +
      "rgba(0,0,0,0.1) 70%, rgba(0,0,0,0) 100%)",
  },
  icon: {
    color: "white",
  },
}));

export default useStyles;
