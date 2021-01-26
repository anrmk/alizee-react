import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  itemCard: {
    marginBottom: theme.spacing(1),
  },
  itemCountText: {
    marginLeft: theme.spacing(0.5)
  },
  itemJoinTicketPriceText: {
    marginLeft: "auto",
    marginRight: theme.spacing(1),
  }
}));

export default useStyles;
