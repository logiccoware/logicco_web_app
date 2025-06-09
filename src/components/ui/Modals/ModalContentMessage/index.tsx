import Alert, { type AlertColor } from "@mui/material/Alert";
import Box from "@mui/material/Box";
import type { PropsWithChildren } from "react";

interface IProps {
  type: AlertColor;
}

export function ModalContentMessage({
  children,
  type,
}: PropsWithChildren<IProps>) {
  return (
    <Box
      sx={{
        mt: 2,
      }}
    >
      <Alert severity={type}>{children}</Alert>
    </Box>
  );
}
