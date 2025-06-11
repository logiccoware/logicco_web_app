import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

interface IProps {
  monthLabel: string;
  rightClick: () => void;
  leftClick: () => void;
}

export function TransactionDateSwitcher({
  monthLabel,
  rightClick,
  leftClick,
}: IProps) {
  return (
    <Box
      sx={{
        my: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Stack direction="row">
        <IconButton size="small" onClick={leftClick}>
          <ChevronLeftIcon />
        </IconButton>
        <Chip size="medium" label={monthLabel} />
        <IconButton size="small" onClick={rightClick}>
          <ChevronRightIcon />
        </IconButton>
      </Stack>
    </Box>
  );
}
