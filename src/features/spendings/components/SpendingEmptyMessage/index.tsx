import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import type { PropsWithChildren } from "react";

export function SpendingEmptyMessage({ children }: PropsWithChildren) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>{children}</TableCell>
          </TableRow>
        </TableHead>
      </Table>
    </TableContainer>
  );
}
