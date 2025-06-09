import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export function ModalContentLoading() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 4,
      }}
    >
      <CircularProgress />
    </Box>
  );
}
