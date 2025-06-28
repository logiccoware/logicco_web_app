import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import { TransactionTypeSwitcher } from "@/features/spendings/components/TransactionTypeSwitcher";
import { getTransactionType } from "@/features/transactions/helpers/getTransactionType";

interface IProps {
  total: string;
  transactionType?: string;
  onTransactionTypeChange: (transactionType: string) => void;
}

export function SpendingOverview({
  total,
  transactionType,
  onTransactionTypeChange,
}: IProps) {
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", my: 2 }}>
      <Chip label={total} />
      <TransactionTypeSwitcher
        selectedTransactionType={getTransactionType(transactionType)}
        onTransactionTypeChange={onTransactionTypeChange}
      />
    </Box>
  );
}
