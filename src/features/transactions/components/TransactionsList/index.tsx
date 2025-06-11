import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import type { ITransactionsGroupByDate } from "@/features/transactions/helpers/getGroupedTransactionsByDate";
import { TransactionListItem } from "@/features/transactions/components/TransactionsList/TransactionListItem";
import { styled } from "@mui/material/styles";

interface IProps {
  data: ITransactionsGroupByDate[];
  handleItemClick: (id: string) => void;
  handleDeleteClick: (id: string) => void;
}

const CardContentNoPadding = styled(CardContent)(`
  padding: 0;
  &:last-child {
    padding-bottom: 0;
  }
`);

export function TransactionsList({
  data,
  handleItemClick,
  handleDeleteClick,
}: IProps) {
  return (
    <Card>
      <CardContentNoPadding>
        <TransactionListItem
          data={data}
          emptyListMessage="No data found"
          handleItemClick={handleItemClick}
          handleDeleteClick={handleDeleteClick}
        />
      </CardContentNoPadding>
    </Card>
  );
}
