import { makeStyles, Select, withStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  formGroup: {
    marginBottom: theme.spacing(2),
  },
  createRoomTitle: {
    margin: theme.spacing(1, 0),
    textAlign: "center"
  },
  createRoomDescription: {
    margin: theme.spacing(1, 0),
  },
  createRoomChip: {
    borderRadius: theme.shape.borderRadius,
    marginBottom: theme.spacing(1)
  },
  createRoomItem: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  createRoomItemVideo: {
    height: "auto",
    width: "100%",
    borderRadius: theme.shape.borderRadius,
  },
  // Need to customize SelectInput
  selectErrorHelperMessage: {
    margin: theme.spacing(0, 0, 0, 2),
    color: theme.palette.secondary.main,
  }
}));

export default useStyles;
