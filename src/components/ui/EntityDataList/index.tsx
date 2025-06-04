import type { IEntityDataList } from "@/components/ui/EntityDataList/types";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import { DataListItems } from "./DataListItems";
import { FormattedMessage } from "react-intl";

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
          <Grid container>
            <Grid size={{ xs: 8, md: 10 }}>
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
            </Grid>
            <Grid size={{ xs: 4, md: 2 }}>
              <Box
                sx={{
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Button
                  onClick={handleAddClick}
                  variant="contained"
                  color="primary"
                >
                  <FormattedMessage id="Common.dataList.createButton" />
                </Button>
              </Box>
            </Grid>
          </Grid>
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
