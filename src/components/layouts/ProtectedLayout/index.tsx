import { useState } from "react";
import type { PropsWithChildren } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";

import Toolbar from "@mui/material/Toolbar";
import Stack from "@mui/material/Stack";
import { AppLogo } from "@/components/ui/AppLogo";

import { useLocation } from "@tanstack/react-router";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { MobileBottomNav } from "@/components/layouts/ProtectedLayout/MobileBottomNav";

import { DesktopAppbarTabs } from "@/components/layouts/ProtectedLayout/DesktopAppBarTabs";
import { DrawerItems } from "@/components/layouts/ProtectedLayout/DrawerItems";

const drawerWidth = 240;

export function ProtectedLayout({ children }: PropsWithChildren) {
  const { pathname } = useLocation();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const drawer = (
    <Box>
      <Box sx={{ py: 2, pl: 1 }}>
        <AppLogo />
      </Box>
      <Divider />
      <DrawerItems pathname={pathname} />
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      {isMobile ? null : <CssBaseline />}
      {isMobile ? null : (
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
          }}
        >
          <Toolbar>
            <Stack width="100%" direction="row">
              <DesktopAppbarTabs />
            </Stack>
          </Toolbar>
        </AppBar>
      )}
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              height: "unset",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          minHeight: "100vh",
          pb: isMobile ? 7 : 0,
        }}
      >
        {isMobile ? null : <Toolbar />}
        {children}
      </Box>
      <MobileBottomNav />
    </Box>
  );
}
