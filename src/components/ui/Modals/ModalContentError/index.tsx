import DialogContent from "@mui/material/DialogContent";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import type { PropsWithChildren } from "react";

export function ModalContentError({ children }: PropsWithChildren) {
  return (
    <DialogContent>
      <Box
        sx={{
          p: 2,
        }}
      >
        <Alert severity="error">{children}</Alert>
      </Box>
    </DialogContent>
  );
}
