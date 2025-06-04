import type { PropsWithChildren } from "react";
import Container from "@mui/material/Container";

export function PublicPageContainer({ children }: PropsWithChildren) {
  return <Container>{children}</Container>;
}
