import { DataListEmpty } from "@/components/ui/EntityDataList/DataListEmpty";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import ListSubheader from "@mui/material/ListSubheader";
import type { ITransactionsGroupByDate } from "@/features/transactions/helpers/getGroupedTransactionsByDate";
import dayjs from "dayjs";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { ListMenu } from "@/features/transactions/components/TransactionsList/ListMenu";

interface IProps {
  data: ITransactionsGroupByDate[];
  handleItemClick: (id: string) => void;
  handleDuplicateClick: (id: string) => void;
  handleDeleteClick: (id: string) => void;
  emptyListMessage: string;
}

export function TransactionListItem({
  data,
  emptyListMessage,
  handleDuplicateClick,
  handleDeleteClick,
  handleItemClick,
}: IProps) {
  if (data.length === 0) {
    return <DataListEmpty>{emptyListMessage}</DataListEmpty>;
  }
  return data.map((group) => (
    <List
      disablePadding
      key={group.date}
      subheader={
        <ListSubheader>{dayjs(group.date).format("MMM D")}</ListSubheader>
      }
    >
      {group.transactions.map((item) => (
        <ListItem
          key={item.id}
          secondaryAction={
            <ListMenu
              handleDuplicateClick={() => handleDuplicateClick(item.id)}
              handleDeleteClick={() => handleDeleteClick(item.id)}
            />
          }
          divider
        >
          <ListItemButton onClick={() => handleItemClick(item.id)}>
            <ListItemText
              sx={{ textTransform: "capitalize" }}
              secondary={item.category}
              primary={
                <Stack direction="row" justifyContent="space-between">
                  <Stack>
                    <Chip label={item.payee} icon={<CorporateFareIcon />} />
                  </Stack>
                  <span>
                    {item.type === "EXPENSE"
                      ? `-${item.amount}`
                      : `+${item.amount}`}
                  </span>
                </Stack>
              }
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  ));
}
