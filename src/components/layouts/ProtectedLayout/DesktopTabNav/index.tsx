import Paper from "@mui/material/Paper";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DataUsageIcon from "@mui/icons-material/DataUsage";
import ListIcon from "@mui/icons-material/List";
import { AppLink } from "@/components/ui/AppLink";
import { useLocation } from "@tanstack/react-router";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export function DesktopTabNav() {
  const { pathname } = useLocation();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("sm"));

  if (!isDesktop) return null;

  return (
    <Paper
      elevation={3}
      sx={{
        width: "100%",
        zIndex: theme.zIndex.appBar,
      }}
    >
      <Tabs
        value={pathname}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab
          label="Overview"
          value="/"
          icon={<DashboardIcon />}
          iconPosition="start"
          component={AppLink}
          to="/"
        />
        <Tab
          label="Spending"
          value="/spendings"
          icon={<DataUsageIcon />}
          iconPosition="start"
          component={AppLink}
          to="/spendings"
        />
        <Tab
          label="Transactions"
          value="/transactions"
          icon={<ListIcon />}
          iconPosition="start"
          component={AppLink}
          to="/transactions"
        />
      </Tabs>
    </Paper>
  );
}
