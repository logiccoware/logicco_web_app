import type { TPayeeSpending } from "@/features/spendings/schema";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { FormattedMessage } from "react-intl";
import { SpendingEmptyMessage } from "@/features/spendings/components/SpendingEmptyMessage";
import { formatAmount } from "@/features/accounts/helpers/currency";

interface IProps {
  rows: TPayeeSpending[];
}

export function PayeeSpendingTable({ rows }: IProps) {
  if (rows.length === 0) {
    return (
      <SpendingEmptyMessage>
        <FormattedMessage id="Spendings.payees.emptyListMessage" />
      </SpendingEmptyMessage>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Payee</TableCell>
            <TableCell align="right">Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">
                {formatAmount(row.amount, "CAD")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
