import { makeStyles } from "@material-ui/core/styles";

const getColumnWidth = (size) => (100 / 12) * size;

const useStyles = makeStyles((theme) => ({
  slidingViewsRoot: {
    display: "flex",
    height: "100%"
  },
  slidingView: ({ size }) => ({
    maxWidth: getColumnWidth(size) + "%",
    flexBasis: getColumnWidth(size) + "%",
    transition: "all .1s ease-in",
    "& + &": {
      marginRight: "30px !important"
    },
    [theme.breakpoints.down("sm")]: {
      minHeight: `calc(100vh - ${(theme.mixins.toolbar.minHeight*2 + theme.spacing(3))}px)`,
      zIndex: 1000
    },
  })
}));

export default useStyles;

