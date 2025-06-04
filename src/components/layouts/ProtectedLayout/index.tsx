import { useState } from "react";
import type { PropsWithChildren } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Stack from "@mui/material/Stack";
import { AvatarMenu } from "@/components/layouts/ProtectedLayout/AvatarMenu";
import { AppLogo } from "@/components/ui/AppLogo";
import { PROTECTED_LAYOUT_DRAWER_ITEMS } from "./constants";
import { useIntl } from "react-intl";
import { useLocation } from "@tanstack/react-router";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { MobileBottomNav } from "@/components/layouts/ProtectedLayout/MobileBottomNav";
import { DesktopTabNav } from "@/components/layouts/ProtectedLayout/DesktopTabNav";
import { AppLink } from "@/components/ui/AppLink";

const drawerWidth = 240;

export function ProtectedLayout({ children }: PropsWithChildren) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const { pathname } = useLocation();
  const t = useIntl();

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
    <div>
      <Box sx={{ py: 2, pl: 1 }}>
        <AppLogo />
      </Box>
      <Divider />
      <List>
        {PROTECTED_LAYOUT_DRAWER_ITEMS.map((item) => (
          <ListItem key={item.intlId} disablePadding>
            <ListItemButton
              component={AppLink}
              to={item.href}
              selected={pathname === item.href}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={t.formatMessage({ id: item.intlId })} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
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
          <Stack width="100%" direction="row" justifyContent="flex-end">
            <AvatarMenu />
          </Stack>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
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
        <DesktopTabNav />
        {children}
      </Box>
      <MobileBottomNav />
    </Box>
  );
}

// import { useState } from "react";
// import type { PropsWithChildren } from "react";
// import AppBar from "@mui/material/AppBar";
// import Box from "@mui/material/Box";
// import CssBaseline from "@mui/material/CssBaseline";
// import Divider from "@mui/material/Divider";
// import Drawer from "@mui/material/Drawer";
// import IconButton from "@mui/material/IconButton";
// import List from "@mui/material/List";
// import ListItem from "@mui/material/ListItem";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemText from "@mui/material/ListItemText";
// import MenuIcon from "@mui/icons-material/Menu";
// import Toolbar from "@mui/material/Toolbar";
// import Stack from "@mui/material/Stack";
// import { AvatarMenu } from "@/components/layouts/ProtectedLayout/AvatarMenu";
// import { AppLogo } from "@/components/ui/AppLogo";
// import { PROTECTED_LAYOUT_DRAWER_ITEMS } from "./constants";
// import { useIntl } from "react-intl";
// import BottomNavigation from "@mui/material/BottomNavigation";
// import BottomNavigationAction from "@mui/material/BottomNavigationAction";
// import RestoreIcon from "@mui/icons-material/Restore";
// import FavoriteIcon from "@mui/icons-material/Favorite";
// import LocationOnIcon from "@mui/icons-material/LocationOn";

// const drawerWidth = 240;

// export function ProtectedLayout({ children }: PropsWithChildren) {
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [isClosing, setIsClosing] = useState(false);

//   const t = useIntl();

//   const handleDrawerClose = () => {
//     setIsClosing(true);
//     setMobileOpen(false);
//   };

//   const handleDrawerTransitionEnd = () => {
//     setIsClosing(false);
//   };

//   const handleDrawerToggle = () => {
//     if (!isClosing) {
//       setMobileOpen(!mobileOpen);
//     }
//   };

//   const drawer = (
//     <div>
//       <Box sx={{ py: 2, pl: 1 }}>
//         <AppLogo />
//       </Box>
//       <Divider />
//       <List>
//         {PROTECTED_LAYOUT_DRAWER_ITEMS.map((item) => (
//           <ListItem key={item.intlId} disablePadding>
//             <ListItemButton>
//               <ListItemIcon>{item.icon}</ListItemIcon>
//               <ListItemText primary={t.formatMessage({ id: item.intlId })} />
//             </ListItemButton>
//           </ListItem>
//         ))}
//       </List>
//     </div>
//   );

//   return (
//     <Box sx={{ display: "flex" }}>
//       <CssBaseline />
//       <AppBar
//         position="fixed"
//         sx={{
//           width: { sm: `calc(100% - ${drawerWidth}px)` },
//           ml: { sm: `${drawerWidth}px` },
//         }}
//       >
//         <Toolbar>
//           <IconButton
//             color="inherit"
//             aria-label="open drawer"
//             edge="start"
//             onClick={handleDrawerToggle}
//             sx={{ mr: 2, display: { sm: "none" } }}
//           >
//             <MenuIcon />
//           </IconButton>

//           <Stack width="100%" direction="row" justifyContent="flex-end">
//             <AvatarMenu />
//           </Stack>
//         </Toolbar>
//       </AppBar>
//       <Box
//         component="nav"
//         sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
//         aria-label="mailbox folders"
//       >
//         {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
//         <Drawer
//           variant="temporary"
//           open={mobileOpen}
//           onTransitionEnd={handleDrawerTransitionEnd}
//           onClose={handleDrawerClose}
//           sx={{
//             display: { xs: "block", sm: "none" },
//             "& .MuiDrawer-paper": {
//               boxSizing: "border-box",
//               width: drawerWidth,
//             },
//           }}
//           slotProps={{
//             root: {
//               keepMounted: true, // Better open performance on mobile.
//             },
//           }}
//         >
//           {drawer}
//         </Drawer>
//         <Drawer
//           variant="permanent"
//           sx={{
//             display: { xs: "none", sm: "block" },
//             "& .MuiDrawer-paper": {
//               boxSizing: "border-box",
//               width: drawerWidth,
//             },
//           }}
//           open
//         >
//           {drawer}
//         </Drawer>
//       </Box>
//       <Box
//         component="main"
//         sx={{
//           flexGrow: 1,
//           width: { sm: `calc(100% - ${drawerWidth}px)` },
//           minHeight: "100vh",
//           pb: 7, // Add padding bottom to prevent content from being hidden behind the nav
//         }}
//       >
//         <Toolbar />
//         {children}
//       </Box>
//        <BottomNavigation
//         showLabels
//         value={""}
//         onChange={(event, newValue) => {
//           console.log(newValue);
//         }}
//         sx={{
//           position: "fixed",
//           bottom: 0,
//           left: { xs: 0, sm: `${drawerWidth}px` },
//           width: { xs: "100%", sm: `calc(100% - ${drawerWidth}px)` },
//           zIndex: (theme) => theme.zIndex.appBar,
//         }}
//       >
//         <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
//         <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
//         <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
//       </BottomNavigation>
//     </Box>
//   );
// }
