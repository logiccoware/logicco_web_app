import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export function PageLoading() {
  return (
    <Box display="flex" justifyContent="center" mt={42}>
      <CircularProgress />
    </Box>
  );
}
