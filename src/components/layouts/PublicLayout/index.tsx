import type { PropsWithChildren } from "react";

import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import { AppLogo } from "@/components/ui/AppLogo";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

export function PublicLayout({ children }: PropsWithChildren) {
  return (
    <Box>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Stack
            alignItems="center"
            direction="row"
            width="100%"
            justifyContent="center"
          >
            <Box
              component="a"
              href="/"
              sx={{ textDecoration: "none", color: "inherit" }}
            >
              <AppLogo />
            </Box>
          </Stack>
        </Toolbar>
      </AppBar>
      <Box
        component="main"
        sx={{
          mt: 4,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
