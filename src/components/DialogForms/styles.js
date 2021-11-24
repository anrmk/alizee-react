import { makeStyles } from "@material-ui/core";
import { blue } from "@material-ui/core/colors";
import { getStyleByTheme } from "../../helpers/functions";

const useStyles = makeStyles((theme) => ({
  avatar: {
    margin: "10px auto",
  },
  formElementIndent: {
    marginBottom: theme.spacing(2),
  },
  cover: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  header: {
    width: "100%",
  },

  withdrawFundsAlertRoot: {
    "& > .MuiAlert-message": {
      width: "100%",
    },
  },
  withdrawFundsCardRoot: {
    border: `1px solid ${theme.palette.divider}`,
  },
  withdrawFundsCardHeader: {
    backgroundColor: getStyleByTheme(theme, blue[100], theme.palette.grey[800]),
  },
  withdrawFundsCardSubTitle: {
    fontWeight: 600,
  },
}));

export default useStyles;
