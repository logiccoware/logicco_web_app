import type { PropsWithChildren } from "react";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

interface IProps {
  title?: string;
}

export function ProtectedPageContainer({
  children,
  title,
}: PropsWithChildren<IProps>) {
  return (
    <Container>
      <Stack sx={{ gap: 2, mt: 2 }}>
        {title ? <Typography variant="h5">{title}</Typography> : null}
        {children}
      </Stack>
    </Container>
  );
}
