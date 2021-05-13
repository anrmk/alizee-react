import { makeStyles } from "@material-ui/core/styles";
import { fade } from '@material-ui/core/styles/colorManipulator';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2, 0),
    padding: theme.spacing(0),
  },

  header: {
    justifyContent: "space-between",
    display: "flex",
  },

  item: {
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
    marginBottom: theme.spacing(1),
    padding: theme.spacing(0.5, 1)
  },

  wide: {
    height: theme.spacing(12),
    backgroundImage: (props) => `url(${props.url})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },

  avatar: {
    margin: theme.spacing(1)
  },

  label: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(0.1, 0.5),
    position: "absolute",
    top: theme.spacing(-0.5),
    left: theme.spacing(-0.5),
    color: theme.palette.grey["50"],
    zIndex: 3,
    textTransform: "capitalize",
    fontSize: theme.typography.caption.fontSize
  },

  itemButton: {
    marginLeft: theme.spacing(1),
    flexShrink: 0,
    minWidth: "110px",
  },

  followButton: {
    minWidth: "110px",
  },
}));

export default useStyles;
