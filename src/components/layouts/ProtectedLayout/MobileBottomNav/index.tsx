import Paper from "@mui/material/Paper";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import DataUsageIcon from "@mui/icons-material/DataUsage";
import ListIcon from "@mui/icons-material/List";
import SettingsIcon from '@mui/icons-material/Settings';
import { AppLink } from "@/components/ui/AppLink";
import { useLocation } from "@tanstack/react-router";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export function MobileBottomNav() {
  const { pathname } = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  if (!isMobile) return null;

  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        width: "100%",
        zIndex: theme.zIndex.appBar,
      }}
      elevation={3}
    >
      <BottomNavigation
        sx={{
          height: 64,
        }}
        showLabels
        value={
          pathname.includes("/spendings") ? "/transactions/spendings" : pathname
        }
      >
        <BottomNavigationAction
          to="/transactions/spendings/payees"
          value="/transactions/spendings"
          label="Spending"
          icon={<DataUsageIcon />}
          component={AppLink}
        />
        <BottomNavigationAction
          to="/transactions/list"
          value="/transactions/list"
          label="Transactions"
          icon={<ListIcon />}
          component={AppLink}
        />
        <BottomNavigationAction
          to="/mobile/settings"
          value="/mobile/settings"
          label="Settings"
          icon={<SettingsIcon />}
          component={AppLink}
        />
      </BottomNavigation>
    </Paper>
  );
}
