import { useState } from "react";
import type { PropsWithChildren } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";

import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Stack from "@mui/material/Stack";
import { AppLogo } from "@/components/ui/AppLogo";

import { FormattedMessage } from "react-intl";
import { useLocation } from "@tanstack/react-router";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { MobileBottomNav } from "@/components/layouts/ProtectedLayout/MobileBottomNav";
import { AppLink } from "@/components/ui/AppLink";

import { DesktopAppbarTabs } from "@/components/layouts/ProtectedLayout/DesktopAppBarTabs";
import Typography from "@mui/material/Typography";
import { DrawerItems } from "@/components/layouts/ProtectedLayout/DrawerItems";

const drawerWidth = 240;

export function ProtectedLayout({ children }: PropsWithChildren) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const { pathname } = useLocation();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const drawer = (
    <Box>
      <Box sx={{ py: 2, pl: 1 }}>
        {isMobile ? (
          <Typography variant="h6">
            <FormattedMessage id="Common.protectedLayout.navbars.title" />
          </Typography>
        ) : (
          <AppLogo />
        )}
      </Box>
      <Divider />
      <DrawerItems pathname={pathname} handleDrawerClose={handleDrawerClose} />
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          {isMobile ? (
            <AppLink
              to="/"
              sx={{ textDecoration: "underline", color: "inherit" }}
            >
              <AppLogo />
            </AppLink>
          ) : (
            <Stack width="100%" direction="row">
              <DesktopAppbarTabs />
            </Stack>
          )}
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          slotProps={{
            root: {
              keepMounted: true,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
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
        <Toolbar />
        {children}
      </Box>
      <MobileBottomNav />
    </Box>
  );
}
