import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  coverBox: {
    position: "relative",
    marginBottom: theme.spacing(3)
  },
  cover: {
    borderRadius: theme.shape.borderRadius,
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    height: "200px",
    backgroundImage: ({ imageUrl }) => `url("${imageUrl}")`
  },
  coverEditButton: {
    display: "none"
  },
  headerAvatarBox: {
    display: "flex",
    position: "absolute",
    bottom: "-32px",
    left: theme.spacing(4)
  },
  headerAvatarDescription: {
    alignSelf: "flex-end",
    marginLeft: theme.spacing(2),
    lineHeight: "100%",
  },
  headerAvatarFullName: {
    fontWeight: "700",
    lineHeight: "100%",
  },
  headerAvatarFullNameIcon: {
    fontSize: "16px",
    marginLeft: theme.spacing(0.5)
  },
  headerAvatarFullNameBox: {
    display: "flex",
    flexDirection: "row"
  },
  headerAvatarUsername: {
    lineHeight: "100%",
    color: theme.palette.secondary.main
  },
  
  bio: {
    marginBottom: theme.spacing(1),
  },

  sites: {
    marginBottom: theme.spacing(1),
    display: "flex",
    justifyContent: "left",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },

  statistics: {
    display: "inline-flex",
    "& > li": {
      display: "inline-block",
      whiteSpace: "nowrap"
    },
  }
}));

export default useStyles;
