import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  cover: {
    height: "220px",
    backgroundImage: ({ imageUrl }) => `url("${imageUrl}")`,
    backgroundColor: theme.palette.background.paper,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    borderRadius: theme.shape.borderRadius,
    marginBottom: theme.spacing(8),

    [theme.breakpoints.down("sm")]: {
      height: "100px",
    },
  },

  caption: {
    padding: theme.spacing(2),
    background: "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
    borderRadius: theme.shape.borderRadius,
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(1),
    },
  },

  coverEditButton: {
    zIndex: 1000,
    position: "absolute",
    right: theme.spacing(1),
    bottom: theme.spacing(1)
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
  },
  
  control: {
    whiteSpace: "nowrap",
  },
}));

export default useStyles;
