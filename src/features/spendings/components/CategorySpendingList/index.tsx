import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import type { TCategorySpendingListItem } from "@/features/spendings/schema";
import { SpendingEmptyMessage } from "@/features/spendings/components/SpendingEmptyMessage";
import { FormattedMessage } from "react-intl";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { formatAmount } from "@/features/accounts/helpers/currency";

interface IProps {
  data: TCategorySpendingListItem[];
}

export function CategorySpendingList({ data }: IProps) {
  const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({});

  const handleClick = (itemName: string) => {
    setOpenItems((prevOpenItems) => ({
      ...prevOpenItems,
      [itemName]: !prevOpenItems[itemName],
    }));
  };

  if (data.length === 0) {
    return (
      <SpendingEmptyMessage>
        <FormattedMessage id="Spendings.categories.emptyListMessage" />
      </SpendingEmptyMessage>
    );
  }

  return (
    <List sx={{ width: "100%", bgcolor: "background.paper" }} component="nav">
      {data.map((item) => (
        <div key={item.id}>
          <ListItemButton divider onClick={() => handleClick(item.name)}>
            <ListItemText
              primary={
                <Stack direction="row" justifyContent="space-between">
                  <span>{item.name}</span>
                  <span>{formatAmount(item.totalAmount, "CAD")}</span>
                </Stack>
              }
            />
            {item.children.length > 0 ? (
              openItems[item.name] ? (
                <ExpandLess />
              ) : (
                <ExpandMore />
              )
            ) : (
              <Box sx={{ ml: 3 }} />
            )}
          </ListItemButton>
          <Collapse in={!!openItems[item.name]} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {item.children.map((child) => (
                <ListItemButton key={child.id} sx={{ pl: 4 }}>
                  <ListItemText
                    primary={
                      <Stack direction="row" justifyContent="space-between">
                        <span>{child.name}</span>
                        <span>{child.amount}</span>
                      </Stack>
                    }
                  />
                </ListItemButton>
              ))}
            </List>
          </Collapse>
        </div>
      ))}
    </List>
  );
}
