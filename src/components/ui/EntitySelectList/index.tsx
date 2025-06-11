import type { IEntitySelectDataList } from "@/components/ui/EntityDataList/types";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";

interface IProps<T> {
  data: IEntitySelectDataList<T>[];
  selectedItemId: string | null;
  handleItemClick: (item: IEntitySelectDataList<T>) => void;
}

export function EntitySelectList<T>({
  data,
  selectedItemId,
  handleItemClick,
}: IProps<T>) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = data.filter((item) =>
    item.primaryText.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Stack direction="column">
      <TextField
        value={searchTerm}
        onChange={handleSearchChange}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          },
        }}
        placeholder="Search"
        fullWidth
      />
      <Box sx={{ width: "100%" }}>
        <List dense>
          {filteredData.map((item) => (
            <ListItem divider key={item.id}>
              <ListItemButton
                sx={{ width: "100%" }}
                onClick={() => handleItemClick(item)}
              >
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={selectedItemId === item.id}
                    tabIndex={-1}
                    disableRipple
                  />
                </ListItemIcon>
                <ListItemText
                  sx={{ textTransform: "capitalize" }}
                  primary={item.primaryText}
                />
              </ListItemButton>
              <ListItemIcon>
                {item.rightIcon ? item.rightIcon : null}
              </ListItemIcon>
            </ListItem>
          ))}
        </List>
      </Box>
    </Stack>
  );
}
