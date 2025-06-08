import type { IEntityDataList } from "@/components/ui/EntityDataList/types";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import { DataListItems } from "./DataListItems";
import AddIcon from "@mui/icons-material/Add";

interface IProps<T> {
  data: IEntityDataList<T>[];
  handleAddClick: () => void;
  handleItemClick: (item: IEntityDataList<T>) => void;
  handleDeleteClick: (item: IEntityDataList<T>) => void;
  emptyListMessage: string;
}

export function EntityDataList<T>({
  data,
  handleAddClick,
  handleItemClick,
  handleDeleteClick,
  emptyListMessage,
}: IProps<T>) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = data.filter((item) =>
    item.primaryText.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <Card>
      <CardContent>
        <Stack direction="column">
          <Stack
            direction='row'
          >
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

            <IconButton disableRipple size="small" onClick={handleAddClick}>
              <AddIcon />
            </IconButton>
          </Stack>
          <DataListItems
            data={filteredData}
            handleItemClick={handleItemClick}
            handleDeleteClick={handleDeleteClick}
            emptyListMessage={emptyListMessage}
          />
        </Stack>
      </CardContent>
    </Card>
  );
}
