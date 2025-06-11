import FAB from "@mui/material/Fab";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import AddIcon from "@mui/icons-material/Add";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

interface IProps {
  onClick: () => void;
}

export function FabAdd({ onClick }: IProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Box sx={{ position: "fixed", bottom: isMobile ? 60 : 12, right: 12 }}>
      <Stack gap={2} direction="row">
        <FAB onClick={onClick} color="primary" aria-label="add">
          <AddIcon />
        </FAB>
      </Stack>
    </Box>
  );
}
