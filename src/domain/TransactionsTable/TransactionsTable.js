import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
import useStyles from "./styles";
import { getDate } from "../../helpers/functions";

export default function TransactionsTable({ rows, className }) {
  const classes = useStyles();

  return (
    <TableContainer className={className} component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>№</TableCell>
            <TableCell align="right">Amount</TableCell>
            <TableCell align="right">Date</TableCell>
            <TableCell align="right">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows &&
            !!rows.length &&
            rows.map((row, index) => (
              <TableRow key={index}>
                <TableCell>
                  {index + 1} {row.id}
                </TableCell>
                <TableCell align="right">{row.amount}$</TableCell>
                <TableCell align="right">{getDate(row.createdDate)}</TableCell>
                <TableCell align="right">{row.status}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
