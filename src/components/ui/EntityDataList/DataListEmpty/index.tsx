import Alert from "@mui/material/Alert";
import type { PropsWithChildren } from "react";

export function DataListEmpty({ children }: PropsWithChildren) {
  return (
    <Alert sx={{ mt: 2 }} severity="info" variant="outlined">
      {children}
    </Alert>
  );
}
