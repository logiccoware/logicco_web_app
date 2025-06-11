import { TRANSACTION_TYPES } from "@/features/transactions/constants";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { FormattedMessage } from "react-intl";

interface IProps {
  selectedTransactionType: string;
  onTransactionTypeChange: (type: string) => void;
}

export function TransactionTypeSwitcher({
  selectedTransactionType,
  onTransactionTypeChange,
}: IProps) {
  return (
    <FormControl>
      <InputLabel>
        <FormattedMessage id="Transactions.form.fields.type.label" />
      </InputLabel>
      <Select
        size="small"
        label={<FormattedMessage id="Transactions.form.fields.type.label" />}
        value={selectedTransactionType}
        onChange={(e) => onTransactionTypeChange?.(e.target.value)}
      >
        <MenuItem value={TRANSACTION_TYPES.EXPENSE}>
          {TRANSACTION_TYPES.EXPENSE}
        </MenuItem>
        <MenuItem value={TRANSACTION_TYPES.INCOME}>
          {TRANSACTION_TYPES.INCOME}
        </MenuItem>
      </Select>
    </FormControl>
  );
}
