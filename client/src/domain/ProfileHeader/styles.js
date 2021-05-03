import { makeStyles } from "@material-ui/core";

const getGradient = () => (
  "linear-gradient(180deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.3) 15%, rgba(0, 0, 0, 0) 30%),"
);

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    marginBottom: theme.spacing(1),
  },
  cover: {
    height: "220px",
    backgroundImage: ({ imageUrl }) => getGradient(theme.palette.type) + `url("${imageUrl}")`,
    backgroundColor: theme.palette.background.paper,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    borderRadius: theme.shape.borderRadius,
  },

  topControls: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    marginBottom: theme.spacing(1),
    padding: 0,

    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(1),
      position: "absolute",
      top: 0
    },
  },

  profileStatistics: {
    marginLeft: "auto",
    marginRight: "auto",
    [theme.breakpoints.up("md")]: {
      marginLeft: theme.spacing(3),
      marginRight: 0,
    },
  },

   control: {
     color: theme.palette.common.white
   },

  coverEditButton: {
    position: "absolute",
    right: theme.spacing(1),
    bottom: theme.spacing(1),
    color: theme.palette.common.white
  },

  coverInputField: {
    display: "none",
  },

  coverBox: {
    position: "absolute",
    bottom: theme.spacing(-6.5),
  },

  avatar: {
    margin: theme.spacing(0, 2),
    [theme.breakpoints.down("sm")]: {
      margin: theme.spacing(0, 1),
    },
  }
}));

export default useStyles;
