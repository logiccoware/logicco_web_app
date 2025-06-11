import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import type { ITransactionsGroupByDate } from "@/features/transactions/helpers/getGroupedTransactionsByDate";
import { TransactionListItem } from "@/features/transactions/components/TransactionsList/TransactionListItem";

interface IProps {
  data: ITransactionsGroupByDate[];
  handleItemClick: (id: string) => void;
  handleDeleteClick: (id: string) => void;
}

export function TransactionsList({
  data,
  handleItemClick,
  handleDeleteClick,
}: IProps) {
  return (
    <Card>
      <CardContent>
        <TransactionListItem
          data={data}
          emptyListMessage="No data found"
          handleItemClick={handleItemClick}
          handleDeleteClick={handleDeleteClick}
        />
      </CardContent>
    </Card>
  );
}
