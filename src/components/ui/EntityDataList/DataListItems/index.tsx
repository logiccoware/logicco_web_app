import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { DataListItemMenu } from "@/components/ui/EntityDataList/DataListItemMenu";
import type { IEntityDataList } from "@/components/ui/EntityDataList/types";
import { DataListEmpty } from "@/components/ui/EntityDataList/DataListEmpty";
import ListItemIcon from "@mui/material/ListItemIcon";

interface IDataListItemsProps<T> {
  data: IEntityDataList<T>[];
  handleItemClick: (item: IEntityDataList<T>) => void;
  handleDeleteClick: (item: IEntityDataList<T>) => void;
  emptyListMessage: string;
}

export function DataListItems<T>({
  data,
  handleItemClick,
  handleDeleteClick,
  emptyListMessage,
}: IDataListItemsProps<T>) {
  if (data.length === 0) {
    return <DataListEmpty>{emptyListMessage}</DataListEmpty>;
  }
  return (
    <List>
      {data.map((item) => (
        <ListItem
          key={item.id}
          secondaryAction={
            <DataListItemMenu
              handleDeleteClick={() => handleDeleteClick(item)}
            />
          }
        >
          <ListItemButton onClick={() => handleItemClick(item)}>
            <ListItemText
              sx={{ textTransform: "capitalize" }}
              primary={item.primaryText}
            />
          </ListItemButton>
          <ListItemIcon>{item.rightIcon ? item.rightIcon : null}</ListItemIcon>
        </ListItem>
      ))}
    </List>
  );
}
