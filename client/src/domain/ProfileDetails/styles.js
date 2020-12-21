import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  detailsBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  detailsBoxIconButton: {
    fontSize: "40px"
  },
  detailsBoxItems: {
    display: "flex",
    flexDirection: "column",
  },
  detailsBoxItem: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    margin: theme.spacing(1, 0)
  },
  detailsBoxItemLabel: {
    marginLeft: theme.spacing(2)
  },
  detailsBoxHourlyRate: {
    marginLeft: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
  profileGeneralStatistics: {
    textAlign: "center",
    marginTop: theme.spacing(1)
  },
  profileDetailsBio: {
    marginBottom: theme.spacing(1),
  },
  profileDetailsSites: {
    marginBottom: theme.spacing(1),
    display: "flex",
    justifyContent: "left",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
  profileDetailsActionButtons: {
    margin: theme.spacing(2, 0)
  },
}));

export default useStyles;
